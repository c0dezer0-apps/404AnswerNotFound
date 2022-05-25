'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EnvironmentsUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.EnvironmentsUsers.belongsTo(models.User, { as: 'userEnvironment' })
    }
  }
  EnvironmentsUsers.init({
    environmentName: DataTypes.STRING,
    username: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EnvironmentsUsers',
  });
  return EnvironmentsUsers;
};
