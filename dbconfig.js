const dbEngine = process.env.DB_ENVIROMENT || "development";
const knexConfig = require("./knexfile")[dbEngine];

module.exports = require("knex")(knexConfig);
