import { Schema, model as _model } from "mongoose";
import validations from "../validations";
import messages from "../messages";

const schema = new Schema({
  color: { type: String, default: "#000", validate: [validations.hexColor, messages.category.color.validate] },
  icon: { type: String, default: "" },
  image: { type: String, default: "" },
  name: { type: String, required: [true, messages.category.name.required] },
});

schema.set("toJSON", {
  getters: true,
  transform(_, category) {
    delete category._id;
    delete category.__v;
  },
  virtuals: true,
});

schema.virtual("id").get(function () {
  return this._id.toHexString();
});

const model = _model("Category", schema);

export default model;
