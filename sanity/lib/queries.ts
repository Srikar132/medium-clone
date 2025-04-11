export const AUTHOR_BY_GOOGLE_ID = `
*[_type == "author" && googleId == $id][0] {
    _id,
    googleId,
    name,
    username,
    email,
    image,
    bio,
}
`;

export const ALL_ARTICLES = `
*[_type == "post" && status == "published" ] | order(publishedAt desc) {
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
      user._ref == $userId
    ]) > 0,
    "commentCount": count(*[_type == "comment" && post._ref == ^._id]),
    "likeCount": count(*[_type == "like" && post._ref == ^._id]),
}
`;

export const ARTICLE_BY_ID = `
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
    user._ref == $userId
  ]) > 0,
  "isBookmarked": $userId != null && count(*[
    _type == "bookmark" && 
    post._ref == ^._id && 
    user._ref == $userId
  ]) > 0,
  "commentCount": count(*[_type == "comment" && post._ref == ^._id])
}
`;


export const ARTICLES_BY_AUTHOR_ID = `
*[_type == "post" && status == "published" && author._ref == $authorId ] | order(publishedAt desc) {
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
      user._ref == $userId
    ]) > 0,
    "commentCount": count(*[_type == "comment" && post._ref == ^._id]),
    "likeCount": count(*[_type == "like" && post._ref == ^._id]),
}
`;