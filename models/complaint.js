'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Complaint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Complaint.hasOne(models.User);
      models.Complaint.belongsTo(models.Problem);
      models.Complaint.belongsTo(models.Solution);
      models.Complaint.belongsTo(models.User);
      models.Complaint.hasMany(models.Image);
    }

    static async createComplaint(data) {
      const id = lastEntry ? lastEntry.ComplaintId + 1 : 1;
      const lastEntry = await this.findOne({
        order: [['ComplaintId', 'DESC']]
      });

      try {
        const [Complaint, created] = this.create({
          solutionId: id,
          ...data
        });
      } catch (err) {
        console.error(`There was a problem while creating the Complaint: \n${err}`);
      }
    }
  }
  Complaint.init({
    ComplaintId: {
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
    modelName: 'Complaint',
  });
  return Complaint;
};
