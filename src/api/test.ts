import { ITest } from 'src/interfaces/Test.interface'
import { ipcManager } from './ipcManager'
import { TEST_IPC_METHODS } from './enums'
import { ITestInfo } from 'src/pages/Admin/EditTestsPage/components/TestQuestionModal'

class TestApi {
  public async getAll({ withDrafts = true }: { withDrafts?: boolean }): Promise<ITest[]> {
    return await ipcManager.invoke(TEST_IPC_METHODS.GET_ALL, { withDrafts })
  }

  public async getById(id: string): Promise<any> {
    return await ipcManager.invoke(TEST_IPC_METHODS.GET_ONE, { id })
  }

  public async updateOne(data: { id: string; toUpdate: any }): Promise<any> {
    return await ipcManager.invoke(TEST_IPC_METHODS.UPDATE, data)
  }

  public async create(data: ITestInfo): Promise<any> {
    return await ipcManager.invoke(TEST_IPC_METHODS.CREATE, data)
  }

  public async delete(id: string) {
    return await ipcManager.invoke(TEST_IPC_METHODS.DELETE, { id })
  }
}

export const testApi = new TestApi()
