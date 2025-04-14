interface SanitySpan {
    _type: 'span';
    _key: string;
    text: string;
    marks: string[];
}

interface SanityBlock {
    _type: 'block';
    _key: string;
    style: string;
    listItem?: 'bullet' | 'number';
    level?: number;
    markDefs: any[];
    children: SanitySpan[];
}
   
interface SanityImageBlock {
    _type: 'image';
    _key: string;
    alt: string;
    asset: { _ref: string };
}


type SanityContent = SanityBlock | SanityImageBlock;


type Category = {
    _id : string;
    title : string;
}

interface DraftPost {
    _id: string;
    title: string;
    updatedAt: string;
  }


 interface CreateCommentData {
    authorId: string;
    postId: string;
    content: string;
    parentCommentId?: string; 
 }


 interface CommentProps {
    comment: {
      _id: string;
      content: string;
      publishedAt: string;
      parentComment?: string | null;
      author: {
        _id : string;
        name: string;
        image : string
      };
      replies? : CommentProps["comment"][];
    };
  }
  