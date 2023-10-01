import { TestModule } from './Test/Test.module'
import { QuestionModule } from './Question/Question.module'
import { registerAppModule } from './App/App.module'
import { AnswerModule } from './Answer/Answer.module'
import { TheoryModule } from './Theory/Theory.module'
import { ExerciseModule } from './Exercise/Exercise.module'
import * as path from 'path'
import { app } from 'electron'

export const registerApiIpc = () => {
  TestModule()
  TheoryModule()
  QuestionModule()
  AnswerModule()
  ExerciseModule()
  registerAppModule()
}

export const config = {
  filesDir: path.join(process.resourcesPath, 'files'),
  // filesDir: path.join(app.getAppPath(), 'resources', 'files'),
}
