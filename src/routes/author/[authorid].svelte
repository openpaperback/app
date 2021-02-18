<script context="module" lang="ts">
  export async function preload({ params }) {
    let authorId = params.authorid;
    const books = await booksClient.listByAuthor(authorId);
    const author = await authorsClient.get(authorId);
    return { books, author };
  }
</script>

<script lang="ts">
  import { authorsClient } from "../../api-client/authors";
  import { booksClient } from "../../api-client/books";
  import type { Author } from "../../api/routes/author/author.type";
  import type { Book } from "../../api/routes/books/books.type";
  import BookList from "../../components/BookList.svelte";

  export let books: Book[];
  export let author: Author;
</script>

<div class="collection">
  <h1 class="serif">{author.name}</h1>
  <p>{@html author.wiki.extract}</p>
  <p>
    <a target="_blank" href={author.wiki.url}>Read more on Wikipedia</a>
  </p>
  <BookList {books} />
</div>
