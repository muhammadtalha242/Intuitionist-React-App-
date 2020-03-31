const Sequelize = require('sequelize')
const db = require("../config")

module.exports = db.define(
  'annualsecuritycost',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    rate: {
      type: Sequelize.DECIMAL,
      allowNull: true
    },
    year: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)

