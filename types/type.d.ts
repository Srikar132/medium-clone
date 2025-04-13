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