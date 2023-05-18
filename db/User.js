const Sequelize = require('sequelize');
const {VARCHAR} = require("mysql/lib/protocol/constants/types");

module.exports = function (sequelize) {
    return sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        login: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        email: {
            type: VARCHAR,
            allowNull: false,
        },
        password: {
          type: Sequelize.TEXT,
          allowNull: false
        }
    }, {
        timestamps: false
    })
}