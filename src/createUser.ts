import { PrismaClient } from "@prisma/client";
import { user } from "./routes/User";

const prisma = new PrismaClient();

export default async function userCreate({
  username,
  firstname,
  email,
  lastname,
}: user) {
  const newUser = await prisma.users.create({
    data: { username, firstname, email, lastname },
  });
  console.log(newUser);
}
