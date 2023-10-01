import Test from './Test.model'
import { TestController } from './Test.controller'

export const TestModule = () => {
  Test.sync()
  TestController()
}
