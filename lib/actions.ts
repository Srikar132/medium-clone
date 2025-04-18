"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";

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
