import { defineField, defineType } from "sanity"

export const category = defineType({
    title : 'Category',
    name : 'category',
    type : "document",
    fields : [
        defineField({
            name : 'title',
            title : "Title",
            type : 'string',
            validation : (Rule) => Rule.required()
        }),
        defineField({
            name : "slug",
            title : "Slug",
            type : "slug",
            options : {
                source : "title",
                maxLength : 96,
            },
            validation : (Rule) => Rule.required()
        }),
        defineField({
            name :"description",
            title : "Description",
            type : "text",
        }),
        defineField({
            name :"icon",
            title : "Icon",
            type : "url",
        }),
        defineField({
            name : "featured",
            title : "Featured",
            type : "boolean",
            initialValue : false
        }),
    ]
})