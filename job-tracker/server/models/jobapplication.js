'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobApplication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  JobApplication.init({
    jobId: DataTypes.STRING,
    userId: DataTypes.STRING,
    company: DataTypes.STRING,
    position: DataTypes.STRING,
    status: DataTypes.STRING,
    notes: DataTypes.STRING,
    dateApplied: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'JobApplication',
  });
  return JobApplication;
};