import AuthorCard from '@/components/AuthorCard';
import { getFollowers } from '@/sanity/lib/fetches'
import React from 'react'

const page = async () => {
    const data = await getFollowers();



  return (
    <div className='w-full p-5'>
      <div className="flex flex-col space-y-3 ">
        {data.length === 0 ? (
          <p className='font-thin text-xl'>No follower for you</p>
        ) : data.map((item: any, i : number) => (
          <AuthorCard isMeFollowing={item.isMeFollowing} key={i} author={item.follower}/>
        )) }
      </div>
    </div>
  )
}

export default page