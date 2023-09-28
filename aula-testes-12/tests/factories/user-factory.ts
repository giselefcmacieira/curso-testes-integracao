import prisma from "../../src/database";
import { faker } from '@faker-js/faker';
import { UserInput } from "../../src/repository";

async function buildUser(email: string, password?: string) {
  const userData: UserInput = {
    email,
    password: password || new Date().getTime().toString()
  };

  return await prisma.user.create({ data: userData });
}

export async function buildRandomUser() {
  const email = faker.internet.email()
  const password = faker.internet.password()
  return buildUser(email, password)
}