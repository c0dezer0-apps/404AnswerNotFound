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
			models.problem.belongsTo(models.user, { as: 'author' });
      models.problem.belongsTo(models.subcategory);
      models.problem.hasMany(models.solution);
      models.problem.hasMany(models.problems_tags);
      models.problem.hasMany(models.complaint);
      models.problem.hasMany(models.image);
      models.problem.belongsToMany(models.tag, { through: 'problems_tags' });
    }

    static async createProblem(cat, user, data) {
      const id = `${cat.shorthand}${moment().format('DDMMYYYYhmmss')}-${user}`

      try {
        const [problem, created] = await this.create({
          problemId: id,
          lastModifiedDate: moment(),
          ...data
        });
      }
      catch (err) {
        console.error(`Something went wrong while creating problem:\n\n${err}`, );
      }
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
      reported: {
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      }
		},
		{
			sequelize,
			modelName: 'problem',
		}
	);
	return problem;
};
