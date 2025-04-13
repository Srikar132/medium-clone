"use client";

import Tiptap from "@/components/TipTap";
import {
  createDraftPost,
  fetchCategories,
  fetchPostById,
  publishPostToSanity,
  updatePost,
} from "@/sanity/lib/fetches";
import { urlFor } from "@/sanity/lib/image";
import { Camera, Check } from "lucide-react";
import { Session } from "next-auth";
import { useEffect, useRef, useState } from "react";
import { FaSave } from "react-icons/fa";
import { toast } from "sonner";
import WritePageSkeleton from "./WritePageSkeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { useRouter } from "next/navigation";

interface EditorPageProps {
  initialPostId?: string;
  session: Session;
}

type PublishStatus = "draft" | "published" | "archived";

const EditorPage = ({ initialPostId, session }: EditorPageProps) => {

  const router = useRouter();

  const [postId, setPostId] = useState<string | null>(null);
  const [content, setContent] = useState<SanityContent[]>([]);
  const [title, setTitle] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [excerpt, setExcerpt] = useState<string>("");
  const [featured, setFeatured] = useState<boolean>(false);
  const [publishStatus, setPublishStatus] = useState<PublishStatus>("draft");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout>(null);
  const hasInitialized = useRef<boolean>(false);

  useEffect(() => {
    const getCategories = async () => {
      const cats = await fetchCategories();
      setCategories(cats);
    };

    getCategories();
  }, []);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const setupPost = async () => {
      setIsLoading(true);

      if (initialPostId) {
        try {
          const post = await fetchPostById(initialPostId);

          if (post) {
            setPostId(post?._id);
            setTitle(post.title || "");
            setContent(post.content?.content || []);
            setExcerpt(post.excerpt || "");
            setPublishStatus(post.status || "draft");
            setSelectedCategories(post.categoryIds || []);

            if (post.mainImage?.asset?._ref) {
              const imageUrl = urlFor(post.mainImage).url();
              setCoverImageUrl(imageUrl);
            }

            toast("Recovered Draft Post");
          }
        } catch (error) {
          console.error("Failed to fetch post:", error);
          toast.error("Failed to recover post");
        }
      } else {
        const newPost = await createDraftPost(session);

        setPostId(newPost?._id as string);
        setTitle(newPost?.title as string);
        toast("New post created.");
      }

      setIsLoading(false);
    };

    setupPost();
  }, []);

  useEffect(() => {
    const autoSave = async () => {
      if (postId && (content.length > 0 || title)) {
        try {
          setIsSaving(true);

          await updatePost(postId, title, content);

          setLastSaved(new Date());
        } catch (error) {
          toast.error("Auto save failed");
        } finally {
          setIsSaving(false);
        }
      }
    };

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(autoSave, 3000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [content, title, postId]);

  const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    if (!file) return;

    setCoverImage(file);

    const imageUrl = URL.createObjectURL(file);
    setCoverImageUrl(imageUrl);

    if (postId) {
      try {
        setIsSaving(true);
        // upload to sanity

        // add to post schema
      } catch (error) {
        console.error("Failed to update cover image:", error);
      } finally {
        setIsSaving(false);
      }
    }
  };

    const toggleCategory = (categoryId : never) => {
      setSelectedCategories(prev => 
        prev.includes(categoryId)
          ? prev.filter(id => id !== categoryId)
          : [...prev, categoryId]
      );
    };

  const finalizePublish = async  () => {

    if(!postId || !title) {
      toast.error("Cannot find your post");
      return;
    }

    if(!excerpt.trim()) {
      toast.error('Please add an excerpt before publishing');
      return;
    }

    try {

      setIsSaving(true);
      await publishPostToSanity(postId , title , excerpt  ,selectedCategories);

      setPublishStatus("published");
      setLastSaved(new Date());
      toast("Post published successfullly");

      router.replace(`/article/${postId}`);

    }catch (error) {
      toast.error('Failed to publish post. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return isLoading ? (
    <WritePageSkeleton />
  ) : (
    <div className="w-full  max-w-3xl mx-auto  h-full">
      <div className="relative w-full   flex  items-center">
        {coverImageUrl ? (
          <div className="w-full h-64 relative">
            <img
              src={coverImageUrl}
              alt="Cover"
              className="w-full h-full object-cover rounded-t-lg shadow-sm"
            />
            <button
              onClick={() => fileInputRef?.current?.click()}
              className="absolute bottom-4 right-4 bg-black/70 text-white p-2 rounded-full"
            >
              <Camera size={20} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => fileInputRef?.current?.click()}
            className="flex items-center gap-2  hover:bg-gray-100 px-4 py-1 rounded-full transition-colors duration-200 cursor-pointer tracking-tighter"
          >
            <Camera size={18} /> @add image
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          hidden
          accept="image/*"
          onChange={handleCoverImageUpload}
        />
      </div>
      <div className="p-4  flex items-center justify-between">
        <input
          type="text"
          placeholder="Post Title"
          className="text-2xl font-bold border-none outline-none w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {isSaving ? (
              <div className="flex items-center gap-1 animate-pulse">
                <FaSave className="animate-spin text-lg" />
              </div>
            ) : lastSaved ? (
              `Saved At ${lastSaved?.toLocaleTimeString()}`
            ) : (
              ""
            )}
          </span>
          <Dialog>
            <DialogTrigger asChild>
              <button className="bg-black text-white px-4 py-1 hover:bg-black/80 cursor-pointer transition-colors duration-500">
                publish
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {publishStatus === "published"
                    ? "Update your post"
                    : "Publish your post"}
                </DialogTitle>
                <DialogDescription>
                 After publishing your article will visible to every one.
                </DialogDescription>
              </DialogHeader>
              <div className="bg-white rounded-lg w-full max-w-lg p-6">
            
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Excerpt (required)
                  </label>
                  <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Write a short description of your post"
                    className="w-full border rounded-md p-2"
                    rows={3}
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Categories
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category?._id}
                        onClick={() => toggleCategory(category?._id as never)}
                        className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                          selectedCategories.includes(category?._id as never)
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {category?.title}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="featured" checked={featured} onCheckedChange={setFeatured}/>
                  <Label htmlFor="featured">Featured</Label>
                </div>

                
              </div>
              <DialogFooter className="sm:justify-start">
                <div className="flex w-full justify-end gap-2 mt-6">
                
                  <button
                    disabled={isSaving}
                    onClick={finalizePublish}
                    className="px-4 py-2 bg-black text-white  flex items-center gap-1"
                  >
                    <Check size={16} />{" "}
                    {publishStatus === "published" ? "Update" : "Publish"}
                  </button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="p-4">
        <Tiptap content={content} onChange={setContent} />
      </div>
    </div>
  );
};

export default EditorPage;
