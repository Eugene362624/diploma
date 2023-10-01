import { ipcMain } from 'electron'
import { testService } from './Test.service'
import { IQuestion, ITest } from '../../interfaces'

export const TestController = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ipcMain.handle('get_tests', async (_event, { withDrafts = true }) => {
    try {
      return await testService.getTests({ withDrafts })
    } catch (error) {
      console.error('Error while processing get_tests request:', error)
      return null
    }
  })

  ipcMain.handle('get_test', async (_event, data: { id: string }) => {
    try {
      const { id } = data
      return await testService.getTest(id)
    } catch (error) {
      console.error('Error while processing get_test request:', error)
      return null
    }
  })

  ipcMain.handle(
    'put_test',
    async (
      _event,
      data: {
        id: string
        toUpdate: ITest
      },
    ) => {
      try {
        const { id, toUpdate } = data
        return await testService.updateTest({ id: id, toUpdate: toUpdate })
      } catch (error) {
        return {
          error: {
            message: 'Ошибка при попытке обновить тест',
            reason: (error as Error).message,
          },
        }
      }
    },
  )

  ipcMain.handle('post_test', async (_event, data: any) => {
    try {
      // console.log(data)
      return await testService.create(data)
    } catch (error) {
      // return {
      //   error: {
      //     message: 'Ошибка при попытке создать тест',
      //     reason: (error as Error).message,
      //   },
      // }
    }
  })

  ipcMain.handle('delete_test', async (_event, data: { id: string }) => {
    try {
      const { id } = data
      return await testService.delete(id)
    } catch (error) {
      return {
        error: {
          message: 'Ошибка при попытке удалить тест',
          reason: (error as Error).message,
        },
      }
    }
  })
}
