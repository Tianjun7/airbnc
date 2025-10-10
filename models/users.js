const db = require("../db/connection")

exports.fetchUser = async (id) => {
    const {rows: [user]} = await db.query(
        `SELECT user_id,
        first_name,
        surname,
        email,
        phone_number,
        avatar,
        created_at
        FROM users WHERE user_id = $1`, [id]
    )
    return user;
}