import { ExerciseController } from './Exercise.controller'
import Exercise from './Exercise.model'

export const ExerciseModule = () => {
  Exercise.sync()
  ExerciseController()
}
