const Sequelize = require("sequelize");

const connection = new Sequelize('guiaperguntas', 'root', 'gui1019',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;