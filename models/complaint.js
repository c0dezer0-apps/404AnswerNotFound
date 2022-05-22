'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class complaint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.complaint.hasOne(models.user);
      models.complaint.belongsTo(models.problem);
      models.complaint.belongsTo(models.solution);
      models.complaint.belongsTo(models.user);
      models.complaint.hasMany(models.image);
    }

    static async createComplaint(data) {
      const id = lastEntry ? lastEntry.complaintId + 1 : 1;
      const lastEntry = await this.findOne({
        order: [['complaintId', 'DESC']]
      });

      try {
        const [complaint, created] = this.create({
          solutionId: id,
          ...data
        });
      } catch (err) {
        console.error(`There was a problem while creating the complaint: \n${err}`);
      }
    }
  }
  complaint.init({
    complaintId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    reason: {
      allowNull: false,
      type: DataTypes.TEXT,
      validate: {
        notNull: false,
        notEmpty: true,
      }
    },
    closed: {
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    },
    underReview: {
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    },
    claimedBy: {
      type: DataTypes.STRING,
      references: {
          model: 'user',
          key: 'username',
      },
    },
    adminNotes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'complaint',
  });
  return complaint;
};
