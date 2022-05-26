'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Category.hasMany(models.Problem, {
        as: 'problems',
        foreignKey: 'problemId',
        sourceKey: 'catId'
      });

      models.Category.hasMany(models.Subcategory, {
        foreignKey: 'subcatId',
        sourceKey: 'catId'
      })
    }

    static async createCategory(name, abb) {
      const lastEntry = this.findOne({
        order: [['catId', 'DESC']]
      });
      const id = !lastEntry ? 1 : lastEntry.catId + 1;

      try {
        await this.create({
          catId: id,
          name: name,
          shorthand: abb,
        });
      }
      catch (err) {
        console.log("Something went wrong while creating the Category.\n", err);
      }
    }
  };

  Category.init({
    catId: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    shorthand: {
      unique: true,
      type: DataTypes.CHAR(2),
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};
