import * as path from 'path'
import * as fs from 'fs'
import Exercise from './Exercise.model'
import { app } from 'electron'
import { PDFDocument } from 'pdf-lib'
import { createExerciseDto } from './dto/create.dto'
import { config } from '../api.ipc'

class ExerciseService {
  // filesDir = path.join(process.resourcesPath, 'files')
  filesDir = path.join(app.getAppPath(), 'resources', 'files')

  async create({ filename, name }: createExerciseDto) {
    await Exercise.create({ filename: filename, name: name })
  }

  //   async update() {}

  async getAll() {
    return await Exercise.findAll({ raw: true })
  }

  async getById(id: string) {
    const exercise = await Exercise.findOne({ where: { id } })
    const exerciceObj = await exercise?.get({ plain: true })
    const pdfPath = path.join(this.filesDir, exerciceObj.filename)
    const pdfData = fs.readFileSync(pdfPath)
    const pdfDoc = await PDFDocument.load(pdfData)
    pdfDoc.setTitle(exerciceObj.name)
    const modifiedPdfData = await pdfDoc.save()
    return modifiedPdfData
  }

  async delete(id: string) {
    try {
      const exercise = await Exercise.findOne({ where: { id } })
      const exerciceObj = await exercise?.get({ plain: true })
      if (fs.existsSync(path.join(this.filesDir, exerciceObj.filename))) {
        fs.rmSync(path.join(this.filesDir, exerciceObj.filename))
      }
      await Exercise.destroy({ where: { id } })
    } catch (error) {
      console.log(error)
    }
  }

  async update({ id, name }: { id: string; name: string }) {
    try {
      await Exercise.update({ name }, { where: { id } })
    } catch (error) {
      console.log(error)
    }
  }

  async getPdf(id: string) {
    try {
      console.log(id)
      const theory = await Exercise.findOne({ where: { id } })
      if (!theory) return false
      const theoryObj = await theory?.get({ plain: true })
      const pdfPath = path.join(config.filesDir, theoryObj.filename)
      const pdfData = fs.readFileSync(pdfPath)
      const pdfDoc = await PDFDocument.load(pdfData)
      pdfDoc.setTitle(theoryObj.name)
      const modifiedPdfData = await pdfDoc.save()
      return modifiedPdfData
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }
}

export const exerciseService = new ExerciseService()
