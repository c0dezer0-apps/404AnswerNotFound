'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SolutionsTags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.SolutionsTags.belongsTo(models.Solution);
      models.SolutionsTags.belongsTo(models.Tag);
    }
  }

  SolutionsTags.init({
    solutionId: DataTypes.STRING,
    tagId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SolutionsTags',
    timestamps: false,
  });
  return SolutionsTags;
};
