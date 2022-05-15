'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bug extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  bug.init({
    error: DataTypes.TEXT,
    location: DataTypes.STRING,
    activity: DataTypes.STRING,
    user: DataTypes.STRING,
    bugCategory: DataTypes.ARRAY[DataTypes.STRING],
    status: {
      allowNull: false,
      defaultValue: "Untracked",
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'bug',
  });
  return bug;
};
