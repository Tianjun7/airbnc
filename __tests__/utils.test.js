const {createUsersRef, createPropertyRef} = require("../db/utils");

describe("createUsersRef", () => {
    test("Empty array returns empty object", () => {
        expect(createUsersRef([])).toEqual({})
    });

    test("assign users first and surname as key of object", () => {
        const user = [{
            "user_id": 1,
            "first_name": "Alice",
            "surname": "Johnson",
        }]

        const ref = createUsersRef(user);

        expect(ref.hasOwnProperty("Alice Johnson")).toBe(true);
    });

    test("Should assign correct user id to the key", () => {
        const user = [{
            "user_id": 1,
            "first_name": "Alice",
            "surname": "Johnson",
        }]

        const ref = createUsersRef(user);

        expect(ref["Alice Johnson"]).toBe(1);
    });

    test("should operate the same for larger arrays", () => {
        const user = [{
            "user_id": 1,
            "first_name": "Alice",
            "surname": "Johnson",
        },{
            "user_id": 2,
            "first_name": "Bob",
            "surname": "Smith",
        },{
            "user_id": 3,
            "first_name": "Emma",
            "surname": "Davies",
        }]

        const ref = createUsersRef(user)

        expect(ref["Alice Johnson"]).toBe(1)
        expect(ref["Bob Smith"]).toBe(2)
        expect(ref["Emma Davies"]).toBe(3)
    })
});

describe("createPropertyref", () => {
    test("Empty array should return empty object", () => {
        expect(createPropertyRef([])).toEqual({})
    });

    test("Assign property name as key", () => {
        const property = [{
            "property_id": 1,
            "name": "Modern Apartment in City Center"
        }]

        const ref = createPropertyRef(property)

        expect(ref.hasOwnProperty("Modern Apartment in City Center")).toBe(true);
    });

    test("assign correct value to the key", () => {
        const property = [{
            "property_id": 1,
            "name": "Modern Apartment in City Center"
        }]

        const ref = createPropertyRef(property)

        expect(ref["Modern Apartment in City Center"]).toBe(1);
    });

    test("Can do it with larger array", () => {
        const property = [{
            "property_id": 1,
            "name": "Modern Apartment in City Center"
        },{
            "property_id": 2,
            "name": "Cosy Family House"
        }]

        const ref = createPropertyRef(property)

        expect(ref["Modern Apartment in City Center"]).toBe(1)
        expect(ref["Cosy Family House"]).toBe(2)
    })
})