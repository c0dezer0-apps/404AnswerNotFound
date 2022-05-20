'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.category.hasMany(models.problem, {
        as: 'problems',
        foreignKey: 'problemId',
        sourceKey: 'catId'
      });
      models.category.hasMany(models.subcategory, {
        foreignKey: 'subcatId',
        sourceKey: 'catId'
      })
    }
  };
  category.init({
    catId: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'category',
  });
  return category;
};
