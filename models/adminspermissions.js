'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdminsPermissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.AdminsPermissions.belongsTo(models.AdminProfile);
      models.AdminsPermissions.belongsTo(models.Permission);
    }
  }
  AdminsPermissions.init({
    adminId: DataTypes.UUID,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AdminsPermissions',
  });
  return AdminsPermissions;
};
