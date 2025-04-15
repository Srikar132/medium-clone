import AuthorCard from '@/components/AuthorCard';
import { getFollowing } from '@/sanity/lib/fetches'
import React from 'react'

const page = async () => {
    const data = await getFollowing();



  return (
    <div className='w-full p-5 max-w-3xl mx-auto'>
      <div className="flex flex-col space-y-3 ">
        {data.map((item: any, i : number) => (
          <AuthorCard key={i} author={item.following}/>
        )) }
      </div>
    </div>
  )
}

export default page