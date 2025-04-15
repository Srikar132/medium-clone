import AuthorCard from '@/components/AuthorCard';
import { getFollowers } from '@/sanity/lib/fetches'
import React from 'react'

const page = async () => {
    const data = await getFollowers();



  return (
    <div className='w-full p-5 max-w-3xl mx-auto'>
      <div className="flex flex-col space-y-3 ">
        {data.map((item: any, i : number) => (
          <AuthorCard key={i} author={item.follower}/>
        )) }
      </div>
    </div>
  )
}

export default page