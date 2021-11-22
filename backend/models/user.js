import { Schema, model as _model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { SECRET } from "../config";
import helpers from "../helpers";
import validations from "../validations";
import messages from "../messages";

const schema = new Schema({
  address: {
    type: String,
    required: [true, messages.user.address.required],
    set: helpers.capitalize,
    validate: [validations.alphaNumeric, messages.user.address.validate],
  },
  city: {
    type: String,
    required: [true, messages.user.city.required],
    set: helpers.capitalize,
    validate: [validations.alpha, messages.user.city.validate],
  },
  country: {
    type: String,
    default: "paraguay",
    set: helpers.capitalize,
    validate: [validations.alpha, messages.user.country.validate],
  },
  email: {
    type: String,
    required: [true, messages.user.email.required],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validations.email, messages.user.email.validate],
  },
  isAdmin: { type: Boolean, default: false },
  mobilePhone: {
    type: String,
    required: [true, messages.user.mobilePhone.required],
    validate: [validations.mobilePhone, messages.user.mobilePhone.validate],
  },
  name: {
    first: {
      type: String,
      required: [true, messages.user.name.first.required],
      set: helpers.capitalize,
      trim: true,
      minlength: [3, messages.user.name.first.minlength],
      maxlength: [20, messages.user.name.first.maxlength],
    },
    last: {
      type: String,
      required: [true, messages.user.name.last.required],
      set: helpers.capitalize,
      trim: true,
      minlength: [4, messages.user.name.last.minlength],
      maxlength: [25, messages.user.name.last.maxlength],
    },
  },
  password: { type: String, required: true },
  zip: { type: String, required: [true, messages.user.zip.required] },
});

schema.method({
  generateToken() {
    return sign(
      {
        city: this.get("city"),
        country: this.get("country"),
        isAdmin: this.get("isAdmin"),
        mobilePhone: this.get("mobilePhone"),
        shippingAddress: this.get("address"),
        user: this.get("id"),
        zip: this.get("zip"),
      },
      SECRET,
      { expiresIn: "2 days" }
    );
  },
});

schema.plugin(uniqueValidator, { message: messages.user.email.unique });

schema.pre("save", async function () {
  const isStrongPassword = validations.strongPassword(this.get("password"));
  if (!isStrongPassword) {
    const error = new Error(messages.user.password.required);
    error.name = "ValidationError";
    throw error;
  }
  this.password = await hash(this.get("password"), 10);
});

schema.set("toJSON", {
  getters: true,
  transform(_, user) {
    delete user._id;
    delete user.__v;
    delete user.password;
  },
  virtuals: true,
});

schema.static({
  async signIn({ email, password }) {
    const user = await this.findOne({ email }).orFail();
    const isSignedIn = await compare(password, user.get("password"));
    if (!isSignedIn) {
      const error = new Error("Contraseña incorrecta.");
      error.name = "UnauthorizedError";
      throw error;
    }
    return user;
  },
  async signUp(data) {
    const user = await this.create(data);
    return user;
  },
});

schema.virtual("id").get(function () {
  return this._id.toHexString();
});

schema.virtual("name.full").get(function () {
  return `${this.get("name").first} ${this.get("name").last}`;
});

const model = _model("User", schema);

export default model;
