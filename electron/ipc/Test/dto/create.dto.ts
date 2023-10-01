import { CreateQuestionDto } from '../../Question/dto/create.dto'

export interface CreateTestDto {
  isDraft: boolean
  name: string
  questions: CreateQuestionDto[]
}
