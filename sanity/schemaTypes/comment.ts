import { defineField, defineType } from "sanity"

export const comment = defineType({
    title : 'Comment',
    name : 'comment',
    type : "document",
    fields : [
        defineField({
            name : 'author',
            type : 'reference',
            title : "Author",
            to: [{type: "author"}],
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name : 'post',
            type : 'reference',
            title : "Post",
            to: [{type: "post"}],
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: "content",
            title: "Content",
            type: "text",
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: "publishedAt",
            title: "Published At",
            type: "datetime",
            initialValue: () => new Date().toISOString()
        }),
        defineField({
            name: "parentComment",
            title: "Parent Comment",
            type: "reference",
            to: [{type: "comment"}],
            description: "If this is a reply to another comment"
        }),
    ]
})