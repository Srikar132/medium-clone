"use server";

import { auth, signIn } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { uploadImageToSanity } from "@/sanity/lib/fetches";
import { writeClient } from "@/sanity/lib/write-client";
import slugify from "slugify";
import { createComment } from "@/sanity/lib/fetches";
import { revalidatePath } from "next/cache";

export const updateProfile = async (
  state: any,formValues : FormValues
) => {
  const session = await auth();

  if (!session) {
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  }

  const {
    username,
    email,
    image,
    name,
    bio ,
    linkedin ,
    instagram ,
    facebook ,
  } = formValues;

  try {
    const doc = {
      username,
      email,
      image,
      name,
      bio,
      socialLinks: {
        linkedin,
        instagram,
        facebook,
      },
    };

    await writeClient
      .patch(session.id) 
      .set(doc)
      .commit();

    return parseServerActionResponse({
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.error("Sanity update error:", error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};




export async function toggleLike(postId: string, userId: string): Promise<LikeResponse> {
  return client
    .fetch<any>(
      `*[_type == "like" && author._ref == $userId && post._ref == $postId][0]`,
      { postId, userId }
    )
    .then((existingLike) => {
      if (existingLike) {
        return writeClient.delete(existingLike._id).then(() => {
          return parseServerActionResponse({ LIKED: false  , OK : true});
        });
      } else {
        return writeClient
          .create({
            _type: 'like',
            author: { _type: 'reference', _ref: userId },
            post: { _type: 'reference', _ref: postId },
            createdAt: new Date().toISOString(),
          })
          .then(() => {
            return parseServerActionResponse({ LIKED: true , OK : true});
          });
      }
    })
    .catch((error) => {
      console.error('Error in handleLike:', error);
      throw new Error('Failed to process like/unlike operation');
    });
};


export async  function toggleBookmark(postId: string, userId: string): Promise<BookmarkResponse> {
  return client
    .fetch<any>(
      `*[_type == "bookmark" && author._ref == $userId && post._ref == $postId][0]`,
      { userId, postId }
    )
    .then((existingBookmark) => {
      if (existingBookmark) {
        return writeClient.delete(existingBookmark._id).then(() => {
          return parseServerActionResponse({BOOKMARKED : false , OK  :true });
        });
      } else {
        return writeClient
          .create({
            _type: "bookmark",
            author: { _type: "reference", _ref: userId },
            post: { _type: "reference", _ref: postId },
            createdAt: new Date().toISOString(),
          })
          .then(() => {
            return parseServerActionResponse({BOOKMARKED : true , OK  :true })
          });
      }
    })
    .catch((error) => {
      console.error("Error in handleBookmark:", error);
      throw new Error("Failed to handle bookmark");
    });
}



export async function toggleFollow(userId: string, authorId: string): Promise<FollowResponse> {
  if (!userId || !authorId) {
    throw new Error("Unauthorized");
  }

  if (userId === authorId) {
    throw new Error("You cannot follow yourself");
  }

  const existingFollow = await client.fetch<any>(
    `*[_type == "follow" && follower._ref == $userId && following._ref == $authorId][0]`,
    { userId, authorId }
  );

  if (existingFollow) {
    await writeClient.delete(existingFollow._id);
    return parseServerActionResponse({ FOLLOWED: false , OK :true});
  } else {
    await writeClient.create({
      _type: "follow",
      follower: { _type: "reference", _ref: userId },
      following: { _type: "reference", _ref: authorId },
      createdAt: new Date().toISOString(),
    });

    return parseServerActionResponse({ FOLLOWED: true , OK : true });
  }
}



export const createPost = async (
  state: any,
  form: FormData,
  content: string,
  imageFile: File | null,
  selectedCategories: string[]
) => {
  try {
    const session = await auth();
    
    if (!session)
      return {
        error: "Not signed in",
        status: "ERROR",
      };

    const formEntries = Object.fromEntries(
      Array.from(form).filter(([key]) => key !== "content")
    );
    
    const { title, excerpt, status, featured } = formEntries;
    const slug = slugify(title as string, { lower: true, strict: true });
    
    // Create new post object
    const post : any= {
      title,
      excerpt,
      content,
      status,
      featured: featured === "on",
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      categories: selectedCategories.map(id => ({
        _type: "reference",
        _ref: id
      })),
      publishedAt: status === "published" ? new Date().toISOString() : null,
      updatedAt: new Date().toISOString(),
    };
    
    if (imageFile) {
      const imageAsset = await uploadImageToSanity(imageFile);
      post.mainImage = {
        _type: 'image',
        asset: {
          _type: "reference",
          _ref: imageAsset._id
        }
      };
    }
    

    const result = await writeClient.create({ _type: "post", ...post });
    
    return {
      ...result,
      error: "",
      status: "SUCCESS",
    };
  } catch (error) {
    console.error(error);
    
    return {
      error: JSON.stringify(error),
      status: "ERROR",
      slug : {current : ""}
    };
  }
};

export const updatePost = async (
  state: any,
  postId: string,
  form: FormData,
  content: string,
  imageFile: File | null,
  selectedCategories: string[],
  existingImageUrl: string | null
) => {
  try {
    const session = await auth();
    
    if (!session)
      return {
        error: "Not signed in",
        status: "ERROR",
        slug : {current : ""}
      };

    const formEntries = Object.fromEntries(
      Array.from(form).filter(([key]) => key !== "content")
    );
    
    const { title, excerpt, status, featured } = formEntries;
    const slug = slugify(title as string, { lower: true, strict: true });
    
    const updateData: any = {
      title,
      excerpt,
      content,
      status,
      featured: featured === "on",
      slug: {
        _type: "slug",
        current: slug,
      },
      categories: selectedCategories.map(id => ({
        _type: "reference",
        _ref: id
      })),
      updatedAt: new Date().toISOString(),
    };
    
    if (status === "published") {
      const currentPost = await writeClient.fetch(`*[_type == "post" && _id == $postId][0]{publishedAt}`, { postId });
      
      if (!currentPost.publishedAt) {
        updateData.publishedAt = new Date().toISOString();
      }
    }
    
    if (imageFile) {
      const imageAsset = await uploadImageToSanity(imageFile);
      updateData.mainImage = {
        _type: 'image',
        asset: {
          _type: "reference",
          _ref: imageAsset._id
        }
      };
    } else if (existingImageUrl === null) {
      updateData.mainImage = null;
    }

    const result = await writeClient
      .patch(postId)
      .set(updateData)
      .commit();
    
    return {
      ...result,
      error: "",
      status: "SUCCESS",
    };
  } catch (error) {
    console.error("Error updating post:", error);
    
    return {
      error: JSON.stringify(error),
      status: "ERROR",
      _slug : {
        current : ""
      }
    };
  }
};




export async function addComment(formData: FormData) {
  const postId = formData.get('postId') as string;
  const authorId = formData.get('authorId') as string;
  const content = formData.get('content') as string;
  const parentCommentId = formData.get('parentCommentId') as string || undefined;
  
  if (!postId || !authorId || !content) {
    return { 
      success: false, 
      message: "Missing required fields" 
    };
  }

  try {
    await createComment({
      postId,
      authorId,
      content,
      parentCommentId: parentCommentId || undefined
    });
    
    // Revalidate the path to refresh the comments
    revalidatePath(`/posts/${postId}`);
    
    return { 
      success: true, 
      message: parentCommentId ? "Reply added successfully" : "Comment added successfully" 
    };
  } catch (error) {
    console.error("Error adding comment:", error);
    return { 
      success: false, 
      message: "Failed to add comment. Please try again." 
    };
  }
}