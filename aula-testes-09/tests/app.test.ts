import supertest from "supertest";

import app from "./../src/app";
import prisma from "../src/database";

const api = supertest(app);

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("POST /users tests", () => {
  it("should create a user", async () => {
    const result = await api.post("/users").send({
      email: 'gi@email.com',
      password: '4687635dbxsbHVBJH'
    })
    expect(result.status).toBe(201)
    expect(result.body).toEqual({
      id: expect.any(Number),
      email: 'gi@email.com',
      password: expect.any(String)
    })
  });


  it("should receive 409 when trying to create two users with same e-mail", async () => {
    await api.post("/users").send({
      email: 'gi@email.com',
      password: '4687635dbxsbHVBJH'
    })
    const result = await api.post("/users").send({
      email: 'gi@email.com',
      password: '4687635dbxsbHVBJH'
    })
    expect(result.status).toBe(409)
  });

});

describe("GET /users tests", () => {
  it("should return a single user", async () => {
    await prisma.user.create({
      data: { email: 'gigi@email.com', password: '4687635dbxsbBJH' }
    })
    await prisma.user.create({
      data: { email: 'gisa@email.com', password: '468763bxsbHVBJH' }
    })
    const user = await prisma.user.create({
      data: { email: 'gi@email.com', password: '4687635dbxsbHVBJH' }
    })
    const result = await api.get(`/users/${user.id}`)
    expect(result.body).toEqual({
      id: expect.any(Number),
      email: 'gi@email.com',
      password: expect.any(String)
    })
  });

  it("should return 404 when can't find a user by id", async () => {
    const result = await api.get(`/users/1000`)
    expect(result.status).toBe(404)
  });

  it("should return all users", async () => {
    await prisma.user.create({
      data: { email: 'gigi@email.com', password: '4687635dbxsbBJH' }
    })
    await prisma.user.create({
      data: { email: 'gisa@email.com', password: '468763bxsbHVBJH' }
    })
    await prisma.user.create({
      data: { email: 'gi@email.com', password: '4687635dbxsbHVBJH' }
    })
    const result = await api.get("/users")
    expect(result.body).toHaveLength(3)
  });

})