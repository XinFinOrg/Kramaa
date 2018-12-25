'use strict';
module.exports = (sequelize, DataTypes) => {
  const project = sequelize.define('project', {
    uniqueId:{
      allowNull:false,
      primaryKey: true,
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue:DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue:DataTypes.NOW
    },
}, {});
  project.associate = function (models) {

  };
  return project;
};
