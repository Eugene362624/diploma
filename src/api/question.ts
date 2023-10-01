import { IQuestion } from 'src/interfaces/Question.interface'
import { QUESTION_IPC_METHODS } from './enums'
import { ipcManager } from './ipcManager'

class QuestionService {
  public async getByTestId(testId: number | string): Promise<IQuestion[]> {
    return await ipcManager.invoke(QUESTION_IPC_METHODS.GET_BY_TEST_ID, { testId })
  }

  public async getOne(id: number | string): Promise<IQuestion> {
    return await ipcManager.invoke(QUESTION_IPC_METHODS.GET_ONE, { id })
  }

  public async updateOne(data: { id: number | string; toUpdate: any }): Promise<IQuestion> {
    const result = await ipcManager.invoke(QUESTION_IPC_METHODS.UPDATE_QUESTION, data)
    if (result.error) {
      return Promise.reject(result.error)
    }
    return result
  }

  public async create(data: any) {
    ipcManager.invoke(QUESTION_IPC_METHODS.CREATE, data)
  }
}

export const questionService = new QuestionService()
