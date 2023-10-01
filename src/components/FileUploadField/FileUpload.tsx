import Dragger from 'antd/es/upload/Dragger'
import React, { useEffect, useState } from 'react'
import { InboxOutlined } from '@ant-design/icons'
import { Upload, UploadFile, message } from 'antd'
import { appApi } from 'src/api/app'

const FileUploadField = ({ onFileChange }: any): JSX.Element => {
  const [fileList, setFileList] = useState<UploadFile[]>([])

  useEffect(() => {
    setFileList([])
  }, [])

  const dummyRequest = async ({ file, onSuccess }: any) => {
    onFileChange(file.name)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      appApi.addPdf({ filename: file.name, file: reader.result }).then((res) => console.log(res))
    }

    reader.onerror = () => {
      message.error(`${reader.error}`)
    }
    setTimeout(() => {
      onSuccess('ok')
    }, 0)
  }

  const draggerOptions = {
    customRequest: dummyRequest,
    multiple: false,
    name: 'file',
    beforeUpload: (file: any) => {
      const isPDF = file.type === 'application/pdf'
      if (!isPDF) {
        message.error(`Файл ${file.name} не PDF формата`)
      }
      return isPDF || Upload.LIST_IGNORE
    },
    onChange: (info: any) => {
      if (info.fileList.length > 0) {
        const newFileList = [...info.fileList].pop()
        setFileList([newFileList])
      }
      const { status } = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        message.success(`${info.file.name} файл успешно добавлен`)
      } else if (status === 'error') {
        message.error(`Произошла ошибка загрузки файла ${info.file.name}.`)
      }
    },
    onRemove: (file: any) => {
      setFileList([])
      onFileChange('')
      appApi.deletePdf(file.name).then((res) => message.success('Файл удалён'))
    },
    onDrop: (e: any) => console.log('Dropped files', e.dataTransfer.files),
  }

  return (
    <Dragger fileList={fileList} style={{ padding: '1rem' }} {...draggerOptions}>
      <p className='ant-upload-drag-icon'>
        <InboxOutlined rev={''} />
      </p>
      <p className='ant-upload-text'>
        Нажмите чтобы выбрать или перетащите внутрь рамки необходимый файл
      </p>
      <p className='ant-upload-hint'>Только формат PDF.</p>
    </Dragger>
  )
}

export default FileUploadField
