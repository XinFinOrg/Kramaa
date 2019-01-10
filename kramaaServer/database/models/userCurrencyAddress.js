'use strict';
module.exports = (sequelize, DataTypes) => {
  const userCurrencyAddress = sequelize.define('userCurrencyAddress', {
    currencyType: {
      type: DataTypes.STRING
    },

    address: {
      type: DataTypes.STRING
    },

    privateKey: {
      type: DataTypes.STRING
    },
    balance: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    uniqueId: {
      allowNull: false,
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
  }, {});
  userCurrencyAddress.associate = function(models) {
    
  };
  return userCurrencyAddress;
};
