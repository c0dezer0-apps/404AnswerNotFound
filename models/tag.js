'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Tag.belongsToMany(models.Solution, {
        through: 'SolutionsTags',
        foreignKey: 'name',
        otherKey: 'solutionId'
      });
      models.Tag.belongsToMany(models.Problem, {
        through: 'ProblemsTags',
      });
      models.Tag.hasMany(models.ProblemsTags);
      models.Tag.hasMany(models.SolutionsTags);
    }
  }

  Tag.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};
