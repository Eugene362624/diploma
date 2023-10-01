import { ipcMain } from 'electron'
import { exerciseService } from './Exercise.service'
import { createExerciseDto } from './dto/create.dto'

export const ExerciseController = () => {
  ipcMain.handle('get_exercises', async (_event, data) => {
    return exerciseService.getAll()
  })

  ipcMain.handle('get_exercise', async (_event, data: { id: string }) => {
    const { id } = data
    return exerciseService.getById(id)
  })

  ipcMain.handle('get_pdf_exercise', async (_event, data: { id: string }) => {
    const { id } = data
    return await exerciseService.getPdf(id)
  })

  ipcMain.handle('post_exercise', async (_event, data: createExerciseDto) => {
    const { filename, name } = data
    exerciseService.create({ filename: filename, name: name })
  })

  ipcMain.handle('put_exercise', async (_event, data: { id: string; name: string }) => {
    const { id, name } = data
    exerciseService.update({ id, name })
  })

  ipcMain.handle('delete_exercise', async (_event, data: { id: string }) => {
    const { id } = data
    exerciseService.delete(id)
  })
}
