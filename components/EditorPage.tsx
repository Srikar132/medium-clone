"use client";

import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import {
  Send,
  Camera,
  X,
  FileImage,
  CalendarClock,
  Tag,
  Loader2,
} from "lucide-react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useActionState } from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { formSchema } from "@/lib/validations";
import { createPost, updatePost } from "@/lib/actions";
import { useFetch } from "@/hooks/useFetch";
import { Category, Post } from "@/sanity/types";
import { fetchCategories, fetchPostById } from "@/sanity/lib/fetches";
import { CustomPost } from "./article/ArticleCard";
import { urlFor } from "@/sanity/lib/image";

const BlogPostForm = ({ postId }: { postId?: string }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [content, setContent] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [status, setStatus] = useState<"draft" | "published" | "archived">(
    "draft"
  );
  const [featured, setFeatured] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const isEditMode = Boolean(postId);

  const {
    data: availableCategories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useFetch<Category[]>(fetchCategories, []);

  // Fetch existing post data if in edit mode
  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;

      setIsLoading(true);
      try {
        const post: CustomPost = await fetchPostById(postId);
        if (post) {
          setTitle(post.title || "");
          setExcerpt(post.excerpt || "");
          setContent(post.content || "");
          setStatus(post.status || "draft");
          setFeatured(post.featured || false);
          setSelectedCategories(post.categories?.map((cat) => cat._id) || []);

          if (post.mainImage) {
            const url = urlFor(post.mainImage).url();
            setExistingImageUrl(url);
            setImagePreview(url);
          }
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        toast.error("Failed to load post data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setExistingImageUrl(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setExistingImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      formData.set("title", title);
      formData.set("excerpt", excerpt);
      formData.set("status", status);
      formData.set("featured", featured ? "on" : "off");

      const formValues = {
        title,
        excerpt,
        status,
        featured,
        content,
        categories: selectedCategories,
      };

      await formSchema.parseAsync(formValues);

      let result;

      if (isEditMode) {
        result = await updatePost(
          prevState,
          postId!,
          formData,
          content,
          imageFile,
          selectedCategories,
          existingImageUrl
        );

        if (result.status === "SUCCESS") {
          toast.success("Your post has been updated successfully");
          router.push(`/article/${result?.slug?.current}`);
        }
      } else {
        result = await createPost(
          prevState,
          formData,
          content,
          imageFile,
          selectedCategories
        );

        if (result.status === "SUCCESS") {
          toast.success("Your post has been created successfully");
          router.push(`/article/${result?.slug?.current}`);
        }
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        toast.error("Please check your inputs and try again");
        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast.error("An unexpected error occurred");
      return {
        ...prevState,
        error: "An unexpected error occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2">Loading post data...</span>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="space-y-6 mt-8 border-t border-dotted w-full max-w-4xl mx-auto px-4 py-6 sm:px-6"
    >
      {/* Header section */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold">
          {isEditMode ? "Edit Post" : "Create New Post"}
        </h1>
        <div className="flex flex-col xs:flex-row w-full sm:w-auto items-start xs:items-center gap-3">
          <div className="flex items-center gap-2">
            <Switch
              id="featured"
              name="featured"
              checked={featured}
              onCheckedChange={setFeatured}
            />
            <label htmlFor="featured" className="text-sm cursor-pointer">
              Featured Post
            </label>
          </div>
          <Select
            name="status"
            value={status}
            onValueChange={(value: "draft" | "published" | "archived") =>
              setStatus(value)
            }
          >
            <SelectTrigger className="w-full xs:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Form fields */}
      <div className="grid grid-cols-1 gap-5">
        {/* Title field */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title
          </label>
          <Input
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={cn(
              "w-full",
              errors.title && "border-red-500 focus-visible:ring-red-500"
            )}
            placeholder="Enter post title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Excerpt field */}
        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium mb-2">
            Excerpt
          </label>
          <Textarea
            id="excerpt"
            name="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className={cn(
              "w-full resize-none",
              errors.excerpt && "border-red-500 focus-visible:ring-red-500"
            )}
            placeholder="Write a short summary of your post"
            rows={3}
          />
          {errors.excerpt && (
            <p className="text-red-500 text-sm mt-1">{errors.excerpt}</p>
          )}
        </div>

        {/* Categories field */}
        <div>
          <label className="block text-sm font-medium mb-2">Categories</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {categoriesLoading ? (
              <div className="flex items-center">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                <span>Loading categories...</span>
              </div>
            ) : (
              availableCategories?.map((category) => (
                <Badge
                  key={category._id}
                  variant={
                    selectedCategories.includes(category._id)
                      ? "default"
                      : "outline"
                  }
                  className={cn(
                    "cursor-pointer transition-all text-xs sm:text-sm",
                    selectedCategories.includes(category._id)
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-secondary"
                  )}
                  onClick={() => handleCategorySelect(category._id)}
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {category.title}
                </Badge>
              ))
            )}
          </div>
          {errors.categories && (
            <p className="text-red-500 text-sm mt-1">{errors.categories}</p>
          )}
        </div>

        {/* Main Image field */}
        <div>
          <label className="block text-sm font-medium mb-2">Main Image</label>
          <div className="border-2 border-dashed rounded-lg p-3 sm:p-4 relative">
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 sm:h-64 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center h-40 sm:h-64 cursor-pointer"
              >
                <FileImage className="w-8 h-8 sm:w-12 sm:h-12 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mt-2 text-center">
                  Click to upload an image
                </p>
                <p className="text-xs text-muted-foreground text-center">
                  PNG, JPG or WebP (max 4MB)
                </p>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/png, image/jpeg, image/webp"
              className="hidden"
            />
          </div>
        </div>

        {/* Content field */}
        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          <div data-color-mode="auto" className="max-w-full">
            <MDEditor
              value={content}
              onChange={(value) => setContent(value || "")}
              preview="edit"
              height={350}
              className="rounded-md overflow-hidden w-full"
              textareaProps={{
                placeholder: "Write your post content here...",
              }}
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">{errors.content}</p>
            )}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col xs:flex-row justify-end gap-3 mt-8">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="w-full xs:w-auto"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="gap-2 w-full xs:w-auto"
        >
          {isPending
            ? isEditMode
              ? "Updating..."
              : "Saving..."
            : isEditMode
              ? "Update Post"
              : "Save Post"}
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};

export default BlogPostForm;
