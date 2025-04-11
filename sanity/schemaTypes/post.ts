import { defineField, defineType } from "sanity"

export const post = defineType({
    title : 'Post',
    name : 'post',
    type : "document",
    fields : [
        defineField({
            name : 'title',
            title : "Title",
            type : 'string',
            validation : (Rule) => Rule.required().max(96)
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
            name : "author",
            title : "Author",
            type : "reference",
            to : [{type : "author"}],
            validation : (Rule) => Rule.required()
        }),
        defineField({
            name : "mainImage",
            title : "Main Image",
            type : "image",
            options : {
                hotspot : true
            }
        }),
        defineField({
            name : "categories",
            title : "Categories",
            type : "array",
            of : [{type : "reference" , to : {type : "category"}}]
        }),
        defineField({
            name :"excerpt",
            title : "Excerpt",
            type : "text",
            description : "Short summary of the post",
            validation : (Rule) => Rule.required()
        }),
        defineField({
            name : "content",
            title : "Content",
            type : "blockContent",
            validation : (Rule) => Rule.required()
        }),
        defineField({
            name : "publishedAt",
            title : "Published At",
            type : "datetime",
        }),
        defineField({
            name : "updatedAt",
            title : "Updated At",
            type : "datetime",
        }),
        defineField({
            name : "featured",
            title : "Featured",
            type : "boolean",
            initialValue : false
        }),
        defineField({
            name : "status",
            title : "Post Status",
            type : "string",
            options : {
                list : [
                    {title : "Draft" , value : "draft" },
                    {title : "Published" , value : "published" },
                    {title : "Archived" , value : "archived" },
                ]
            },
            initialValue : "draft"
        })
    ]
})