'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class expertProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.expertProfile.belongsTo(models.user)
    }
  }
  expertProfile.init({
    expertId: {
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUID4,
      type: DataTypes.UUID
    },
    publicContactInfo: DataTypes.JSON,
    roles: DataTypes.ARRAY(DataTypes.STRING),
  }, {
    sequelize,
    modelName: 'expertProfile',
  });
  return expertProfile;
};
