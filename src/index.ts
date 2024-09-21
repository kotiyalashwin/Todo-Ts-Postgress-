import express from "express";
import userRoute from "./routes/User";
import todoRoute from "./routes/Todo";

const app = express();
app.use(express.json());

app.use("/todo", todoRoute);
app.use("/user", userRoute);

app.listen(3000);
