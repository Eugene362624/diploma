import IModel from './Model'

export default interface IAnswer extends IModel {
  isCorrect: boolean
  questionId: string
  title: string
}
