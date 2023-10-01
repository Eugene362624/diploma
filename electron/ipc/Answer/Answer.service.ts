import { IAnswer } from '../../interfaces'
import Answer from './Answer.model'
import { CreateAnswerDto } from './dto/create.dto'

class AnswerService {
  async create(data: CreateAnswerDto) {
    try {
      const newAnswer = await Answer.create({
        questionId: data.questionId,
        isCorrect: data.isCorrect,
        title: data.title,
      })
      newAnswer.save()
      return newAnswer
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message)
    }
  }

  async update(data: IAnswer) {
    try {
      const result = await Answer.update(data, { where: { id: data.id } })
      if (result[0] == 0) {
        await this.create(data)
      }
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message)
    }
  }
}

export const answerService = new AnswerService()
