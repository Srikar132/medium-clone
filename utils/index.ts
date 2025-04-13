import gsap from "gsap";
import blocksToHtmlLib from "@sanity/block-content-to-html";
import { Parser } from 'htmlparser2';

export const highlightFirstmv = "/videos/highlight-first.mp4";
export const highlightSectmv = "/videos/highlight-sec.mp4";
export const highlightThirdmv = "/videos/highlight-third.mp4";
export const highlightFourthmv = "/videos/highlight-fourth.mp4";

export const replayImg = "/replay.svg";
export const playImg = "/play.svg";
export const pauseImg = "/pause.svg";


export const animateGSAP = (target : string , animationProps : any , scrollProps : any) => {
    gsap.to(target , {
        ...animationProps,
        scrollTrigger : {
            trigger : target,
            toggleActions : "restart reverse restart reverse",
            start : "top 85%",
            ...scrollProps
        }
    });
}


export function formatDate(dateInput: string | Date): string {
    const date = new Date(dateInput);
  
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
    const day = date.getDate(); // 1 - 31
    const month = months[date.getMonth()]; // 0 - 11
    const year = date.getFullYear(); // 4-digit year
  
    return `${month} ${day}, ${year}`;
  }
  


export   const blocksToHtml = (blocks: any) => {
    return blocksToHtmlLib({
      blocks,
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    });
  };



  export const htmlToBlocks = (html: string): SanityContent[] => {
    if (!html) return [];
  
    const blocks: SanityContent[] = [];
    let currentListType: 'bullet' | 'number' | null = null;
    let currentListLevel = 1;
  
    const parser = new Parser(
      {
        onopentag(name, attribs) {
          const timeKey = `${Date.now()}-${Math.random()}`;
  
          if (name === 'ul') {
            currentListType = 'bullet';
          } else if (name === 'ol') {
            currentListType = 'number';
          } else if (name === 'li') {
            blocks.push({
              _type: 'block',
              _key: `block-${timeKey}`,
              style: 'normal',
              listItem: currentListType || 'bullet',
              level: currentListLevel,
              markDefs: [],
              children: [
                {
                  _type: 'span',
                  _key: `span-${timeKey}`,
                  text: '',
                  marks: [],
                },
              ],
            });
          } else if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'blockquote'].includes(name)) {
            blocks.push({
              _type: 'block',
              _key: `block-${timeKey}`,
              style: name === 'p' ? 'normal' : name,
              markDefs: [],
              children: [
                {
                  _type: 'span',
                  _key: `span-${timeKey}`,
                  text: '',
                  marks: [],
                },
              ],
            });
          } else if (name === 'img') {
            blocks.push({
              _type: 'image',
              _key: `image-${timeKey}`,
              alt: attribs.alt || '',
              asset: {
                _ref: 'image-asset-ref', // Replace with actual asset logic if needed
              },
            });
          }
        },
  
        ontext(text: string) {
          const lastBlock = blocks[blocks.length - 1];
          if (lastBlock && lastBlock._type === 'block') {
            lastBlock.children[0].text += text;
          }
        },
  
        onclosetag(name) {
          if (name === 'ul' || name === 'ol') {
            currentListType = null;
          }
        },
      },
      { decodeEntities: true }
    );
  
    parser.write(html);
    parser.end();
  
    return blocks;
  };
