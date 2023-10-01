import { IQuestion, ITest } from '../../interfaces'
import Answer from '../Answer/Answer.model'
import { answerService } from '../Answer/Answer.service'
import Question from '../Question/Question.model'
import { questionService } from '../Question/Question.service'
import Theory from '../Theory/Theory.model'
import Test from './Test.model'
import { CreateTestDto } from './dto/create.dto'

class TestService {
  async getTest(id: string): Promise<any> {
    const test = await Test.findOne({
      where: { id: id },
      include: [
        { model: Question, as: 'questions', include: [{ model: Answer, as: 'answers' }] },
        { model: Theory, as: 'theory' },
      ],
    })
    return await test?.get({ plain: true })
  }

  async getTests({ withDrafts }: { withDrafts: boolean }): Promise<any> {
    return await Test.findAll({ where: withDrafts ? {} : { isDraft: false }, raw: true })
  }

  async updateTest({ id, toUpdate }: { id: string; toUpdate: ITest }) {
    try {
      const test: ITest = await this.getTest(id)

      const existingQuestionsIds = test.questions.map((e) => e.id)

      const questionsToCreate = toUpdate.questions.filter(
        (e) => !existingQuestionsIds.includes(e.id),
      )

      const questionsToDeleteIds = existingQuestionsIds.filter(
        (questionId) => !toUpdate.questions.some((e) => e.id === questionId),
      )

      const questionsToUpdate = toUpdate.questions.filter(
        (question) =>
          JSON.stringify(question) !==
          JSON.stringify(test.questions.find((e) => e.id === question.id)),
      )

      if (questionsToCreate.length > 0) {
        questionsToCreate.forEach(async (question) => {
          await questionService.create(question)
        })
      }

      if (questionsToDeleteIds.length > 0) {
        questionsToDeleteIds.forEach(async (e) => {
          await questionService.delete(e)
        })
      }

      if (questionsToUpdate.length > 0) {
        questionsToUpdate.forEach(async (e) => {
          await questionService.update(e)
        })
      }

      Test.update(toUpdate, { where: { id: id } })
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message)
    }
  }

  async create(data: CreateTestDto) {
    try {
      const newTest = await Test.create({ name: data.name, isDraft: data.isDraft })
      await Promise.all(
        data.questions.map((question) =>
          questionService.create({
            testId: newTest.dataValues.id,
            title: question.title,
            answers: question.answers,
          }),
        ),
      )
      newTest.save()
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message)
    }
  }

  async delete(id: string) {
    try {
      return await Test.destroy({
        where: {
          id,
        },
      })
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message)
    }
  }
}

export const testService = new TestService()
