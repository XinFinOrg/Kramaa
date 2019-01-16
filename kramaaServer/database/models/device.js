'use strict';
module.exports = (sequelize, DataTypes) => {
  const device = sequelize.define('device', {
    uniqueId:{
      allowNull:false,
      primaryKey: true,
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    urn: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    tokenId: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    thingURN: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    protocol: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    deviceVendor: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    associationStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    transactionHash: {
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
  device.associate = function (models) {

  };
  return device;
};
