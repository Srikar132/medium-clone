import AuthorCard from '@/components/AuthorCard';
import { getFollowing } from '@/sanity/lib/fetches'
import React from 'react'

const page = async () => {
    const data = await getFollowing();



  return (
    <div className='w-full p-5'>
      <div className="flex flex-col space-y-3 ">
        {data.length === 0 ? (
          <p className='font-thin text-xl'>You are not following anyone</p>
        ) :data.map((item: any, i : number) => (
          <AuthorCard isMeFollowing={item.isMeFollowing} key={i} author={item.following}/>
        ))}
      </div>
    </div>
  )
}

export default page