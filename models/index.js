// Database config

const Sequelize = require("sequelize");

const {
    MYSQL_USERNAME,
    MYSQL_PASSWORD,
    MYSQL_HOSTNAME,
    MYSQL_DB
} = process.env;

const sequelize = new Sequelize(MYSQL_DB, MYSQL_USERNAME, MYSQL_PASSWORD, {
    host: MYSQL_HOSTNAME,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.dna = require("./dna.model.js")(sequelize, Sequelize);

module.exports = db;