import Ping from './Ping'
import { client } from '@/sanity/lib/client'
import { ARTICLE_VIEWS_QUERY } from '@/sanity/lib/queries'
import { writeClient } from '@/sanity/lib/write-client';
import { after } from 'next/server';
import { Skeleton } from './ui/skeleton';

const View = async ({id} : {id : string}) => {

    try {
        const data = await client.withConfig({useCdn : false}).fetch(ARTICLE_VIEWS_QUERY,{id});

        after(async () => {
            await writeClient
            .patch(id)
            .set({views : data?.views + 1})
            .commit()
        });

    return (
        <div className='flex justify-end items-center mt-5 fixed bottom-3 right-3'>
            <div className="absolute -top-2 -right-2">
                <Ping className="absolute -left-4 top-1"/>
            </div>

            <p className='font-medium text-[16px] bg-pink-500 px-4 py-2 rounded-lg capitalize'>
                <span className='font-black text-white'>
                    {data?.views} views
                </span>
            </p>
        </div>)
        
    } catch (error) {
        <Skeleton className='w-full h-full'/>
    }
}

export default View