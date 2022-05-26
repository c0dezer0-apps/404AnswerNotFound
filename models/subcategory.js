'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subcategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Subcategory.belongsTo(models.Category);
      models.Subcategory.hasMany(models.Problem)
    }

    static async createSubcategory(name) {
      const lastEntry = await this.findOne({
        order: [['subcatId', 'DESC']],
      });
      const id = !lastEntry ? 1 : lastEntry.subcatId + 1;

      try {
        await this.create({
          subcatId: id,
          name: name,
        });
      }
      catch (err) {
        console.log("Cannot create Subcategory.\n", err);
      }
    }
  }

  Subcategory.init({
    name: DataTypes.STRING,
    subcatId: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    catId: {
      allowNull: false,
      references: {
        model: 'category',
        key: 'catId'
      },
      type: DataTypes.INTEGER,
    },
    category: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.catId.name;
      },
      set(value) {
        throw new Error("You cannot set this!");
      }
    },
  },
  {
  sequelize,
  modeSName: 'Subcategory',
  });
  return Subcategory;
};
