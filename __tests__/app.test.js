const request = require("supertest")
const app = require("../app")

describe("app", () => {
    test("404 - Path not found", async () => {
        const { body } = await request(app).get("/invalid/path").expect(404);

        expect(body.msg).toBe("Path not found.")
    })

    describe("GET /api/properties", () => {
        test("Should return status of 200", async () => {
            await request(app).get("/api/properties").expect(200)
        });

        test("Responds with an array with key of properties", async () => {
            const {body} = await request(app).get("/api/properties")

            expect(Array.isArray(body.properties)).toBe(true);
        });

        test("array is an array of objects from property table", async () => {
            const {body} = await request(app).get("/api/properties")
            test = body.properties;

            test.forEach(element => {
               expect(typeof element).toBe("object") 
            });
        })

        test("property objects has all correct properties", async() => {
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
            expect(body).toHaveProperty("reviews")
        });

        test("array is an array of objects from reviews table", async () => {
            const {body} = await request(app).get("/api/reviews")
            test = body.reviews;

            test.forEach(element => {
               expect(typeof element).toBe("object") 
            });
        })

        test("review object has all correct properties", async () => {
            const {body} = await request(app).get("/api/reviews")
            testReview = body.reviews[0]

            expect(testReview).toHaveProperty("review_id")
            expect(testReview).toHaveProperty("comment")
            expect(testReview).toHaveProperty("rating")
            expect(testReview).toHaveProperty("created_at")
            expect(testReview).toHaveProperty("guest")
            expect(testReview).toHaveProperty("guest_avatar")
        })
    })

    describe("GET /api/users/:id", () => {
        test("Should return status of 200", async () => {
            await request(app).get("/api/users/3").expect(200)
        })

        test("Should return an object with property of User", async () => {
            const { body } = await request(app).get("/api/users/3")

            expect(body).toHaveProperty("user")
        })

        test("The object is filled with information from the user table", async () => {
            const { body } = await request(app).get("/api/users/3")

            expect(typeof body.user).toBe("object")
            expect(body.user).toHaveProperty("user_id")
            console.log(body)
        })

        test("The user object has all necessary properties", async () => {
            const { body } = await request(app).get("/api/users/3")

            expect(body.user).toHaveProperty("user_id")
            expect(body.user).toHaveProperty("first_name")
            expect(body.user).toHaveProperty("surname")
            expect(body.user).toHaveProperty("email")
            expect(body.user).toHaveProperty("phone_number")
            expect(body.user).toHaveProperty("avatar")
            expect(body.user).toHaveProperty("created_at")
        })

        test("The correct user has been requested", async () => {
            const { body } = await request(app).get("/api/users/3")

            expect(body.user.user_id).toBe(3)
            console.log(body)
        })

        test("If given an id that does not exsist return 404 error", async () => {
            const { body } = await request(app).get("/api/users/10000").expect(404)

            expect(body.msg).toBe("User does not exsist.")
        })

        test("Can handle a bad request such as wrong data type", async () => {
            const { body } = await request(app).get("/api/users/'3'").expect(400)

            expect(body.msg).toBe("Bad request.")
        })
    })

    describe("GET /api/properties/:id", () => {

    })
})