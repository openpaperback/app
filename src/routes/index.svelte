<script context="module" lang="ts">
  export async function preload() {
    const top = await booksClient.list({});
    return { top };
  }
</script>

<script lang="ts">
  import type { Book } from "../api/routes/books/books.type";
  import { booksClient } from "../api-client/books";
  import BookList from "../components/BookList.svelte";

  export let top: Book[];
</script>

<svelte:head>
  <title>Gutenplus | Home</title>
</svelte:head>

<div class="collection">
  <h1 class="serif">Most popular this month</h1>

  <BookList books={top} />
</div>
