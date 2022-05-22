'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class solution extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.solution.belongsTo(models.user, { as: 'author',  });
      models.solution.belongsTo(models.problem);
      models.solution.hasMany(models.solutions_tags);
      models.solution.hasMany(models.complaint);
      models.solution.hasMany(models.image);
      models.solution.belongsToMany(models.tag, { through: 'solutions_tags' });
    }

    static async createSolution(user, data) {
      const id = lastEntry ? lastEntry.solutionId + 1 : 1;
      const lastEntry = await this.findOne({
        order: [['solutionId', 'DESC']]
      });

      try {
        const [solution, created] = await this.create({
          solutionId: id,
          lastModifiedDate: moment(),
          ...data
        });
      }
      catch (err) {
        console.error(`Something went wrong while creating solution:\n\n${err}`);
      }
    }
  }

  solution.init({
    solutionId: {
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
    modelName: 'solution',
  });
  return solution;
};
