const { Sequelize } = require('sequelize'); // import Sequelize from the sequelize package

// Rename the variable to avoid conflict
const sequelizeInstance = new Sequelize('postgres://postgres:kannan@localhost:5432/job_tracker', {
    dialect: 'postgres',
    logging: false,
});

async function connectDB() {
    try {
        await sequelizeInstance.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = { sequelizeInstance, connectDB }; // Export the renamed variable
