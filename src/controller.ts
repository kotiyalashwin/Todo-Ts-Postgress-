import { PrismaClient } from "@prisma/client";
import { user } from "./routes/User";
import { todo } from "./routes/Todo";

const prisma = new PrismaClient();

export async function userCreate({
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

export async function todoCreate(
  { title, description }: todo,
  user_id: number
) {
  const newTodo = await prisma.todo.create({
    data: {
      title,
      description,
      user_id,
    },
  });

  console.log(newTodo);
}

export async function getTodo(user: string) {
  const data = await prisma.users.findUniqueOrThrow({
    where: {
      username: user,
    },
    select: {
      username: true,
      todos: true,
      email: true,
    },
  });

  return data;
}
