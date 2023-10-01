import { TheoryController } from './Theory.controller'
import Theory from './Theory.model'

export const TheoryModule = () => {
  Theory.sync()
  TheoryController()
}
