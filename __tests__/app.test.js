const request = require("supertest")
const app = require("../app")

describe("app", () => {
    describe("GET /api/properties", () => {
        test("Should ", async () => {
        const response = await request(app).get("/api/properties").expect(200)
        })
    })
})