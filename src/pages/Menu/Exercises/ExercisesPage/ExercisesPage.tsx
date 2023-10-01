import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router-dom'
import { PdfViewer } from 'src/components/PdfViewer/PdfViewer'

function ExercisesPage(): JSX.Element {
  const params = useParams()
  const navigate = useNavigate()

  return (
    <>
      <Button
        className='left-top'
        icon={<IoCloseOutline></IoCloseOutline>}
        onClick={() => navigate('/exercises')}
      ></Button>
      <PdfViewer fileId={params.id}></PdfViewer>
    </>
  )
}

export default ExercisesPage
