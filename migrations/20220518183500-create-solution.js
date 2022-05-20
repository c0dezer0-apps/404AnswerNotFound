'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('solutions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      solutionId: {
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      problemId: {
        type: Sequelize.STRING,
        references: {
          model: 'problem',
          key: 'problemId'
        },
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      verified: {
        type: Sequelize.DATE
      },
      solvedCount: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      createdBy: {
			  allowNull: false,
        type: Sequelize.STRING,
      },
      lastModifiedBy: {
			  allowNull: false,
			  type: Sequelize.STRING,
      },
      lastModifiedDate: {
			  allowNull: false,
			  type: Sequelize.DATE,
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('solutions');
  }
};
