import { IApiModel } from './ApiModel.interface'

export interface IQuestion extends IApiModel {
  title: string
  testId: string
}
