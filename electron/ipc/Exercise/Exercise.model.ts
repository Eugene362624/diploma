import { DataTypes } from 'sequelize'
import { Database } from '../../database'

const Exercise = Database.connection.define(
  'Exercise',
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
  },
  {
    tableName: 'exercise',
    timestamps: true,
  },
)

export default Exercise
