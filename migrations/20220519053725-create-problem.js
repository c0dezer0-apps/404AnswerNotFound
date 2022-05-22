'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('problems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      problemId: {
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      subcatId: {
        allowNull: false,
				type: Sequelize.INTEGER,
			},
      lastModifiedBy: {
				type: Sequelize.STRING,
			},
      lastModifiedDate: {
        allowNull: false,
				type: Sequelize.DATE,
			},
			summary: {
				type: Sequelize.STRING,
			},
			details: {
				type: Sequelize.TEXT,
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('problems');
  }
};
