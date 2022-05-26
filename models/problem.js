'use strict';
const { Model } = require('sequelize');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  class Problem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Problem.belongsTo(models.User, { as: 'author' });
      models.Problem.belongsTo(models.Subcategory);
      models.Problem.hasMany(models.Solution);
      models.Problem.hasMany(models.ProblemsTags, { as: "tags" });
      models.Problem.hasMany(models.Complaint);
      models.Problem.hasMany(models.Image);
      models.Problem.belongsToMany(models.Tag, { through: 'ProblemsTags' });
    }
  }

  Problem.init(
    {
      ProblemId: {
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      lastModifiedBy: {
        type: DataTypes.STRING,
        references: {
          model: 'user',
          key: 'username'
        }
      },
      lastModifiedDate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      summary: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [100 - 255],
            msg: 'Must be between 100 to 255 characters',
          },
          min: {
            args: 100,
            msg: 'Must be at least 100 characters long to ensure quality control.',
          },
          max: {
            args: 255,
            msg: 'Must be 255 characters or less.',
          },
        },
      },
      details: {
        type: DataTypes.TEXT,
        validation: {
          min: {
            args: 300,
            msg: 'Details need to be at least 300 characters.',
          },
        }
      },
      reported: {
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      }
    },
    {
      sequelize,
      modelName: 'Problem',
    }
  );
  return Problem;
};
