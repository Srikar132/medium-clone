import blocksToHtmlLib from '@sanity/block-content-to-html';

export const blocksToHtml = (blocks: any) => {
    return blocksToHtmlLib({
      blocks,
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    });
};