import { ipcMain } from 'electron'
import Theory from './Theory.model'
import ITheory from '../../interfaces/Theory'
import { theoryService } from './Theory.service'

export const TheoryController = () => {
  ipcMain.handle('get_all_theory', async (_event, data) => {
    return await theoryService.getAll()
  })

  ipcMain.handle('post_theory', async (_event, data) => {
    return await theoryService.create(data)
  })

  ipcMain.handle('get_pdf_theory', async (_event, data: { id: string }) => {
    const { id } = data
    return await theoryService.getPdf(id)
  })

  ipcMain.handle('put_theory', async (_event, data: ITheory) => {
    return await theoryService.update(data)
  })

  ipcMain.handle('delete_theory', async (_event, data: { id: string }) => {
    const { id } = data
    return await theoryService.delete(id)
  })
}
