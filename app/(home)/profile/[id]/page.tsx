import { auth } from '@/auth';
import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_ID } from '@/sanity/lib/queries';

const page = async ({params} : {params : Promise<{id : string}>}) => {
  
  const id = (await params)?.id;

  const author = await client.fetch(AUTHOR_BY_ID, {id});



  return (
   <section className='w-full mx-auto max-w-3xl border h-full mt-5'>
    
   </section>
  )
}

export default page