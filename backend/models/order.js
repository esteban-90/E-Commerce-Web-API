import { Schema, model as _model } from "mongoose";
import { verify } from "jsonwebtoken";
import { SECRET } from "../config";
import messages from "../messages";

const schema = new Schema(
  {
    city: { type: String, required: [true, messages.order.city.required] },
    country: { type: String, required: [true, messages.order.country.required] },
    items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
    mobilePhone: { type: String, required: [true, messages.order.mobilePhone.required] },
    shippingAddress: { type: String, required: [true, messages.order.shippingAddress.required] },
    shippingAddress2: String,
    status: { type: String, default: "Pending" },
    totalPrice: {
      value: { type: Number, required: [true, messages.order.totalPrice.value.required] },
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    zip: { type: String, required: [true, messages.order.zip.required] },
  },
  { timestamps: { currentTime: Date.now } }
);

schema.set("toJSON", {
  getters: true,
  transform(_, order) {
    delete order._id;
    delete order.__v;
    delete order.createdAt;
    delete order.updatedAt;
  },
  virtuals: true,
});

schema.static({
  decodeToken(token) {
    return verify(token, SECRET);
  },
});

schema.virtual("id").get(function () {
  return this._id.toHexString();
});

schema.virtual("orderedAt").get(function () {
  return this.createdAt.toLocaleString();
});

schema.virtual("totalPrice.currency").get(function () {
  return this.get("totalPrice").value.toLocaleString("es-PY", { style: "currency", currency: "PYG" });
});

const model = _model("Order", schema);

export default model;
