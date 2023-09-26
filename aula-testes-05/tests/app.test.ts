import supertest from "supertest";

import app from "./../src/app";

const api = supertest(app);

describe("API test", () => {
  it("should return 200 when ask /health", async () => {
    const { status, text } = await api.get("/health");
    expect(status).toBe(200);
    expect(text).toBe("OK!");
  })
})

describe("Fibonacci tests", () => {
  it("should return 400 when recives elements lower than 1", async () => {
    const result1 = await api.get("/fibonacci").query({ elements: NaN })
    expect(result1.status).toBe(400)
    const result2 = await api.get("/fibonacci").query({ elements: '0' })
    expect(result2.status).toBe(400)
  })
  it("should return 200 when elements are valid", async () => {
    const result = await api.get("/fibonacci").query({ elements: '5' })
    expect(result.body).toEqual([0, 1, 1, 2, 3])
  })
})