'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class solutions_tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.solutions_tags.belongsTo(models.solution);
      models.solutions_tags.belongsTo(models.tag);
    }
  }
  solutions_tags.init({
    solutionId: DataTypes.STRING,
    tagId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'solutions_tags',
    timestamps: false,
  });
  return solutions_tags;
};
