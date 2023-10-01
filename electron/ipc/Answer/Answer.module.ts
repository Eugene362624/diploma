import { AnswerController } from './Answer.controller'
import Answer from './Answer.model'

export const AnswerModule = () => {
  Answer.sync()
  AnswerController()
}
