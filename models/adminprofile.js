'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdminProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.AdminProfile.belongsTo(models.User);
      models.AdminProfile.belongsToMany(models.Permission, {
        through: 'AdminsPermissions',
        otherKey: 'name',
      });
      models.AdminProfile.hasMany(models.AdminsPermissions);
    }
  }
  AdminProfile.init({
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    isSuperuser: {
      defaultValue: false,
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'AdminProfile',
  });
  return AdminProfile;
};
