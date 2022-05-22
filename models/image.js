'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.image.hasOne(models.user);
      models.image.belongsTo(models.problem);
      models.image.belongsTo(models.solution);
      models.image.belongsTo(models.complaint);
    }
  }
  image.init({
    imageId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    base64: {
      allowNull: false,
      type: DataTypes.BLOB('long'),
    },
    imageName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        is: /^([a-z0-9\._-@#$ ])/gi
      }
    },
    imageType: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        is: /^(image\/[jpeg|png|svg+xml|bmp]+$)/gi,
      },
    },
    uploader: {
      allowNull: false,
      type: DataTypes.STRING,
      references: {
        model: 'user',
        key: 'username',
      },
    }
  }, {
    sequelize,
    modelName: 'image',
  });
  return image;
};
