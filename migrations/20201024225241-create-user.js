'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUID4,
        primaryKey: true,
        type: Sequelize.UUID
      },
      username: {
        type: Sequelize.STRING(25)
      },
      password: {
        type: Sequelize.STRING(99)
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      title: {
        type: Sequelize.STRING(25)
      },
      quote: {
        type: Sequelize.STRING(200)
      },
      jobTitle: {
        type: Sequelize.STRING(25)
      },
      bio: {
        type: Sequelize.STRING(500)
      },
      profilePicture: {
        type: Sequelize.BLOB('long'),
      },
      rating: {
        type: Sequelize.STRING
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
