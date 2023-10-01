import { Button } from 'antd'
import React from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router-dom'
import { PdfViewer } from 'src/components/PdfViewer/PdfViewer'

function TheoryPage() {
  const params = useParams()
  const navigate = useNavigate()

  return (
    <>
      <Button className='left-top' icon={<IoCloseOutline />} onClick={() => navigate('/theory')} />
      <PdfViewer fileId={params.id} />
    </>
  )
}

export default TheoryPage
