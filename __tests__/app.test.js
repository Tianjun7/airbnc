const request = require("supertest")
const app = require("../app")

describe("app", () => {
    describe("GET /api/properties", () => {
        test("Should return status of 200", async () => {
            await request(app).get("/api/properties").expect(200)
        });

        test("Responds with an array with key of properties", async () => {
            const {body} = await request(app).get("/api/properties")

            expect(Array.isArray(body.properties)).toBe(true);
        });
    })

    describe("GET /api/reviews", () => {
        test("Should return status of 200", async () => {
            await request(app).get("/api/reviews").expect(200)
        })
    })

    describe("GET /api/users/:id", () => {

    })

    describe("GET /api/properties/:id", () => {
        
    })
})