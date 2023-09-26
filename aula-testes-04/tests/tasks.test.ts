import supertest from "supertest";
import app from "index";

describe("GET /health", () => {
    it("should return statusCode 200", async () => {
        const result = await supertest(app).get('/health')
        const { status } = result
        expect(status).toBe(200)
    })
})