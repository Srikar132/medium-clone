import { defineField, defineType } from "sanity"

export const like = defineType({
    title : 'Like',
    name : 'like',
    type : "document",
    fields : [
        defineField({
            name : 'user',
            type : 'reference',
            title : "User",
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