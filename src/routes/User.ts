import express from "express";
import z from "zod";
import userCreate from "../create";

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

export default userRoute;
