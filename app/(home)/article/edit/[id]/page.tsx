import BlogPostForm from '@/components/EditorPage';

const page = async ({params} : {params : Promise<{id : string}>}) => {

    try {

        const id = (await params)?.id;

        return (
          <div className="w-full min-h-screen">
            <BlogPostForm
              postId={id}
            />
          </div>
        )
    } catch (error) {
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700">Error loading drafts. Please try again later. - error?.message</p>
      </div>
    }
}

export default page
