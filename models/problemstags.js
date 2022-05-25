'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProblemsTags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.ProblemsTags.belongsTo(models.problem, { as: 'tags' });
      models.ProblemsTags.belongsTo(models.tag, { as: 'tags' });
    }
  }

  ProblemsTags.init({
    problemId: DataTypes.STRING,
    tagId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProblemsTags',
  });
  return ProblemsTags;
};
