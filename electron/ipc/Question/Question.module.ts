import Question from './Question.model'
import { QuestionController } from './Question.controller'

export const QuestionModule = () => {
  Question.sync()
  QuestionController()
}
