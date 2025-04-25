import { type SchemaTypeDefinition } from 'sanity'
import { author } from './author'
import { post } from './post'
import { category } from './category'
import { bookMark } from './bookMark'
import { follow } from './follow'
import { like } from './clap'
import { comment } from './comment'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author,post,category,bookMark,follow,like,comment],
}
