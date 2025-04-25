import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem("author").title("Authors"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("post").title("Posts"),
      S.documentTypeListItem("bookmark").title("Bookmarks"),
      S.documentTypeListItem("follow").title("Follow"),
      S.documentTypeListItem("like").title("Likes"),
      S.documentTypeListItem("comment").title("Comments"),
    ])
