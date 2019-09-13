const Sequelize  = require('sequelize');

const db = new Sequelize({
  database: 'tasteville_db',
  dialect: 'postgres',
  define: {
    underscored: true
  }
});

// Food model with a column called name, Sequelize.STRING
// Flavor model with a column called name, Sequelize.STRING

class Food extends Sequelize.Model {}
Food.init({
  name: Sequelize.STRING
}, {
  sequelize: db,
  modelName: 'food'
});

class Flavor extends Sequelize.Model {}
Flavor.init({
  name: Sequelize.STRING
}, {
  sequelize: db,
  modelName: 'flavor'
});

Food.belongsToMany(Flavor, { through: 'food_flavors' });
Flavor.belongsToMany(Food, { through: 'food_flavors' });

class User extends Sequelize.Model {}
User.init({
  username: Sequelize.STRING,
  password_digest: Sequelize.STRING
}, {
  sequelize: db,
  modelName: 'user'
});

module.exports = {
  db, Flavor, Food, User
}
