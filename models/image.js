'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Image.hasOne(models.User);
      models.Image.belongsTo(models.Problem);
      models.Image.belongsTo(models.Solution);
      models.Image.belongsTo(models.Complaint);
    }
  }
  Image.init({
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
        is: /^([._\-@#$ a-z0-9])/gi
      }
    },
    imageType: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        is: /^(Image\/[jpeg|png|svg+xml|bmp]+$)/gi,
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
    modelName: 'Image',
  });
  return Image;
};
