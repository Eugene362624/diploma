import { THEORY_METHODS } from './enums'
import { ipcManager } from './ipcManager'

class TheoryApi {
  async create({ filename, name }: { filename: string; name: string }) {
    ipcManager.invoke(THEORY_METHODS.CREATE, { filename, name })
  }

  async getAll() {
    return await ipcManager.invoke(THEORY_METHODS.GET_ALL, {})
  }

  async getPdf({ id }: { id: string }) {
    return await ipcManager.invoke(THEORY_METHODS.GET_PDF, { id })
  }

  async update({ id, name }: { id: string; name: string }) {
    return await ipcManager.invoke(THEORY_METHODS.UPDATE, { id, name })
  }

  async delete(id: string) {
    return await ipcManager.invoke(THEORY_METHODS.DELETE, { id })
  }
}

export const theoryApi = new TheoryApi()
