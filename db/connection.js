const { pool } = require("pg");

require("dotenv").config();

const pool = new pool;

module.exports = pool;