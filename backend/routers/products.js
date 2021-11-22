import { Router } from "express";
import Product from "../models/product";
import { imageArrayUploader, singleImageUploader } from "../middlewares";

const router = Router();

router.post("/", singleImageUploader, async (request, response) => {
  const image = request.file && `${request.protocol}://${request.get("host")}/public/uploads/${request.file.filename}`;
  request.body.image = image;
  const product = await Product.create(request.body);
  response.status(201).send(product);
});

router.get("/", async (request, response) => {
  const { category } = request.query;
  const filter = category ? { category: category.toString().split(",") } : {};
  const products = await Product.find(filter, null, {
    collation: { locale: "es" },
    populate: { path: "category", select: "name" },
    sort: "name",
  });
  response.send(products);
});

router.get("/:id", async (request, response) => {
  const product = await Product.findById(request.params.id, null, {
    populate: { path: "category", select: "name" },
  }).orFail();
  response.send(product);
});

router.get("/get/count", async (_, response) => {
  const count = await Product.countDocuments({});
  response.send({ count });
});

router.get("/get/featured/:count", async (request, response) => {
  const featured = await Product.find({ isFeatured: true }, null, { limit: +request.params.count });
  response.send({ featured });
});

router.put("/:id", singleImageUploader, async (request, response) => {
  const product = await Product.findById(request.params.id).orFail();
  const image = request.file
    ? `${request.protocol}://${request.get("host")}/public/uploads/${request.file.filename}`
    : product.get("image");
  request.body.image = image;
  for (const path in request.body) {
    product.set({ [path]: request.body[path] });
    await product.save();
  }
  response.send(product);
});

router.patch("/gallery/:id", imageArrayUploader, async (request, response) => {
  const product = await Product.findById(request.params.id).orFail();
  const images = request.files
    ? request.files.map((file) => `${request.protocol}://${request.get("host")}/public/uploads/${file.filename}`)
    : product.get("images");
  product.set({ images });
  await product.save();
  response.send(product);
});

router.delete("/:id", async (request, response) => {
  await Product.findByIdAndRemove(request.params.id).orFail();
  response.status(204).end();
});

export default router;
