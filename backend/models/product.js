import { Schema, model as _model } from "mongoose";
import helpers from "../helpers";
import messages from "../messages";

const schema = new Schema(
  {
    brand: { type: String, required: [true, messages.product.brand.required], set: helpers.capitalize },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    countInStock: {
      type: Number,
      required: [true, messages.product.countInStock.required],
      min: [1, messages.product.countInStock.min],
      max: [255, messages.product.countInStock.max],
    },
    description: { type: String, required: [true, messages.product.description.required] },
    image: { type: String, required: [true, messages.product.image.required] },
    images: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    name: { type: String, required: [true, messages.product.name.required], set: helpers.capitalize },
    numReviews: { type: Number, default: 0 },
    price: {
      value: { type: Number, required: [true, messages.product.price.value.required] },
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, messages.product.rating.min],
      max: [5, messages.product.rating.max],
    },
    richDescription: { type: String, default: "" },
  },
  { timestamps: { currentTime: Date.now } }
);

schema.set("toJSON", {
  getters: true,
  transform(_, product) {
    delete product._id;
    delete product.__v;
    delete product.createdAt;
    delete product.updatedAt;
  },
  virtuals: true,
});

schema.virtual("id").get(function () {
  return this._id.toHexString();
});

schema.virtual("price.currency").get(function () {
  return this.get("price").value?.toLocaleString("es-PY", { style: "currency", currency: "PYG" });
});

schema.virtual("registeredAt").get(function () {
  return this.createdAt?.toLocaleString();
});

const model = _model("Product", schema);

export default model;
