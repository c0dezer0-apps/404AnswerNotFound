'use strict';
const { Model } = require('sequelize');

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
        console.log("Something went wrong while creating the category.\n", err);
      }
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
    },
    shorthand: {
      unique: true,
      type: DataTypes.CHAR(2),
    }
  }, {
    sequelize,
    modelName: 'category',
  });
  return category;
};
