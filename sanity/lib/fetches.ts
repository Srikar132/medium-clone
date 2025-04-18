"use server";

import { Session } from "next-auth";
import { client } from "./client";
import { writeClient } from "./write-client";
import { SanityAssetDocument } from "next-sanity";
import { 
  ALL_ARTICLES_BY_AUTHOR_ID, 
  ARTICLES_BY_AUTHOR_ID_EXCEPT_CURRENT, 
  ARTICLE_BY_ID, 
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
import { BlockContent } from "../types";
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
        "categoryIds": categories[]._ref
      }`, 
      { postId: id }
    );
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return null;
  }
};

/**
 * Create a draft post for the authenticated user
 */
export const createDraftPost = async (session: Session | null) => {
  if (!session?.id) {
    throw new Error('Authentication required to create a post');
  }

  try {
    const tempTitle = 'Untitled Post';
    const timestamp = new Date().toISOString();
    const uniqueKey = `${timestamp}-${Math.random().toString(36).substring(2, 10)}`;

    const doc = {
      _type: 'post',
      title: tempTitle,
      slug: {
        _type: 'slug',
        current: tempTitle.toLowerCase().replace(/\s+/g, '-'),
      },
      content: {
        _type: 'blockContent',
        content: [
          {
            _type: 'block',
            style: 'normal',
            _key: `block-${uniqueKey}`,
            markDefs: [],
            children: [
              {
                _type: 'span',
                _key: `span-${uniqueKey}`,
                text: '',
                marks: [],
              },
            ],
          },
        ],
      },
      author: {
        _type: 'reference',
        _ref: session.id,
      },
      status: 'draft',
      publishedAt: timestamp,
    };

    return await writeClient.create(doc);
  } catch (error) {
    console.error('Failed to create draft post:', error);
    return null;
  }
};

/**
 * Update a post's content and title
 */
export const updatePost = async (postId: string, title: string, content: BlockContent["content"]) => {
  if (!postId) {
    throw new Error('Post ID is required');
  }

  try {
    const session = await auth();
    if (!session?.id) {
      throw new Error('Authentication required to update a post');
    }
    
    // Verify ownership before updating
    const post = await client.fetch(
      `*[_type == "post" && _id == $postId && author._ref == $authorId][0]._id`, 
      { postId, authorId: session.id }
    );
    
    if (!post) {
      throw new Error('Unauthorized: You can only update your own posts');
    }

    await writeClient
      .patch(postId)
      .set({
        title: title || 'Untitled Post',
        slug: {
          _type: 'slug',
          current: `${(title || 'Untitled Post').toLowerCase().replace(/\s+/g, '-')}`,
        },
        content: {
          _type: 'blockContent',
          content
        },
        updatedAt: new Date().toISOString()
      })
      .commit();
    
    return { success: true };
  } catch (error) {
    console.error('Post update failed:', error);
    throw error;
  }
};

/**
 * Publish a post with all required data
 */
export const publishPostToSanity = async (
  postId: string,
  title: string,
  excerpt: string,
  selectedCategories: string[],
  asset?: SanityAssetDocument
) => {
  if (!postId || !title) {
    throw new Error('Post ID and title are required');
  }

  try {
    const session = await auth();
    if (!session?.id) {
      throw new Error('Authentication required to publish a post');
    }
    
    const post = await client.fetch(
      `*[_type == "post" && _id == $postId && author._ref == $authorId][0]._id`, 
      { postId, authorId: session.id }
    );
    
    if (!post) {
      throw new Error('Unauthorized: You can only publish your own posts');
    }

    const sanitizedTitle = title.trim();
    const slugText = sanitizedTitle.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');

    const patchData : any = {
      title: sanitizedTitle,
      slug: {
        _type: 'slug',
        current: slugText
      },
      excerpt: excerpt.trim(),
      categories: selectedCategories.map(id => ({
        _type: 'reference',
        _ref: id
      })),
      status: 'published',
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (asset) {
      patchData.mainImage = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: asset._id
        }
      };
    }

    await writeClient.patch(postId).set(patchData).commit();
    return { success: true };
  } catch (error) {
    console.error('Failed to publish post:', error);
    throw error;
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

    return urlFor(asset).url();
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
    const session = await auth();
    if (!session?.id || session.id !== authorId) {
      throw new Error('You can only view your own drafts');
    }

    return await client.fetch(
      `*[_type == "post" && author._ref == $id && status == "draft"]{
        _id,
        title,
        updatedAt,
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
export async function getArticleData(id: string) {
  if (!id) {
    throw new Error('Article ID is required');
  }

  try {
    const session = await auth();
    const userId = session?.id || null;



    
    return await client.fetch(ARTICLE_BY_ID, { id, userId });
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
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
    const session = await auth();
    if (!session?.id || session.id !== data.authorId) {
      throw new Error('You can only create comments as yourself');
    }

    // Check if post exists
    const postExists = await client.fetch(
      `*[_type == "post" && _id == $postId][0]._id`,
      { postId: data.postId }
    );
    
    if (!postExists) {
      throw new Error('Post not found');
    }

    // Validate parent comment if provided
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
export const getFollowers = async () => {
  try {
    const session = await auth();
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
export const getFollowing = async () => {
  try {
    const session = await auth();
    if (!session?.id) {
      throw new Error("Authentication required to view following");
    }

    return await client.fetch(FOLLOWING_FOR_LOGIN_AUTHOR, { id: session.id });
  } catch (error) {
    console.error("Error fetching following:", error);
    return [];
  }
};


export const getALLlikedArticles = async () => {
  try {

    const session = await auth();

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

export const getBookmarkedArticles = async () => {
  try {
    const session = await auth();

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