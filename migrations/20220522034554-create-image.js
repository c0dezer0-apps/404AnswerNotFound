'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      imageId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      base64: {
        allowNull: false,
        type: Sequelize.BLOB('long')
      },
      imageName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      imageType: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      uploader: {
        allowNull: false,
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('images');
  }
};
