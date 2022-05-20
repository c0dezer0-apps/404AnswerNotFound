'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
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
  }

  subcategory.init({
    name: DataTypes.STRING,
    subcatId: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    category: {
      allowNull: false,
      field: 'catId',
      references: {
        model: 'category',
        key: 'catId'
      },
      type: DataTypes.INTEGER,
      get() {
        return `${this.getDataValue('category').name}`
      }
    }
  }, {
    sequelize,
    modelName: 'subcategory',
  });
  return subcategory;
};
