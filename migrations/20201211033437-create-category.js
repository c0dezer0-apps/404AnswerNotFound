'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      catId: {
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      name: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      shorthand: {
        unique: true,
        type: Sequelize.CHAR(2),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('categories');
  }
};
