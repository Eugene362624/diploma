import { IAnswer, IQuestion } from '../../interfaces'
import { answerService } from '../Answer/Answer.service'
import { QuestionUpdateDTO } from './Question.dto'
import Question from './Question.model'
import { CreateQuestionDto } from './dto/create.dto'

class QuestionService {
  async getQuestion(id: number): Promise<any> {
    return await Question.findOne({ where: { id: id } })
  }

  async getQuestionsByTestId(testId: number): Promise<any> {
    const questions = await Question.findAll({ where: { testId: testId } })
    return questions
  }

  async update(data: { id: string; title: string; answers: IAnswer[] }) {
    try {
      await Question.update({ ...data }, { where: { id: data.id } })
      Promise.all(data.answers.map((answer) => answerService.update(answer)))
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message)
    }
  }

  async create(data: CreateQuestionDto) {
    try {
      const newQuestion = await Question.create({ title: data.title, testId: data.testId })
      Promise.all(
        data.answers.map((answer) =>
          answerService.create({
            title: answer.title,
            isCorrect: answer.isCorrect,
            questionId: newQuestion.dataValues.id,
          }),
        ),
      )
      newQuestion.save()
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message)
    }
  }

  async delete(questionIds: string[] | string) {
    try {
      await Question.destroy({
        where: {
          id: questionIds,
        },
      })
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message)
    }
  }
}

export const questionService = new QuestionService()
