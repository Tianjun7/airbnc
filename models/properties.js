const db = require("../db/connection")

exports.fetchProperties =  async () => {
    const {rows: properties} = await db.query("SELECT * FROM properties")
}