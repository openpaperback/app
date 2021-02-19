<script context="module" lang="ts">
  export async function preload() {
    const topBooks = await booksClient.list({});
    return { topBooks };
  }
</script>

<script lang="ts">
  import type { Book } from "../api/routes/books/books.type";
  import { booksClient } from "../api-client/books";
  import BookList from "../components/BookList.svelte";
  import type { Author } from "../api/routes/author/author.type";

  export let topBooks: Book[];

  let topAuthors: Author[];
</script>

<svelte:head>
  <title>Gutenplus | Home</title>
</svelte:head>

<div class="collection">
  <h1 class="serif">Most popular this month</h1>

  <BookList books={topBooks} />
</div>
