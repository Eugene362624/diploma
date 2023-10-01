import { app } from 'electron'
import Theory from './Theory.model'
import * as fs from 'fs'
import * as path from 'path'
import { PDFDocument } from 'pdf-lib'
import { config } from '../api.ipc'

class TheoryService {
  async getAll() {
    const theory = await Theory.findAll({ raw: true })
    // await this.syncWithFilesDirectory()
    return theory
  }

  async create(data: { name: string; filename: string; testId?: string }) {
    const newTheory = await Theory.create(data)
    return await newTheory.save()
  }

  async syncWithFilesDirectory() {
    const filenames = fs.readdirSync(config.filesDir)
    filenames.forEach(async (file) => {
      const newTheory = await this.create({ filename: file, name: file.split('.')[0] })
      await newTheory.save()
    })
  }

  async getPdf(id: string) {
    try {
      const theory = await Theory.findOne({ where: { id } })
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

  async update(data: any) {
    try {
      await Theory.update(data, { where: { id: data.id } })
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  async delete(id: string) {
    try {
      const exercise = await Theory.findOne({ where: { id } })
      const exerciceObj = await exercise?.get({ plain: true })
      // if (fs.existsSync(path.join(this.filesDir, exerciceObj.filename))) {
      //   fs.rmSync(path.join(this.filesDir, exerciceObj.filename))
      // }
      await Theory.destroy({ where: { id } })
    } catch (error) {
      console.log(error)
    }
  }
}

export const theoryService = new TheoryService()
