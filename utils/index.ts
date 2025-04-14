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
    const listStack: { type: 'bullet' | 'number', level: number }[] = [];
    let currentTextStyles: string[] = [];
    let currentBlock: SanityBlock | null = null;
    
    // Track open tags to handle nested tags
    const openTags: string[] = [];
    
    // Generate a unique key
    const generateKey = () => `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Helper to create a new block
    const createBlock = (style: string, listItem?: 'bullet' | 'number', level?: number): SanityBlock => {
      return {
        _type: 'block',
        _key: `block-${generateKey()}`,
        style,
        markDefs: [],
        children: [],
        ...(listItem && { listItem }),
        ...(level !== undefined && { level }),
      };
    };
    
    // Helper to add text to current block
    const addTextToCurrentBlock = (text: string, marks: string[] = []) => {
      if (!currentBlock) {
        currentBlock = createBlock('normal');
        blocks.push(currentBlock);
      }
      
      // If the last child is a span with the same marks, append text to it
      const lastChild = currentBlock.children[currentBlock.children.length - 1];
      if (lastChild && 
          lastChild._type === 'span' && 
          JSON.stringify(lastChild.marks) === JSON.stringify(marks)) {
        lastChild.text += text;
      } else {
        // Otherwise create a new span
        currentBlock.children.push({
          _type: 'span',
          _key: `span-${generateKey()}`,
          text,
          marks: [...marks],
        });
      }
    };
  
    const parser = new Parser(
      {
        onopentag(name, attribs) {
          openTags.push(name);
          
          // Handle block-level elements
          if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'blockquote'].includes(name)) {
            currentBlock = createBlock(name === 'p' ? 'normal' : name);
            blocks.push(currentBlock);
          } 
          // Handle lists
          else if (name === 'ul' || name === 'ol') {
            const listType = name === 'ul' ? 'bullet' : 'number';
            const level = listStack.length + 1;
            listStack.push({ type: listType, level });
          } 
          // Handle list items
          else if (name === 'li') {
            if (listStack.length > 0) {
              const { type, level } = listStack[listStack.length - 1];
              currentBlock = createBlock('normal', type, level);
              blocks.push(currentBlock);
            } else {
              // Fallback if <li> is somehow outside a list
              currentBlock = createBlock('normal', 'bullet', 1);
              blocks.push(currentBlock);
            }
          } 
          // Handle images
          else if (name === 'img') {
            blocks.push({
              _type: 'image',
              _key: `image-${generateKey()}`,
              alt: attribs.alt || '',
              asset: {
                _ref: attribs.src || 'image-asset-ref', // This should be replaced with the actual asset reference
              },
            });
            currentBlock = null;
          } 
          // Handle text styling
          else if (name === 'strong' || name === 'b') {
            currentTextStyles.push('strong');
          } 
          else if (name === 'em' || name === 'i') {
            currentTextStyles.push('em');
          } 
          else if (name === 'u') {
            currentTextStyles.push('underline');
          } 
          else if (name === 'strike' || name === 's') {
            currentTextStyles.push('strike-through');
          } 
          else if (name === 'code') {
            currentTextStyles.push('code');
          } 
          else if (name === 'a') {
            // For links, we would normally add a mark definition and reference it
            // This is a simplified approach
            currentTextStyles.push('link');
            // In a complete solution, you would add the link to markDefs
          }
          // Handle div as paragraph if needed
          else if (name === 'div' && !currentBlock) {
            currentBlock = createBlock('normal');
            blocks.push(currentBlock);
          }
          // You can add more tag handlers as needed
        },
  
        ontext(text) {
          // Preserve whitespace in text
          if (text.trim() || openTags[openTags.length - 1] === 'pre') {
            addTextToCurrentBlock(text, [...currentTextStyles]);
          } else if (text.includes(' ') && currentBlock) {
            // Handle spaces explicitly
            addTextToCurrentBlock(text, [...currentTextStyles]);
          }
        },
  
        onclosetag(name) {
          openTags.pop();
          
          // Handle end of block elements
          if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'blockquote', 'div', 'li'].includes(name)) {
            currentBlock = null;
          } 
          // Handle end of lists
          else if (name === 'ul' || name === 'ol') {
            listStack.pop();
          } 
          // Remove text styling
          else if (name === 'strong' || name === 'b') {
            currentTextStyles = currentTextStyles.filter(style => style !== 'strong');
          } 
          else if (name === 'em' || name === 'i') {
            currentTextStyles = currentTextStyles.filter(style => style !== 'em');
          } 
          else if (name === 'u') {
            currentTextStyles = currentTextStyles.filter(style => style !== 'underline');
          } 
          else if (name === 'strike' || name === 's') {
            currentTextStyles = currentTextStyles.filter(style => style !== 'strike-through');
          } 
          else if (name === 'code') {
            currentTextStyles = currentTextStyles.filter(style => style !== 'code');
          } 
          else if (name === 'a') {
            currentTextStyles = currentTextStyles.filter(style => style !== 'link');
          }
        },
      },
      { decodeEntities: true }
    );
  
    parser.write(html);
    parser.end();
  
    // Filter out empty blocks
    return blocks.filter(block => {
      if (block._type === 'block') {
        // Keep block if it has content or is a specific type that should be kept empty
        return block.children.length > 0 && 
            block.children.some(child => child.text.trim().length > 0);
      }
      return true; // Keep non-block elements like images
    });
  };