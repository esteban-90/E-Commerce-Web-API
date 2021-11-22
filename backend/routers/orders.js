import { Router } from "express";
import Item from "../models/item";
import Order from "../models/order";
import { tokenExtractor } from "../middlewares";

const router = Router();

const populate = [
  {
    path: "items",
    populate: { path: "product", select: "name price", populate: { path: "category", select: "name" } },
  },
  { path: "user", select: { email: 1, name: { first: 1, last: 1 } } },
];

router.post("/", tokenExtractor, async (request, response) => {
  const decodedToken = Order.decodeToken(request.body.token);
  delete request.body.token;
  const _items = await Item.create(request.body.items);
  const items = [];
  const prices = [];
  for (const item of _items) {
    await item.populate({ path: "product", select: "price" });
    items.push(item.get("id"));
    prices.push({ quantity: item.get("quantity"), value: item.get("product").price.value });
  }
  const totalPrice = prices.reduce((prev, curr) => ({ value: prev.value + curr.quantity * curr.value }), {
    value: 0,
  });
  const order = await Order.create({ ...decodedToken, items, totalPrice });
  response.status(201).send(order);
});

router.get("/", async (_, response) => {
  const orders = await Order.find({}, null, { populate, sort: { createdAt: "desc" } });
  response.send(orders);
});

router.get("/:id", async (request, response) => {
  const order = await Order.findById(request.params.id, null, { populate }).orFail();
  response.send(order);
});

router.get("/get/count", async (_, response) => {
  const count = await Order.countDocuments({});
  response.send({ count });
});

router.get("/get/userorders/:id", async (request, response) => {
  const userOrders = await Order.find({ user: request.params.id }, null, {
    populate,
    sort: { createdAt: "desc" },
  }).orFail();
  response.send(userOrders);
});

router.get("/get/totalsales", async (_, response) => {
  const [{ totalSales }] = await Order.aggregate([{ $group: { _id: null, totalSales: { $sum: "$totalPrice" } } }]);
  response.send({ totalSales });
});

router.patch("/:id", async (request, response) => {
  const order = await Order.findByIdAndUpdate(
    request.params.id,
    { status: request.body.status },
    { new: true, populate, runValidators: true }
  ).orFail();
  response.send(order);
});

router.delete("/:id", async (request, response) => {
  const order = await Order.findByIdAndRemove(request.params.id).orFail();
  for (const item of order.get("items")) {
    await Item.findByIdAndRemove(item);
  }
  response.status(204).end();
});

export default router;
