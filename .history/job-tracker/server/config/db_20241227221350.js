const { Sequelize } = require('sequelize');

const Sequelize = new Sequelize('postgres://postgres:kannan@localhost:5432/job_tracker', {
    dialect: 'postgres',
    logging: false,
});

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
module.exports = {Sequelize, connectDB};