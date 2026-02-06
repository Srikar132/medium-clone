import { auth } from '@/auth';
import BlogPostForm from '@/components/EditorPage';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await auth();
  if(!session) redirect("/home");

  return (
    <div className="w-full min-h-screen">
      <BlogPostForm/>
    </div>
  )
}

export default page
