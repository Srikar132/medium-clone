import { Upload } from 'lucide-react'
import React from 'react'


const ShareButton = () => {
  return (
    <div className='rounded-full p-1 border hover:bg-gray-100 cursor-pointer'>
      <Upload className="w-4 h-4 text-black font-thin" />
    </div>
  )
}

export default ShareButton;