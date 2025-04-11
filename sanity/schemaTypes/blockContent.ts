import { defineField, defineType } from "sanity"

export const blockContent = defineType({
    title : 'Content',
    name : 'blockContent',
    type : "object",
    fields : [
        defineField({
            name : 'content',
            type : 'array',
            title : "Content",
            of : [{type : "block"} , {type : "image"}]
        }),
    ]
})