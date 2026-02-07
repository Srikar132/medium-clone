import EditorPage from '@/components/EditorPage';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

interface EditPostPageProps {
  params: {
    postId: string;
  };
}

function EditPageLoading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
      <span className="ml-2">Loading post editor...</span>
    </div>
  );
}

export default function EditPostPage({ params }: EditPostPageProps) {
  return (
    <div className="container mx-auto">
      <Suspense fallback={<EditPageLoading />}>
        <EditorPage postId={params.postId} />
      </Suspense>
    </div>
  );
}

export const metadata = {
  title: 'Edit Post | Medium Clone',
  description: 'Edit your blog post',
};
