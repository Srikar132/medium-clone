
"use client";

import { Edit, MoreVertical, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { format } from "date-fns";

const DraftCard = ({ post }: { post: DraftPost }) => {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };
  
    const handleEdit = (id: string) => {
      router.push(`/article/edit/${post._id}`);
    };
  
    const handleDelete = (id: string) => {
      console.log(`Deleting draft: ${id}`);
      // Add your delete logic here
    };
  
    return (
      <div className="w-full border border-gray-200 rounded-lg p-4 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold leading-relaxed">{post.title}</h3>
          <div className="relative">
            <button
              onClick={toggleMenu}
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="More options"
            >
              <MoreVertical size={20} />
            </button>
            
            {menuOpen && (
              <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <button
                  onClick={() => handleEdit(post._id)}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-left hover:bg-gray-100"
                >
                  <Edit size={16} />
                  <span>Edit Draft</span>
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
                >
                  <Trash size={16} />
                  <span>Delete Draft</span>
                </button>
              </div>
            )}
          </div>
        </div>
        
        

        <span className="text-sm text-gray-500">
          Last updated {format(new Date(post.updatedAt), "PPP 'at' p")}
        </span>
      </div>
    );
  };

  export default DraftCard