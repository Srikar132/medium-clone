"use server";

import { Session } from "next-auth";
import { client } from "./client";
import { writeClient } from "./write-client";
import { SanityAssetDocument } from "next-sanity";
import { 
  ALL_ARTICLES_BY_AUTHOR_ID, 
  ALL_ARTICLES_BY_CATEGORY, 
  ARTICLES_BY_AUTHOR_ID_EXCEPT_CURRENT, 
  ARTICLE_BY_SLUG, 
  ARTICLE_INFORMATION, 
  AUTHOR_BY_ID, 
  BOOKMARKED_ARTICLES_BY_LOGIN_AUTHOR, 
  FEATURED_ARTICLES_BY_AUTHOR, 
  FOLLOWERS_FOR_LOGIN_AUTHOR, 
  FOLLOWING_FOR_LOGIN_AUTHOR, 
  GET_ALL_COMMENTS_FOR_POST, 
  LIKED_ARTICLES_BY_AUTHOR
} from "./queries";
import { auth } from "@/auth";
import { urlFor } from "./image";

/**
 * Interface definitions for better type safety
 */
interface SanityContent {
  _type: string;
  [key: string]: any;
}

interface CreateCommentData {
  authorId: string;
  postId: string;
  content: string;
  parentCommentId?: string;
}

/**
 * Fetch all categories from Sanity
 */
