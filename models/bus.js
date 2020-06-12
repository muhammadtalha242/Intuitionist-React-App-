
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bus', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    bus_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bus_code: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },{
    createdAt:false,
    updatedAt:false,
    tableName: 'bus'
  }
  
);
}
