'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('solutions_tags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      solutionId: {
        type: Sequelize.STRING
      },
      tagId: {
        type: Sequelize.INTEGER
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('solutions_tags');
  }
};
