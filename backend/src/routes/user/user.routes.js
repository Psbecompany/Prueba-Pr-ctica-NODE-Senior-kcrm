import { Router } from "express";
import { UsersRepository } from "./user-repository.js";
import jwt from "jsonwebtoken";
import { SECRET_JWT_KEY } from "../../config.js";

const router = Router();

router.get("/check", async (req, res) => {
  const { user } = req.session;

  if (user) return res.send(user);

  res.status(401).send("No autorizado");
});

router.post("/register", async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const user = await UsersRepository.create({ email, password, name });
    const token = jwt.sign(
      { id: user.id, email: user.email, roles: user.roles },
      SECRET_JWT_KEY,
      {
        expiresIn: "1h",
      }
    );
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60,
      })
      .send(user);
  } catch (error) {
    const message = error.message;
    res.status(400).send({ message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UsersRepository.login({ email, password });
    const token = jwt.sign(
      { id: user.id, email: user.email, roles: user.roles },
      SECRET_JWT_KEY,
      {
        expiresIn: "1h",
      }
    );
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60,
      })
      .send(user);
  } catch (error) {
    const message = error.message;
    res.status(401).send({ message });
  }
});

router.post("/logout", async (req, res) => {
  res.clearCookie("access_token").send("Logout exitoso");
});

export default router;
