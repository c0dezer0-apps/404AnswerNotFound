'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EnvironmentsSolutions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.EnvironmentsSolutions.belongsTo(models.Solution, { as: 'solutionEnvironment' });
    }
  }
  EnvironmentsSolutions.init({
    environmentName: DataTypes.STRING,
    username: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EnvironmentsSolutions',
  });
  return EnvironmentsSolutions;
};
