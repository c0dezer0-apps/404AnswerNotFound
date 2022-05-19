'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class solution_tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.solution_tags.belongsTo(models.solution, { foreignKey: 'sid' });
      models.solution_tags.belongsTo(models.tag, { foreignKey: 'tid' });
    }
  }
  solution_tags.init({
    sid: DataTypes.STRING,
    tid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'solution_tags',
  });
  return solution_tags;
};
