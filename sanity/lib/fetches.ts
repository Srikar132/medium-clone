"use server";

import { Session } from "next-auth";
import { client } from "./client"
import { writeClient } from "./write-client";
import { SanityAssetDocument } from "next-sanity";
import { ARTICLES_BY_AUTHOR_ID, ARTICLE_BY_ID, FEATURED_ARTICLES_BY_AUTHOR } from "./queries";


// ALL CATEGORIES 
export const fetchCategories = async () => {
  try {
    const res = await client.fetch(`*[_type == "category"]{_id,title}`);
    return res;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return null;
  }
};

export const fetchPostById = async (id: string) => {
  try {
    const res = await client.fetch(`*[_type == "post" && _id == $postId][0]{
            _id,
            title,
            mainImage,
            content,
            excerpt,
            status,
            "categoryIds": categories[]._ref
          }`, { postId: id });

    return res;
  } catch (error) {
    console.error('Failed to fetch post with id:', error);
    return null;
  }
}

export const createDraftPost = async (session: Session) => {
  if (!session?.id) {
    throw new Error('Unauthorized user to create post');
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
        current: `${tempTitle.toLowerCase().replace(/\s+/g, '-')}`,
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

    const res = await writeClient.create(doc);
    return res;
  } catch (error: any) {
    console.error('Failed to create draft post:', error.message);
    return null;
  }
};


export const updatePost = async (postId: string, title: string, content: SanityContent[]) => {
  try {
    await writeClient
      .patch(postId)
      .set({
        title: title || 'Untitled Post',
        slug: {
          _type: 'slug',
          current: `${title.toLowerCase().replace(/\s+/g, '-')}`,
        },
        content: {
          _type: 'blockContent',
          content: content
        },
        updatedAt: new Date().toISOString()
      })
      .commit();
  } catch (error) {
    console.error('Auto-save failed in updateFunction:', error);
  }
}


export const publishPostToSanity = async (
  postId: string,
  title: string,
  excerpt: string,
  selectedCategories: string[],
  asset?: SanityAssetDocument
) => {
  try {

    const patchData: any = {
      title,
      slug: {
        _type: 'slug',
        current: title.toLowerCase().replace(/\s+/g, '-')
      },
      excerpt,
      categories: selectedCategories.map(id => ({
        _type: 'reference',
        _ref: id
      })),
      status: 'published',
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }


    if (asset) {
      patchData.mainImage = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: asset._id
        }
      }
    }

    await writeClient.patch(postId).set(patchData).commit()

    console.log('Post published successfully!')
  } catch (error) {
    console.error('Failed to publish post:', error)
  }
}


export const uploadImageToSanity = async (file: File) => {
  try {
    const asset = await writeClient.assets.upload('image', file, { filename: file?.name });
    return asset;
  } catch (error) {
    console.error('Error in uploading image to sanity : ', error);
  }
};


export const getDraftsByAuthor = async (authorId: string) => {
  try {
    const data = await client.fetch(`*[_type == "post" && author._ref == $id && status == "draft" ]{
      _id,
      title,
      updatedAt,
    }` , { id: authorId });

    return data;
  } catch (error) {
    console.log("Error in fetching drafts : ", error);
  }
};


export async function getFeaturedPostsByAuthor(
  authorId: string,
  limit: number = 10
) {

  try {
    const posts = await client.fetch(FEATURED_ARTICLES_BY_AUTHOR, { authorId, limit });
    return posts;
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    return [];
  }
}


export async function getArticleData(id: string, userId: string) {
  try {
    
    const post = await client.fetch(ARTICLE_BY_ID, { id, userId });
    return post;
  } catch (error) {
    console.error("Error fetching article by id:", error);
    return null;
  }
}

export async function getArticlesByAuthorId(authorId: string, userId: string) {
  try {
    const postsByAuthor = await client.fetch(ARTICLES_BY_AUTHOR_ID, {
      authorId,
      userId,
    });

    return postsByAuthor;
  } catch (error) {
    console.error("Error in fetching articles by author by id :", error);
    return [];
  }
};

export async function getCommentsForPost (id : string) {
  try {
    const comments = await client.fetch(`
      *[_type == "comment" && post._ref == $id] {
        _id,
        author-> {
          name,
          image,
          _id
        },
        content,
        publishedAt,
        parentComment
      }
    ` , {id});


    console

    return comments;
  } catch (error) {
    console.error("Error in fetching comments  :", error);
    return [];
  }
}