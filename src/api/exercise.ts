import { EXERCISE_METHODS } from './enums'
import { ipcManager } from './ipcManager'

class ExerciseApi {
  async create({ filename, name }: { filename: string; name: string }) {
    ipcManager.invoke(EXERCISE_METHODS.CREATE, { filename, name })
  }

  async getPdf({ id }: { id: string }) {
    return await ipcManager.invoke(EXERCISE_METHODS.GET_PDF, { id })
  }

  async getAll() {
    return ipcManager.invoke(EXERCISE_METHODS.GET_ALL, {})
  }

  async update({ id, name }: { id: string; name: string }) {
    return ipcManager.invoke(EXERCISE_METHODS.UPDATE, { id, name })
  }

  async delete(id: string) {
    return ipcManager.invoke(EXERCISE_METHODS.DELETE, { id })
  }
}

export const exerciseApi = new ExerciseApi()
