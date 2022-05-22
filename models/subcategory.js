'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class subcategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.subcategory.belongsTo(models.category);
      models.subcategory.hasMany(models.problem)
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
        console.log("Cannot create subcategory.\n", err);
      }
    }
  }

  subcategory.init({
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
        throw error("You cannot set this!");
      }
    },
  },
  {
  sequelize,
  modelName: 'subcategory',
  });
  return subcategory;
};
