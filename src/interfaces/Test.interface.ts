import { IApiModel } from './ApiModel.interface'

export interface ITest extends IApiModel {
  name: string
  isDraft: boolean
}
