import { IQuestion } from 'src/interfaces/Question.interface'
import { ANSWER_IPC_METHODS, QUESTION_IPC_METHODS } from './enums'
import { ipcManager } from './ipcManager'

class AnswerService {
  public async getByQuestionId(questionId: number | string): Promise<IQuestion[]> {
    return await ipcManager.invoke(ANSWER_IPC_METHODS.GET_ALL, { questionId })
  }

  public async getOne(id: number | string): Promise<IQuestion> {
    return await ipcManager.invoke(QUESTION_IPC_METHODS.GET_ONE, { id })
  }

  public async create(data: any): Promise<any> {
    return await ipcManager.invoke(ANSWER_IPC_METHODS.CREATE, data)
  }
}

export const answerService = new AnswerService()
