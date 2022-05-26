'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Permission.belongsToMany(models.User, {
        through: 'UsersPermissions',
        foreignKey: 'name',
        otherKey: 'username'
      });
      models.Permission.belongsToMany(models.AdminProfile, {
        through: 'AdminsPermissions'
      })
      models.Permission.hasMany(models.UsersPermissions);
      models.Permission.hasMany(models.AdminsPermissions);
    }
  }
  Permission.init({
    power: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Permission',
  });
  return Permission;
};
