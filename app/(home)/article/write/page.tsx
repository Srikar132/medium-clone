import { auth } from '@/auth'
import EditorPage from '@/components/EditorPage'
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {


  return (
    <div className="w-full min-h-screen">
      <EditorPage
      />
    </div>
  )
}

export default page