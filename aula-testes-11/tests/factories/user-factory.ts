import prisma from "database";
import { UserInput } from "repository";

export async function createUser(email: string, password: string) {
    const userData: UserInput = {
        email,
        password
    };

    return await prisma.user.create({
        data: userData
    });
}

export async function createManyUsers(email1: string, password1: string, email2: string, password2: string) {
    return await prisma.user.createMany({
        data: [{
            email: email1,
            password: password1
        }, {
            email: email2,
            password: password2
        }]
    });
}