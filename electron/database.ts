/* eslint-disable @typescript-eslint/no-var-requires */
import { app } from 'electron'
import * as fs from 'fs'
import * as path from 'path'
import { Sequelize } from 'sequelize'
import { EncryptAES } from './utils/encrypt'
import { DecryptAES } from './utils/decrypt'
import { IAnswer, IQuestion, ITest } from './interfaces'

class DatabaseModule {
  connection!: Sequelize
  dataPath: string
  encryptKey = ''
  constructor() {
    this.connection = new Sequelize('database', '', '', {
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
    })
    // if app in production mode use provided by electron path
    if (app.isPackaged) {
      this.dataPath = path.join(process.resourcesPath, 'data')
    } else {
      this.dataPath = path.join(app.getAppPath(), 'resources', 'data')
    }
  }
  private async defineAssociations() {
    const { Question, Answer, Test, Theory } = this.connection.models

    Answer.belongsTo(Question, { foreignKey: 'questionId', as: 'question' })

    Question.hasMany(Answer, { foreignKey: 'questionId', as: 'answers', onDelete: 'CASCADE' })
    Question.belongsTo(Test, { foreignKey: 'testId', as: 'test' })

    Theory.belongsTo(Test, { foreignKey: 'testId', as: 'test' })

    Test.hasMany(Theory, { foreignKey: 'testId', as: 'theory', onDelete: 'CASCADE' })
    Test.hasMany(Question, { foreignKey: 'testId', as: 'questions', onDelete: 'CASCADE' })
    console.log('Associations successfully set')
  }
  // to decrypt data files and to duplicate data into database
  private async decrypt() {
    for (const modelName in this.connection.models) {
      const isFileExist = fs.existsSync(path.join(this.dataPath, `${modelName}.enc`))
      // check if file exists
      if (isFileExist) {
        try {
          // encrypted file content
          const encryptedContent = fs
            .readFileSync(path.join(this.dataPath, `${modelName}.enc`))
            .toString()
          // decrypted file content
          const dbFileContent = DecryptAES(encryptedContent, this.encryptKey)
          // converted decrypted file content into array
          const dbFileContentArray: Array<ITest | IQuestion | IAnswer> = JSON.parse(dbFileContent)

          // Create an array to store promises
          const createPromises = dbFileContentArray.map(async (element) => {
            await this.connection.models[modelName].create({ ...element })
          })

          // Wait for all promises to resolve
          await Promise.all(createPromises)
        } catch (error) {
          console.error('An error occurred:', error)
        }
      } else {
        console.log('An error occurred:', 'CANT READ FILE')
      }
    }
  }
  // to encrypt data from database into files
  public async encrypt() {
    for (const modelName in this.connection.models) {
      try {
        // to get all data from current model
        const dataToEncrypt = JSON.stringify(await this.connection.models[modelName].findAll())
        // to rewrite file with actual data
        fs.writeFileSync(
          path.join(this.dataPath, `${modelName}.enc`),
          EncryptAES(dataToEncrypt, this.encryptKey),
        )
      } catch (error) {
        console.error('An error occurred:', error)
      }
    }
  }
  // to initialize database
  public async init() {
    try {
      // to difine all imported models at the bottom of the file
      await this.connection.sync()
      for (const modelName in this.connection.models) {
        // file path for current model
        const filePath = path.join(this.dataPath, `${modelName}.enc`)
        // if file deleted or not exist by any reason, create new with encription
        // using encryption to prevent last block length error
        if (!fs.existsSync(filePath)) {
          try {
            fs.writeFileSync(filePath, EncryptAES('', this.encryptKey))
          } catch (error) {
            console.error('An error occurred:', error)
          }
        }
      }
      // to start working with data from files in database
      await this.decrypt()
      await this.defineAssociations()
      console.log('Database initilized')
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }
}

export const Database = new DatabaseModule()
