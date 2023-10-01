import { DataTypes } from 'sequelize'
import { Database } from '../../database'

const Test = Database.connection.define(
  'Test',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    isDraft: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: 'tests',
    timestamps: true,
  },
)

export default Test
