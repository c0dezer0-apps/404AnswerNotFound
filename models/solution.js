'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class solution extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.solution.belongsTo(models.user);
      models.solution.belongsTo(models.problem);
      models.solution.belongsToMany(models.tag, { through: 'solutions_tags' });
      models.solution.hasMany(models.solutions_tags);
    }
  }

  solution.init({
    solutionId: {
      allowNull: false,
      unique: true,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    problemId: {
      allowNull: false,
      type: DataTypes.STRING,
      references: {
        model: 'problem',
        key: 'problemId',
      }
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: 'solution',
  });
  return solution;
};
