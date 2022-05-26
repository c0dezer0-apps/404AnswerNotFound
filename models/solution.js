'use strict';
const { Model } = require('sequelize');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  class Solution extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Solution.belongsTo(models.User, { as: 'author',  });
      models.Solution.belongsTo(models.Problem);
      models.Solution.hasMany(models.SolutionsTags, { as: 'tags'});
      models.Solution.hasMany(models.Complaint);
      models.Solution.hasMany(models.Image);
      models.Solution.belongsToMany(models.Tag, { through: 'SolutionsTags' });
      models.Solution.belongsToMany(models.Environment, {
        through: "EnvironmentsSolutions",
      });
    }
  }

  Solution.init({
    SolutionId: {
      allowNull: false,
      unique: true,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    lastModifiedBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastModifiedDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    verified: {
      type: DataTypes.DATE
    },
    solvedCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    sequelize,
    modelName: 'Solution',
  });
  return Solution;
};
