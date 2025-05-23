interface SanitySpan {
    _type: 'span';
    _key: string;
    text: string;
    marks: string[];
}

type FollowResponse = {
    FOLLOWED: boolean;
    OK : boolean;
};
  

type LikeResponse = {
    LIKED: boolean;
    OK : boolean;
};

type BookmarkResponse = {
    BOOKMARKED: boolean;
    OK : boolean
};
   
interface SanityImageBlock {
    _type: 'image';
    _key: string;
    alt: string;
    asset: { _ref: string };
}

type FormValues = {
    username: string;
    email: string;
    image: string;
    name: string;
    bio?: string;
    linkedin?: string;
    instagram?: string;
    facebook?: string;
}


type SanityContent = SanityBlock | SanityImageBlock;


type Category = {
    _id : string;
    title : string;
}




 interface CreateCommentData {
    authorId: string;
    postId: string;
    content: string;
    parentCommentId?: string; 
 }





type ShowLoginOptions = {
  title?: string
  description?: string
  onCancel?: () => void
}