'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.tag.belongsToMany(models.solution, { through: 'solutions_tags' });
      models.tag.belongsToMany(models.problem, { through: 'problems_tags' });
      models.tag.hasMany(models.problems_tags);
      models.tag.hasMany(models.solutions_tags);
    }
    static async generateTag(tagName) {
      const lastEntry = this.findOne({
        order: [['createdAt', 'DESC']]
      });
      const id = !lastEntry ? 1 : lastEntry.tagId + 1;
      try {
        const [tag, created] = await this.findOrCreate({
          where: { tagId: id },
          defaults: {
            tagId: id,
            name: tagName,
          }
        });
        if (created)
          console.log(`Tag ${tag.name} successfully created.`);
        else
          console.log(`Tag ${tag.name} already exists.`);
      }
      catch (err) {
        console.log(`Something went wrong while trying to create tag.\n\n${err}`);
      }
    }
  }
  tag.init({
    name: DataTypes.STRING,
    tagId: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'tag',
  });
  return tag;
};
