'use client';

import { Edit, MoreVertical, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const DraftCard = ({ post }: { post: DraftPost }) => {
  const router = useRouter();

  const handleEdit = (id: string) => {
    router.push(`/article/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    console.log(`Deleting draft: ${id}`);
    // Add your delete logic here
  };

  return (
    <div className="w-full max-w-md border border-gray-200 rounded-lg p-4 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold leading-relaxed">{post.title}</h3>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="More options"
            >
              <MoreVertical size={20} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem
              onClick={() => handleEdit(post._id)}
              className="flex items-center gap-2"
            >
              <Edit size={16} />
              Edit Draft
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(post._id)}
              className="flex items-center gap-2 text-red-600 focus:text-red-600"
            >
              <Trash size={16} />
              Delete Draft
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <span className="text-sm text-gray-500">
        Last updated {format(new Date(post.updatedAt), "PPP 'at' p")}
      </span>
    </div>
  );
};

export default DraftCard;
