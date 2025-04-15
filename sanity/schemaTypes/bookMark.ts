import { defineField, defineType } from "sanity"

export const bookMark = defineType({
    title : 'BookMark',
    name : 'bookmark',
    type : "document",
    fields : [
        defineField({
            name : 'author',
            type : 'reference',
            title : "Title",
            to: [{type: "author"}],
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: "post",
            title: "Post",
            type: "reference",
            to: [{type: "post"}],
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: "createdAt",
            title: "Created At",
            type: "datetime",
            initialValue: () => new Date().toISOString()
        })
    ]
})