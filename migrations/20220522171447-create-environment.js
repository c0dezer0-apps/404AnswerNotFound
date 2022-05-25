'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('environments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      environmentId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      stage: {
        allowNull: false,
        type: Sequelize.STRING
      },
      OS: {
        allowNull: false,
        type: Sequelize.STRING
      },
      semver: {
        type: Sequelize.STRING
      },
      numericVersion: {
        type: Sequelize.FLOAT
      },
      container: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      kubernetes: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      stack: {
        defaultValue: [],
        type: Sequelize.ARRAY(Sequelize.JSON)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('environments');
  }
};
