import { IApiModel } from './ApiModel.interface'

export interface IAnswer extends IApiModel {
  title: string
  isCorrect: boolean
  questionId: string
}
