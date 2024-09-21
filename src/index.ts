import express from "express";
import userRoute from "./routes/User";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    msg: "main get successful",
  });
});

app.use("/user", userRoute);
app.listen(3000);
