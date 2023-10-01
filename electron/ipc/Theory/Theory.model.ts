import { DataTypes } from 'sequelize'
import { Database } from '../../database'

const Theory = Database.connection.define(
  'Theory',
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
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    testId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    tableName: 'theory',
    timestamps: true,
  },
)

export default Theory
