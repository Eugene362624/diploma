import IModel from './Model'
import IQuestion from './Question'

export default interface ITest extends IModel {
  name: string
  questions: IQuestion[]
  theory: any
}
