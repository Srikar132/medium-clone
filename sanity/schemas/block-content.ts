import { ArrayDefinition } from "sanity";

export const blockContent = {
    name: 'content',
    type: 'array' as const, 
    title: 'Content',
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
            title: 'Alternative text'
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
    ]
  } as ArrayDefinition
   // ✅ Type assertion to satisfy PortableTextEditor
  