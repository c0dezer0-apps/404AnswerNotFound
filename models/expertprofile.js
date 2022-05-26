'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExpertProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.ExpertProfile.belongsTo(models.User)
    }
  }
  ExpertProfile.init({
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
    modelName: 'ExpertProfile',
  });
  return ExpertProfile;
};
