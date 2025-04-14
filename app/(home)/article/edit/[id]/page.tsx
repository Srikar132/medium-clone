import { auth } from '@/auth'
import EditorPage from '@/components/EditorPage'
import { redirect } from 'next/navigation';
import React from 'react'

const page = async ({params} : {params : Promise<{id : string}>}) => {

    try {
        
        const id = (await params)?.id;

        return (
          <div className="w-full min-h-screen">
            <EditorPage
              initialPostId={id}
            />
          </div>
        )
    } catch (error) {
        
    }
}

export default page