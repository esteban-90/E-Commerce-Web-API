import { Schema, model as _model } from "mongoose";

const schema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, default: 1 },
});

schema.set("toJSON", {
  getters: true,
  transform(_, item) {
    delete item._id;
    delete item.__v;
  },
  virtuals: true,
});

schema.virtual("id").get(function () {
  return this._id.toHexString();
});

const model = _model("Item", schema);

export default model;
