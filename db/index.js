const Sequelize = require('sequelize');

const sequelize = new Sequelize('u1988870_kvbdb', 'u1988870_demoron', '1234567890a', {
    dialect: "mysql",
    host: "server191.hosting.reg.ru"
})

const User = require('./User')(sequelize);

module.exports = {
    sequelize : sequelize,
    user : User
}