'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('problems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pid: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      category: {
				type: Sequelize.STRING,
			},
			createdBy: {
				type: Sequelize.STRING,
			},
			lastModifiedBy: {
				type: Sequelize.STRING,
			},
			lastModifiedDate: {
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
