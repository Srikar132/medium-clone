import EditorPage from '@/components/EditorPage';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

function WritePageLoading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
      <span className="ml-2">Loading editor...</span>
    </div>
  );
}

export default function WritePage() {
  return (
    <div className="container mx-auto">
      <Suspense fallback={<WritePageLoading />}>
        <EditorPage />
      </Suspense>
    </div>
  );
}

export const metadata = {
  title: 'Write New Post | Medium Clone',
  description: 'Create a new blog post',
};
