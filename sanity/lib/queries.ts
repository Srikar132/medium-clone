import { defineQuery } from "next-sanity";

export const AUTHOR_BY_GOOGLE_ID = defineQuery(`
*[_type == "author" && googleId == $id][0] {
    _id,
    googleId,
    name,
    username,
    email,
    image,
    bio,
}
`);

export const ARTICLE_VIEWS_QUERY = defineQuery(`*[_type == "post" && _id == $id ][0]{
  _id, 
  views
}`);

export const ARTICLE_INFORMATION = defineQuery(`*[_type == "post" && _id == $id][0]{
  _id, 
  views,
  "likesCount": count(*[_type == "like" && post._ref == ^._id]),
  "bookmarkCount": count(*[_type == "bookmark" && post._ref == ^._id]),
  "commentsCount": count(*[_type == "comment" && post._ref == ^._id]),
  publishedAt,
  categories[]->{
    _id,
    title,
    slug
  }
}`);



export const AUTHOR_BY_ID = defineQuery(`
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
  "followerCount": count(*[_type == "follow" && following._ref == $id]),
  "followingCount": count(*[_type == "follow" && follower._ref == $id]),
  "likeCount": count(*[_type == "like" && post._ref in *[_type == "post" && author._ref == $id]._id]),
  "isFollowing": $userId != null && count(*[
    _type == "follow" && 
    follower._ref == $userId && 
    following._ref == ^._id
  ]) > 0
}
`);

export const ALL_ARTICLES = defineQuery(`
*[_type == "post" && status == "published"  ] | order(publishedAt desc) {
    _id,
    title,
    mainImage {
        asset-> {
          _id,
          url
        },
        alt
    },
    author->{
        image,
        name,
        _id
    },
    excerpt,
    publishedAt,
    "isBookmarked": $userId != null && count(*[
      _type == "bookmark" && 
      post._ref == ^._id && 
      author._ref == $userId
    ]) > 0,
    "commentCount": count(*[_type == "comment" && post._ref == ^._id]),
    "likeCount": count(*[_type == "like" && post._ref == ^._id]),
}
`);

export const ARTICLE_BY_ID = defineQuery(`
*[_type == "post" && _id == $id ][0]{
  _id, 
  title, 
  excerpt,
  content, 
  publishedAt, 
  readTime,
  mainImage {
    asset-> {
      _id,
      url
    },
    alt
},
  "author": author->{
    _id, 
    name, 
    username, 
    image, 
    bio,
    "isFollowing": $userId != null && count(*[
      _type == "follow" && 
      follower._ref == $userId && 
      following._ref == ^._id
    ]) > 0
  },
  categories[]->{_id, title, slug},
  "likeCount": count(*[_type == "like" && post._ref == ^._id]),
  "isLiked": $userId != null && count(*[
    _type == "like" && 
    post._ref == ^._id && 
    author._ref == $userId
  ]) > 0,
  "isBookmarked": $userId != null && count(*[
    _type == "bookmark" && 
    post._ref == ^._id && 
    author._ref == $userId
  ]) > 0,
  "commentCount": count(*[_type == "comment" && post._ref == ^._id])
}
`);


export const ARTICLES_BY_AUTHOR_ID_EXCEPT_CURRENT = defineQuery(`
*[_type == "post" && status == "published" && author._ref == $authorId && _id != $currentPostId ] | order(publishedAt desc) {
    _id,
    title,
    mainImage {
        asset-> {
          _id,
          url
        },
        alt
    },
    author->{
        image,
        name,
        _id
    },
    excerpt,
    publishedAt,
    "isBookmarked": $userId != null && count(*[
      _type == "bookmark" && 
      post._ref == ^._id && 
      author._ref == $userId
    ]) > 0,
    "commentCount": count(*[_type == "comment" && post._ref == ^._id]),
    "likeCount": count(*[_type == "like" && post._ref == ^._id]),
}`);

export const ALL_ARTICLES_BY_AUTHOR_ID= defineQuery(`
*[_type == "post" && status == "published" && author._ref == $authorId ] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage {
        asset-> {
          _id,
          url
        },
        alt
    },
    author->{
        image,
        name,
        _id
    },
    excerpt,
    publishedAt,
    "commentCount": count(*[_type == "comment" && post._ref == ^._id]),
    "likeCount": count(*[_type == "like" && post._ref == ^._id]),
}`);

export const FEATURED_ARTICLES_BY_AUTHOR = defineQuery(`*[
  _type == "post" && 
  author._ref == $authorId && 
  featured == true && 
  status == "published"
] | order(publishedAt desc)[0...$limit] {
  _id,
  title,
  mainImage {
    asset->{
      _ref,
      url
    }
  },
  excerpt
}`);


export const FOLLOWERS_FOR_LOGIN_AUTHOR = defineQuery(`
  *[_type == "follow" && following._ref == $id] {
    _id,
    follower-> {
      _id,
      name,
      image,
      bio,
      email,
      socialLink {
        instagram,
        facebook,
        linkedin
      }
    },
    following,
    "isMeFollowing": count(*[
      _type == "follow" && 
      follower._ref == $id && 
      following._ref == ^.follower._ref
    ]) > 0
  }
`)

export const FOLLOWING_FOR_LOGIN_AUTHOR = defineQuery(`
  *[_type == "follow" && follower._ref == $id] {
    _id,
    following-> {
      _id,
      name,
      image,
      bio,
      email,
      socialLink {
        instagram,
        facebook,
        linkedin
      }
    },
    follower,
    "isMeFollowing": true
  }
`)
