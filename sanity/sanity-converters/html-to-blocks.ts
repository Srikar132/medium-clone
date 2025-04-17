"use server";
import {JSDOM} from 'jsdom'
import {htmlToBlocks} from '@portabletext/block-tools'

import {Schema} from '@sanity/schema'

// Start with compiling a schema we can work against
const defaultSchema = Schema.compile({
  name: 'myBlog',
  types: [
    {
      type: 'object',
      name: 'blogPost',
      fields: [
        {name: 'content',
        type: 'array',
        title: "Content",
        of: [
            {
                type: 'block',
                styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'H1', value: 'h1' },
                    { title: 'H2', value: 'h2' },
                    { title: 'H3', value: 'h3' },
                    { title: 'Quote', value: 'blockquote' }
                ],
                marks: {
                    decorators: [
                        { title: 'Strong', value: 'strong' },
                        { title: 'Emphasis', value: 'em' },
                        { title: 'Code', value: 'code' },
                        { title: 'Underline', value: 'underline' }
                    ],
                    annotations: [
                        {
                            name: 'link',
                            type: 'object',
                            title: 'Link',
                            fields: [
                                {
                                    name: 'href',
                                    type: 'url',
                                    title: 'URL'
                                }
                            ]
                        }
                    ]
                }
            },
            {
                name: 'image',
                type: 'image',
                title: 'Image',
                options: {
                    hotspot: true
                },
                fields: [
                    {
                        name: 'alt',
                        type: 'string',
                        title: 'Alternative text',
                        description: 'Important for SEO and accessibility'
                    },
                    {
                        name: 'caption',
                        type: 'string',
                        title: 'Caption'
                    }
                ]
            },
            {
                name: 'code',
                title: 'Code Block',
                type: 'object',
                fields: [
                    {
                        name: 'language',
                        title: 'Language',
                        type: 'string',
                        options: {
                            list: [
                                { title: 'JavaScript', value: 'javascript' },
                                { title: 'TypeScript', value: 'typescript' },
                                { title: 'HTML', value: 'html' },
                                { title: 'CSS', value: 'css' },
                                { title: 'Python', value: 'python' },
                                { title: 'JSON', value: 'json' }
                            ]
                        }
                    },
                    {
                        name: 'code',
                        title: 'Code',
                        type: 'text'
                    }
                ]
            }
        ]}
      ],
    },
  ],
})

// The compiled schema type for the content type that holds the block array
const blockContentType = defaultSchema
  .get('blogPost')
  .fields.find((field ) => field.name === 'content').type;



export async function htmlToBlockContent(html: string) {
  let blocks = htmlToBlocks(html, blockContentType , {
    parseHtml: (html) => new JSDOM(html).window.document,
    rules: [
      {
        deserialize(node, next, block) {
          const el = node as HTMLElement
          if (node.nodeName.toLowerCase() === 'figure') {
            const img = el.querySelector('img')
            const imgSrc = img?.getAttribute('src')
            if (!img || !imgSrc) {
              return undefined
            }
            const altText = img?.getAttribute('alt') || ''
            const caption = el.querySelector('figcaption')?.textContent || ''
            
            return block({
              _type: 'image',
              url: imgSrc, // Temporary until we upload it
              alt: altText,
              caption: caption
            })
          }
          return undefined
        },
      },
    ],
  })
  
  // Note: You'd need to implement image processing here
  // Example (pseudocode):
  // for (const block of blocks) {
  //   if (block._type === 'image' && block.url) {
  //     // Upload the image to Sanity
  //     const asset = await uploadImageToSanity(block.url)
  //     // Replace URL with asset reference
  //     block.asset = {_type: 'reference', _ref: asset._id}
  //     delete block.url
  //   }
  // }
  
  return blocks
}