'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('complaints', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      reason: {
        type: Sequelize.TEXT
      },
      attachmentName: { type: Sequelize.STRING },
      attachmentType: { type: Sequelize.STRING },
      attachments: { type: Sequelize.BLOB('long') },
      closed: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      underReview: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      reportedBy: {
        type: Sequelize.STRING,
      },
      adminNotes: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('complaints');
  }
};
