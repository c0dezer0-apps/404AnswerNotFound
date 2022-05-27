'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExpertProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.ExpertProfile.belongsTo(models.User)
    }
  }
  ExpertProfile.init({
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
      validate: {
        min: 150,
        max: 1000,
        notNull: true,
        notContains: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i
      },
    },
    projectHistory: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      validate: {
        isValidHistory(array) {
          const validProps = ['title', 'description', 'from', 'to'];

          if (!array) return array;
          else {
            array.forEach(entry => {
              if (!validProps.every(el => Object.keys(entry).includes(el))) {
                throw new Error("History object must contain a title, description, from, and to.");
              }
            });
          }

          const regexpDesc = /^(\w|\W)+$/i;
          const regexpTitle = /^[0-9a-z\-_.]/i;

          array.forEach(entry => {
            Object.entries(entry).forEach(([key, val]) => {
              if (key === 'title') {
                if (!regexpTitle.test(val))
                  throw new Error("Title can only contain characters of  value 0-9, a-z '-', '_', or '.'");
              }
              else if (key === 'description') {
                if (!regexpDesc.test(val))
                  throw new Error("Illegal characters not allowed.");
              }
              else if (key === 'from' || key === 'to') {
                if (val instanceof Date === false)
                  throw new Error("To and From fields must be a valid Date object.");
              }
            });
          });

          return array;
        }
      }
    },
    skills: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.CHAR(30)),
      validate: {
        isValidSkill(array) {
          if (!array) return array;

          const regexp = /^[a-z]+$/i
          array.forEach(entry => {
            if (!regexp.test(entry))
              throw new Error("Skills can only contain alpha characters.");
          });

          return array;
        }
      }
    },
    technologies: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.JSON),
      validate: {
        isValidTechnologies(array) {
          const validProps = ['name', 'source', 'proficiency'];

          if (!array) return array;

          const urlRegexp = /https?:\/\/(www\.)?[-a-z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/i;
          const nameRegexp = /^[a-z0-9\-_.]+$/i;
          const proRegexp = /^(beginner|basic|intermediate|expert)$/i

          array.forEach(entry => {
            if (!validProps.every(prop => Object.keys(entry).includes(prop)))
              throw new Error("Technology object must contain 'name', 'source', and 'proficiency'")

            Object.entries(entry).forEach(([key, val]) => {
              switch (key) {
                case 'name':
                  if (!nameRegexp.test(val))
                    throw new Error("Name can only contain alphanumeric characters and '-', '_', and '.' characters.");
                  break;
                case 'source':
                  if (!urlRegexp.test(val))
                    throw new Error("Source must be an url pointing to tech's home page.");
                  break;
                case 'proficiency':
                  if (!proRegexp.test(val)) 
                    throw new Error("Proficiency must be 'beginner', 'basic', 'intermediate', or 'expert'.")
                  break;
              }
            });
          })
        }
      },
    },
  }, {
    sequelize,
    modelName: 'ExpertProfile',
  });
  return ExpertProfile;
};
