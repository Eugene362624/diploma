import IAnswer from './Answer'
import IModel from './Model'

export default interface IQuestion extends IModel {
  title: string
  testId: string
  answers: IAnswer[]
}
