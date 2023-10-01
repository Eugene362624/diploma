import { IQuestion } from 'src/interfaces/Question.interface'

export interface EditTestModalProps {
  testId: string
  isTestModalOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  setEditingTestId: React.Dispatch<React.SetStateAction<string>>
}

export interface CreateNewTestModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export interface NewTestNameModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  testToCreate: ITestToCreate
  setTestToCreate: (data: any) => void
  setModalStep: (updateFn: (prev: number) => number) => void
}

export interface NewTestQuestionsModalProps {
  testToCreate: ITestToCreate
  setTestToCreate: (updateFn: (prev: ITestToCreate) => ITestToCreate) => void
}

export interface ITestToCreate {
  name: string
  questions: any[]
}

export interface ITestInfo {
  id: string
  name: string
  isDraft: boolean
  questions?: IQuestion[]
}

export interface IQuestionInfo {
  title: string
  answers: any[]
}

export interface EditTestNameModalProps {
  testInfo: ITestInfo
  setIsEditTestNameModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  isEditTestNameModalOpen: boolean
  setTestInfo: React.Dispatch<React.SetStateAction<any>>
}

export interface EditTestQuestionModalProps {
  questionId: number | string
  setQuestionId: React.Dispatch<React.SetStateAction<string>>
}
