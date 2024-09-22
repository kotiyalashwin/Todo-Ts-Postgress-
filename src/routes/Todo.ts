import express from "express";
import z from "zod";
import { todoCreate } from "../controller";
const todoRoute = express.Router();

const todoSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export type todo = z.infer<typeof todoSchema>;

todoRoute.post("/new/:user", async (req, res) => {
  const { success } = todoSchema.safeParse(req.body);
  const user = Number(req.params.user);

  if (!success) {
    return res.status(401).json({
      msg: "invalid inputs",
    });
  }

  if (!user) {
    return res.status(402).json({
      msg: "invalid request",
    });
  }

  await todoCreate(req.body, user);
  res.json({
    msg: "todo added successfully",
  });
});

export default todoRoute;
