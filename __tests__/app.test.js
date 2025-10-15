const request = require("supertest")
const app = require("../app")
const seed = require("../db/seed")
const { propertiesData, propertyTypesData, reviewsData, usersData} = require("../db/data/test")
const db = require("../db/connection")

beforeEach(async () => {
    await seed(propertyTypesData, propertiesData, usersData, reviewsData)
})

afterAll(() => {
    db.end()
})

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

    describe("GET /api/properties/:id/reviews", () => {
        test("Should return status of 200", async () => {
            await request(app).get("/api/properties/1/reviews").expect(200)
        });

        test("Responds with an array with key of properties", async () => {
            const {body} = await request(app).get("/api/properties/1/reviews")

            expect(Array.isArray(body.reviews)).toBe(true);
            expect(body).toHaveProperty("reviews")
        });

        test("array is an array of objects from reviews table", async () => {
            const {body} = await request(app).get("/api/properties/1/reviews")
            test = body.reviews;

            test.forEach(element => {
               expect(typeof element).toBe("object") 
            });
        })

        test("review object has all correct properties", async () => {
            const {body} = await request(app).get("/api/properties/1/reviews")
            testReview = body.reviews[0]

            expect(testReview).toHaveProperty("review_id")
            expect(testReview).toHaveProperty("comment")
            expect(testReview).toHaveProperty("rating")
            expect(testReview).toHaveProperty("created_at")
            expect(testReview).toHaveProperty("guest")
            expect(testReview).toHaveProperty("guest_avatar")
        })

        test("should only return the reviews linked to the property_id provided in req", async () => {
            const {body} = await request(app).get("/api/properties/1/reviews")

            body.reviews.forEach(element => {
                element.property_id = 1;
            });
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
        test("Should return status of 200", async () => {
            await request(app).get("/api/properties/3").expect(200)
        })

        test("Should return an object with property of property", async () => {
            const { body } = await request(app).get("/api/properties/3")

            expect(body).toHaveProperty("property")
        })

        test("The object is filled with information from the property table", async () => {
            const { body } = await request(app).get("/api/properties/3")

            expect(typeof body.property).toBe("object")
            expect(body.property).toHaveProperty("property_id")
        })

        test("The property object has all necessary properties", async () => {
            const { body } = await request(app).get("/api/properties/3")

            expect(body.property).toHaveProperty("property_id")
            expect(body.property).toHaveProperty("property_name")
            expect(body.property).toHaveProperty("location")
            expect(body.property).toHaveProperty("price_per_night")
            expect(body.property).toHaveProperty("host")
            expect(body.property).toHaveProperty("host_avatar")
        })

        test("The correct property has been requested", async () => {
            const { body } = await request(app).get("/api/properties/3")

            expect(body.property.property_id).toBe(3)
        })

        test("If given an id that does not exsist return 404 error", async () => {
            const { body } = await request(app).get("/api/properties/10000").expect(404)

            expect(body.msg).toBe("Property does not exsist.")
        })

        test("Can handle a bad request such as wrong data type", async () => {
            const { body } = await request(app).get("/api/properties/'3'").expect(400)

            expect(body.msg).toBe("Bad request.")
        })
    })

    describe("POST /api/properties/:id/reviews", () => {
        test("Should resolve with staus code of 201", async () => {
            const testReview = {guest_id: 1, rating: 5, comment: "test review"}
            
            await request(app).post("/api/properties/1/reviews").send(testReview).expect(201)
        })

        test("Should respond with newly inserted review with fresh id", async () => {
            const testReview = {guest_id: 1, rating: 5, comment: "test review"}

            const { body } = await request(app)
            .post("/api/properties/1/reviews")
            .send(testReview)

            expect(body.review).toEqual({...testReview, review_id: 17, property_id: 1, created_at: null})
        })
    })
})