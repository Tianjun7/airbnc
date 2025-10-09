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

        test("objects has all correct key-value pairs", async() => {
            const {body} = await request(app).get("/api/properties")
            testProperty = body.properties[0];

            expect(testProperty).toHaveProperty("property_id")
            expect(testProperty).toHaveProperty("property_name")
            expect(testProperty).toHaveProperty("location")
            expect(testProperty).toHaveProperty("price_per_night")
            expect(testProperty).toHaveProperty("host")
        });
    })

    describe("GET /api/reviews", () => {
        test("Should return status of 200", async () => {
            await request(app).get("/api/reviews").expect(200)
        });

        test("Responds with an array with key of properties", async () => {
            const {body} = await request(app).get("/api/reviews")

            expect(Array.isArray(body.reviews)).toBe(true);
            console.log(body)
        });
    })

    // describe("GET /api/users/:id", () => {
    //     test("Should return status of 200", async () => {
    //         await request(app).get("/api/users/:id").expect(200)
    //     })
    // })

    // describe("GET /api/properties/:id", () => {

    // })
})