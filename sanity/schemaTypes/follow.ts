import { defineField, defineType } from "sanity"

export const follow = defineType({
    title : 'Follow',
    name : 'follow',
    type : "document",
    fields : [
        defineField({
            name : 'follower',
            type : 'reference',
            title : "Follower",
            to: [{type: "author"}],
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name : 'following',
            type : 'reference',
            title : "Following",
            to: [{type: "author"}],
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