require('dotenv').config();
const {Sequelize} = require('sequelize');

// const sequelize = new Sequelize(
//     process.env.name,
//     process.env.user,
//     process.env.password, 
//     {
//         host: process.env.host,
//         port: process.env.host,
//         dialect: 'postgres',
//         logging: 'false',
//     }
// );

const sequelize = new Sequelize(
    'musicshop',
    'postgres',
    'fde2a1c7', 
    {
        host: 'localhost',
        port: 5432,
        dialect: 'postgres',
        logging: false,
    }
);

module.exports = sequelize;