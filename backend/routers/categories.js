import { Router } from "express";
import Category from "../models/category";

const router = Router();

router.post("/", async (request, response) => {
  const category = await Category.create(request.body);
  response.status(201).send(category);
});

router.get("/", async (_, response) => {
  const categories = await Category.find({}, null, { collation: { locale: "es" }, sort: "name" });
  response.send(categories);
});

router.get("/:id", async (request, response) => {
  const category = await Category.findById(request.params.id).orFail();
  response.send(category);
});

router.put("/:id", async (request, response) => {
  const category = await Category.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
  }).orFail();
  response.send(category);
});

router.delete("/:id", async (request, response) => {
  await Category.findByIdAndRemove(request.params.id).orFail();
  response.status(204).end();
});

export default router;
