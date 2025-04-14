import { defineField, defineType } from "sanity"

export const like = defineType({
    title : 'Like',
    name : 'like',
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
            name: "createdAt",
            title: "Created At",
            type: "datetime",
            initialValue: () => new Date().toISOString()
        }),
        defineField({
            name: "updatedAt",
            title: "Updated At",
            type: "datetime",
            initialValue: () => new Date().toISOString()
        })
    ]
})