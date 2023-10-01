import { DataTypes } from 'sequelize'
import { Database } from '../../database'

const Question = Database.connection.define(
  'Question',
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    testId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: 'questions',
    timestamps: true,
  },
)

export default Question
