import { defineField, defineType } from "sanity"

export const author = defineType({
    title : 'Author',
    name : 'author',
    type : "document",
    fields : [
        defineField({
            name : 'googleId',
            type : 'string',
            title : "Google Id",
            validation : (Rule) => Rule.required()
        }),
        defineField({
            name : 'name',
            type : 'string',
            title : "Name",
            validation : (Rule) => Rule.required()
        }),
        defineField({
            name : 'username',
            type : 'string',
            validation : (Rule) => Rule.required()
        }),
        defineField({
            name : 'email',
            type : 'string',
            title : "Email",
            validation : (Rule) => Rule.required().email()
        }),
        defineField({
            name : 'image',
            type : 'url',
            title : "Profile Image"
        }),
        defineField({
            name : 'bio',
            title : "Bio",
            type : 'text'
        }),
        defineField({
            name : "socialLinks",
            title : "Social Links",
            type : "object",
            fields : [
                {name : "linkedin" , title : "Linkedin" , type : "url"},
                {name : "instagram" , title : "Instagram" , type : "url"},
                {name : "facebook" , title : "Facebook" , type : "url"},
            ]
        }),
        defineField({
            name : "memberSince" ,
            title : "Member Since",
            type : "datetime",
            initialValue : () => new Date().toISOString()
        }),
    ],
    preview : {
        select : {
            title : "name"
        }
    }
})