export const fetchCategories = async () => {
  try {
    return await client.fetch(`*[_type == "category"]{_id,title}`);
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
};


export const fetchCategory = async (slug: string) => {
  try {
    if (!slug) {
      throw new Error('Slug is required');
    }

    return await client.fetch(
      `*[_type == "category" && slug.current == $category][0]{_id, title, description, icon}`,
      { category: slug }
    );
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
};


export const fetchAuthor = async () => {
  try {

    const session = await auth();
    if (!session) {
      throw new Error('Authentication required to update a post');
    }

    return await client.withConfig({useCdn : false}).fetch(`
    *[_type == "author" && _id == $id ][0]{
      _id,
      googleId,
      name,
      username,
      email,
      image,
      bio,
      socialLinks {
        linkedin,
        instagram,
        facebook
      },
      memberSince,
    }
    ` , {id : session?.id});

    
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
};

/**
 * Fetch a post by its ID
 */
export const fetchPostById = async (id: string) => {
  if (!id) {
    throw new Error('Post ID is required');
  }

  try {
    return await client.fetch(
      `*[_type == "post" && _id == $postId][0]{
        _id,
        title,
        mainImage,
        content,
        excerpt,
        status,
        categories[] -> {
          _id ,
          title
        }
      }`, 
      { postId: id }
    );
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return null;
  }
};




/**
 * Upload an image to Sanity
 */
export const uploadImageToSanity = async (file: File) => {
  if (!file) {
    throw new Error('File is required');
  }

  try {
    const session = await auth();
    if (!session?.id) {
      throw new Error('Authentication required to upload images');
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP are supported.');
    }

    // Limit file size (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error('File size exceeds the 5MB limit');
    }

    const asset = await writeClient.assets.upload('image', file, { filename: file.name });

    return asset;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

/**
 * Get all draft posts for the specified author
 */
export const getDraftsByAuthor = async (authorId: string) => {
  if (!authorId) {
    throw new Error('Author ID is required');
  }

  try {

    return await client.fetch(
      `*[_type == "post" && author._ref == $id && status == "draft"]{
        _id,
        title,
        updatedAt,
        mainImage,
        
      }`,
      { id: authorId }
    );
  } catch (error) {
    console.error("Error fetching drafts:", error);
    return [];
  }
};
/**
 * Get all archieved posts for the specified author
 */
export const getArchievedByAuthor = async (authorId: string) => {
  if (!authorId) {
    throw new Error('Author ID is required');
  }

  try {

    return await client.fetch(
      `*[_type == "post" && author._ref == $id && status == "archived"]{
        _id,
        title,
        updatedAt,
        mainImage,
      }`,
      { id: authorId }
    );
  } catch (error) {
    console.error("Error fetching drafts:", error);
    return [];
  }
};

/**
 * Get featured posts by an author
 */
export async function getFeaturedPostsByAuthor(authorId: string, limit: number = 10) {
  if (!authorId) {
    throw new Error('Author ID is required');
  }

  try {
    return await client.fetch(FEATURED_ARTICLES_BY_AUTHOR, { 
      authorId, 
      limit: Math.min(limit, 50) // Cap the limit to prevent abuse
    });
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    return [];
  }
}

/**
 * Get detailed article data by ID
 */

export async function getArticleData(slug: string) {
  if (!slug) {
    throw new Error('Article ID is required');
  }

  try {
    const session = await auth();
    const userId = session?.id || null;



    
    return await client.fetch(ARTICLE_BY_SLUG, { slug, userId });
  } catch (error) {
    console.error("Error fetching article:", error);
    
    throw error;
  }
}

/**
 * Get articles by an author except the current article
 */
export async function getArticlesByAuthorIdExceptCurrent(authorId: string, currentPostId: string) {
  if (!authorId || !currentPostId) {
    throw new Error('Author ID and current post ID are required');
  }

  try {
    return await client.fetch(ARTICLES_BY_AUTHOR_ID_EXCEPT_CURRENT, {
      authorId,
      currentPostId
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

/**
 * Get all articles by an author
 */
export async function getAllArticlesByAuthorId(authorId: string) {
  if (!authorId) {
    throw new Error('Author ID is required');
  }

  try {
    return await client.fetch(ALL_ARTICLES_BY_AUTHOR_ID, { authorId });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}



/**
 * Get all articles by category
 */
export async function getAllArticlesByCategory(slug: string ,start : number , end : number) {
  if (!slug) {
    throw new Error('Author ID is required');
  }

  try {
    return await client.fetch(ALL_ARTICLES_BY_CATEGORY, { slug , start , end });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

/**
 * Get comments for a specific post
 */
export async function getCommentsForPost(id: string) {
  if (!id) {
    throw new Error('Post ID is required');
  }

  try {
    // Using withConfig to bypass CDN for fresh comments
    const comments = await client.fetch(GET_ALL_COMMENTS_FOR_POST, { id });

    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}

/**
 * Create a new comment
 */
export async function createComment(data: CreateCommentData) {
  if (!data.authorId || !data.postId || !data.content) {
    throw new Error('Author ID, post ID, and content are required');
  }

  try {

    // Check if post exists
    const postExists = await client.fetch(
      `*[_type == "post" && _id == $postId][0]._id`,
      { postId: data.postId }
    );
    
    if (!postExists) {
      throw new Error('Post not found');
    }

    if (data.parentCommentId) {
      const parentCommentExists = await client.fetch(
        `*[_type == "comment" && _id == $commentId][0]._id`,
        { commentId: data.parentCommentId }
      );
      
      if (!parentCommentExists) {
        throw new Error('Parent comment not found');
      }
    }

    const doc = {
      _type: "comment",
      author: { _type: "reference", _ref: data.authorId },
      post: { _type: "reference", _ref: data.postId },
      content: data.content.trim(),
      publishedAt: new Date().toISOString(),
      ...(data.parentCommentId && {
        parentComment: { _type: "reference", _ref: data.parentCommentId },
      }),
    };

    return await writeClient.create(doc);
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
}

/**
 * Get comprehensive information about an article
 */
export const getArticleInformation = async (id: string) => {
  if (!id) {
    throw new Error('Article ID is required');
  }

  try {
    return await client.fetch(ARTICLE_INFORMATION, { id });
  } catch (error) {
    console.error("Error fetching article information:", error);
    throw error;
  }
}

/**
 * Get followers for the authenticated user
 */
export const getFollowers = async (session : Session | null) => {
  try {
    if (!session?.id) {
      throw new Error("Authentication required to view followers");
    }

    return await client.fetch(FOLLOWERS_FOR_LOGIN_AUTHOR, { id: session.id });
  } catch (error) {
    console.error("Error fetching followers:", error);
    return [];
  }
}

/**
 * Get users that the authenticated user is following
 */
export const getFollowing = async (session : Session | null) => {
  try {
    if (!session?.id) {
      throw new Error("Authentication required to view following");
    }

    return await client.fetch(FOLLOWING_FOR_LOGIN_AUTHOR, { id: session.id });
  } catch (error) {
    console.error("Error fetching following:", error);
    return [];
  }
};


export const getALLlikedArticles = async (session : Session | null) => {
  try {

    if(!session) {
      throw new Error("Unathicated for get followers , ");
    }

    const data = await client.fetch(LIKED_ARTICLES_BY_AUTHOR , {id: session?.id});
    return data;
  } catch (err) {
    console.error("Error in fetching all articles:", err);
    throw err;
  }
};

export const getBookmarkedArticles = async (session : Session | null) => {
  try {

    if(!session) {
      throw new Error("Unathicated for get following , ");
    }

    const data = await client.fetch(BOOKMARKED_ARTICLES_BY_LOGIN_AUTHOR, {id : session.id});

    return data;
  } catch (err) {
    console.error("Error in fetching all bookmarked articles:", err);
    throw err;
  }
};