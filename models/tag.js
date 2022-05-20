'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.tag.belongsToMany(models.solution, { through: 'solutions_tags' });
      models.tag.belongsToMany(models.problem, { through: 'problems_tags' });
      models.tag.hasMany(models.problems_tags);
      models.tag.hasMany(models.solutions_tags);
    }

    static generateId() {
      
    }
  }
  tag.init({
    name: DataTypes.STRING,
    tagId: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'tag',
  });
  return tag;
};
