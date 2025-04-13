"use server";

import { Session } from "next-auth";
import { client } from "./client"
import { writeClient } from "./write-client";


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

export const fetchPostById = async (id : string) => {
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


export const updatePost = async (postId : string , title : string , content : SanityContent[]) => {
    try {
        await  writeClient
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


export const publishPostToSanity = async (postId : string , title : string , excerpt : string , selectedCategories : String[] ) => {
  try {
    await writeClient
    .patch(postId)
    .set({
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
    })
    .commit();

  } catch (error) {
     console.error('Failed to publish post:', error);
  }
}