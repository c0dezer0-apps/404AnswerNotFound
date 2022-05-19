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
      models.solution.belongsTo(models.user, {
        foreignKey: 'uuid',
        target: 'sid',
      });
      models.solution.belongsTo(models.problem, {
        foreignKey: 'pid',
        target: 'sid'
      });
      models.solution.belongsToMany(models.tag, {
        through: 'solutions_tags',
        foreignKey: 'sid',
        otherKey: 'tid',
      });
      models.solution.hasMany(models.solutions_tags, { foreignKey: 'sid' });
    }
  }

  solution.init({
    sid: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
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
