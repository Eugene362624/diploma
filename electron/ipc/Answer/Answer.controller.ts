import { ipcMain } from 'electron'
import Answer from './Answer.model'
import { CreateAnswerDTO } from './Answer.dto'
import { CreateAnswerDto } from './dto/create.dto'
import { answerService } from './Answer.service'

export const AnswerController = () => {
  ipcMain.handle('get_answers', async (_event, data: { questionId: number }) => {
    try {
      const { questionId } = data
      return await Answer.findAll({ where: { questionId: questionId } })
    } catch (error) {
      console.error('Error while processing get_answers request:', error)
      return null
    }
  })

  ipcMain.handle('post_answer', async (_event, data: CreateAnswerDto) => {
    try {
      return await Answer.create({ ...data })
    } catch (error) {
      console.error('Error while processing post_answer request:', error)
      return null
    }
  })

  ipcMain.handle('put_answer', async (_event, data: any) => {
    try {
      return await answerService.update(data)
    } catch (error) {
      console.error('Error while processing put_answer request:', error)
      return null
    }
  })
}
