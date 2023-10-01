import { IAnswer } from '../../../interfaces'
import { CreateAnswerDto } from '../../Answer/dto/create.dto'

export interface CreateQuestionDto {
  testId: string
  title: string
  answers: IAnswer[]
}
