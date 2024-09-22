import express from "express";
import z from "zod";
import { userCreate } from "../controller";
import { getTodo } from "../controller";

const userRoute = express.Router();

const userSchema = z.object({
  username: z.string(),
  firstname: z.string(),
  lastname: z.string().optional(),
  email: z.string(),
});

export type user = z.infer<typeof userSchema>;

userRoute.post("/new", async (req, res) => {
  try {
    const { success } = userSchema.safeParse(req.body);

    if (!success) {
      return res.status(401).json({
        msg: "invalid inputs",
      });
    }

    await userCreate(req.body);

    res.json({
      msg: "user created successfully",
    });
  } catch (e) {
    res.json({
      msg: e,
    });
  }
});

userRoute.get("/:name/todo", async (req, res) => {
  const user = req.params.name;

  const data = await getTodo(user);

  res.json({
    data: data,
  });
});

export default userRoute;
