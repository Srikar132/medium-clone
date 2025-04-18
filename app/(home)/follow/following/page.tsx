import AuthorCard from '@/components/AuthorCard';
import { getFollowing } from '@/sanity/lib/fetches'
import { Author } from '@/sanity/types';
import React from 'react'

const page = async () => {
    const data = await getFollowing();



  return (
    <div className='w-full'>
      <div className="flex flex-col space-y-3 ">
        {data.length === 0 ? (
          <p className='font-thin text-xl'>You are not following anyone</p>
        ) :
        <div className="gir___fit_screen gap-5 w-full">
          {data.map((item: any, i : number) => (
            <AuthorCard isMeFollowing={item.isMeFollowing} key={i} author={item.following as Author}/>
          ))}
        </div>
        }
      </div>
    </div>
  )
}

export default page