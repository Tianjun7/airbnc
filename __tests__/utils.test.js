const createUsersRef = require("../db/utils");

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
    })
})