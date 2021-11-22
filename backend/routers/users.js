import { Router } from "express";
import User from "../models/user";

const router = Router();

router.get("/", async (_, response) => {
  const users = await User.find(
    {},
    { email: 1, name: { first: 1, last: 1 }, mobilePhone: 1 },
    { collation: { locale: "es" }, sort: "name" }
  );
  response.send(users);
});

router.get("/:id", async (request, response) => {
  const user = await User.findById(request.params.id).orFail();
  response.send(user);
});

router.get("/get/count", async (_, response) => {
  const count = await User.countDocuments({});
  response.send({ count });
});

router.delete("/:id", async (request, response) => {
  await User.findByIdAndRemove(request.params.id).orFail();
  response.status(204).end();
});

export default router;
