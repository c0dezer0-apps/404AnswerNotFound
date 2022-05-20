'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class problem extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.problem.belongsTo(models.user);
      models.problem.belongsTo(models.subcategory);
      models.problem.hasMany(models.solution);
      models.problem.hasMany(models.problems_tags);
      models.problem.belongsToMany(models.tag, { through: 'problems_tags' });
    }
  }

	problem.init(
    {
      problemId: {
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      subcategory: {
        allowNull: false,
        references: {
          model: 'subcategory',
          key: 'subcatId',
        },
        field: 'subcatId',
        type: DataTypes.INTEGER,
        get() {
          return `${this.getDataValue('subcategory').name}`;
        }
      },
      createdBy: {
        allowNull: false,
        type: DataTypes.STRING,
        references: {
          model: 'user',
          key: 'username'
        }
			},
      lastModifiedBy: {
        allowNull: false,
        type: DataTypes.STRING,
        references: {
          model: 'user',
          key: 'username'
        }
			},
      lastModifiedDate: {
        allowNull: false,
				type: DataTypes.DATE,
			},
			summary: {
				type: DataTypes.STRING,
				validate: {
					len: {
						args: [100 - 255],
						msg: 'Must be between 100 to 255 characters',
					},
					min: {
						args: 100,
						msg: 'Must be at least 100 characters long to ensure quality control.',
					},
					max: {
						args: 255,
						msg: 'Must be 255 characters or less.',
					},
				},
			},
			details: {
				type: DataTypes.TEXT,
				validation: {
					min: {
						args: 300,
						msg: 'Details need to be at least 300 characters.',
					},
				}
      },
		},
    {
      instanceMethods: {
        /* Generates the PID, a combination of the first and last letters of the category,
        a formatted datetime string, and the first and last characters of the author's username
        in uppercase separated by a hyphen. E.G jt0519202212830-AZ */
        generateProblemId: function () {
          const dateAsString = moment(this.lastModifiedDate).format('DDMMYYYYhmmss');

          return this.category[0] + this.category[this.category.length - 1] + dateAsString +
            '-' + this.createdBy[0].toUpper() + this.createdBy[this.createdBy.length - 1].toUpper();
        },
        // Sets pid with generatePID() and model.save();
        generate: function () {
          this.problemId = this.generateProblemId();
          this.save();
        },
      },
    },
		{
			sequelize,
			modelName: 'problem',
		}
	);
	return problem;
};
