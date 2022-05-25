'use strict';
const {
  Model
} = require('sequelize');

const techSchema = {
  name: function (name) {
    return /^([a-zA-Z0-9_\- .])+$/gi.test(name);
  },
  version: function (version) {
    return /(^(\d*)(\.{1}(\d){1,2})?(\.{1}(\d){1,2}))$|(^(\d*)(\.{1}(\d){1,2})(\.{1}(\d){1,2})(-(\w+))?(\.(\d){1,2})?)$|(^(\d*))$/i.test(version)
  },
  source: function (url) {
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/i.test(url);
  },
}

module.exports = (sequelize, DataTypes) => {
  class Environment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Environment.belongsToMany(models.User, {
        through: 'EnvironmentsUsers',
        foreignKey: 'name',
        otherKey: 'username',
      });
      models.Environment.belongsToMany(models.Problem, {
        through: 'EnvironmentsProblems',
        foreignKey: 'name',
        otherKey: 'problemId',
      })
      models.Environment.belongsToMany(models.Solution, {
        through: 'EnvironmentsSolutions',
        foreignKey: 'name',
        otherKey: 'solutionId',
      })
    }
  }
  Environment.init({
    EnvironmentId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        is: /^([a-z0-9\-_ .])+$/gi,
        notNull: true,
      },
    },
    stage: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isAlpha: true,
        is: /(^dev(el)?(opment)?)|(^test(ing)?)|(^prod(uction)?)/gi
      }
    },
    OS: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        isAlpha: true
      },
    },
    /*
    Semantic versioning, which is an alphanumeric versioning format.
    Each major, minor, subminor number can only be 0 or numeric with no leading 0's.
    e.g.  1.23.3-a.3, 0.2.3-b.1, 1.1.1, or 1.2.3-c
    */
    semver: {
      type: DataTypes.STRING,
      validate: {
        isNull: true,
        is: /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/gi
      },
    },
    numericVersion: {
      type: DataTypes.FLOAT,
      validate: {
        is: /^(\d*)(\.{1}(\d){1,2})?(\.{1}(\d){1,2})?$/gi,
        isNull: true,
        isNumeric: true
      }
    },
    container: {
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    kubernetes: {
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    stack: {
      defaultValue: [],
      type: DataTypes.ARRAY(DataTypes.JSON),
      validate: {
        matchesTechSchema(entry) {
          if (entry === {})
            console.error("Tech entry cannot be empty");

          const errors = Object.keys(techSchema).filter(key => !techSchema[key]).map(key => new Error(key + " is invalid."));

          if (errors.length > 0)
            throw new Error(`Entry does not contain the correct values:\n\n${errors}`);
        }
      },
    },
    createdBy: {
      allowNull: false,
      type: DataTypes.STRING,
      references: {
        model: 'user',
        key: 'username',
      },
    },
  }, {
    sequelize,
    modelName: 'Environment',
  });
  return Environment;
};
