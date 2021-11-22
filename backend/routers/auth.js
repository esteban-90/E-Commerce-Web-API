import { Router } from "express";
import User from "../models/user";

const router = Router();

// Inicio de sesión de un usuario existente
router.post("/signin", async (request, response) => {
  const user = await User.signIn(request.body);
  response.send({ email: user.get("email"), fullName: user.get("name.full"), token: user.generateToken() });
});

// Registro de un usuario nuevo
router.post("/signup", async (request, response) => {
  const user = await User.signUp(request.body);
  response.status(201).send({ email: user.get("email"), fullName: user.get("name.full") });
});

export default router;
