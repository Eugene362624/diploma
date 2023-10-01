import React, { useEffect, useState } from 'react'
import './PdfViewer.scss'
import { theoryApi } from 'src/api/theory'
import { Spin } from 'antd'
import { exerciseApi } from 'src/api/exercise'

interface Props {
  fileId: string
}

export const PdfViewer = ({ fileId }: Props) => {
  const [pdf, setPdf] = useState(null)
  const [loading, setLoading] = useState<boolean>(false)

  async function fetchPdf() {
    setLoading(true)
    let pdfBytes
    pdfBytes = await theoryApi.getPdf({ id: fileId })
    if (!pdfBytes) {
      pdfBytes = await exerciseApi.getPdf({ id: fileId })
    }
    const bytes = new Uint8Array(pdfBytes)
    const blob = new Blob([bytes], { type: 'application/pdf' })
    const docUrl = URL.createObjectURL(blob)
    setPdf(docUrl)
    setLoading(false)
  }

  useEffect(() => {
    if (pdf && pdf.length > 0) {
      setTimeout(() => setLoading(false), 500)
    }
  }, [pdf])

  useEffect(() => {
    fetchPdf()
    // setLoading(false)
  }, [])

  return (
    <>
      <div style={{ zIndex: loading ? '2' : '1' }} className='pdf-loading'>
        <Spin />
      </div>
      <iframe className='pdf-frame' src={pdf} />
    </>
  )
}
