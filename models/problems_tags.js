'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class problems_tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.problems_tags.belongsTo(models.problem);
      models.problems_tags.belongsTo(models.tag);
    }
  }
  problems_tags.init({
    problemId: DataTypes.STRING,
    tagId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'problems_tags',
  });
  return problems_tags;
};
