const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports.create = sequelize => {
  class Entry extends Sequelize.Model {}
  Entry.init(
    {
      datetime: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      longitude: {
        type: DataTypes.DECIMAL(9, 6)
      },
      latitude: {
        type: DataTypes.DECIMAL(9, 6)
      },
      temperature: {
        type: DataTypes.DECIMAL(6, 2)
      },
      carbonmonoxide: {
        type: DataTypes.DECIMAL(5, 2)
      },
      humidity: {
        type: DataTypes.DECIMAL(4, 2)
      },
      pressure: {
        type: DataTypes.DECIMAL(10, 2)
      },
      brightness: {
        type: DataTypes.DECIMAL(20, 2)
      }
    },
    {
      sequelize,
      tableName: "entry",
      freezeTableName: true
    }
  );
  return Entry;
};
