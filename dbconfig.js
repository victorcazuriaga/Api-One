const dbEngine = process.env.DB_ENVIROMENT || "production";
const knexConfig = require("./knexfile")[dbEngine];

module.exports = require("knex")(knexConfig);
