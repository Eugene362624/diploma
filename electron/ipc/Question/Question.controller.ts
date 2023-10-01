import { ipcMain } from 'electron'
import { questionService } from './Question.service'

export const QuestionController = () => {
  ipcMain.handle('get_questions', async (_event, data: { testId: number }) => {
    try {
      const { testId } = data
      return await questionService.getQuestionsByTestId(testId)
    } catch (error) {
      console.error('Error while processing get_questions request:', error)
      return null
    }
  })

  ipcMain.handle('get_question', async (_event, data: { id: number }) => {
    try {
      const { id } = data
      return await questionService.getQuestion(id)
    } catch (error) {
      console.error('Error while processing get_question request:', error)
      return null
    }
  })

  ipcMain.handle('put_question', async (_event, data: any) => {
    try {
      return await questionService.update(data)
    } catch (error) {
      return {
        error: {
          message: 'Ошибка при попытке обновить вопрос',
          reason: (error as Error).message,
        },
      }
    }
  })

  ipcMain.handle('post_question', async (_event, data: any) => {
    try {
      return await questionService.create(data)
    } catch (error) {
      return {
        error: {
          message: 'Ошибка при попытке обновить вопрос',
          reason: (error as Error).message,
        },
      }
    }
  })
}
