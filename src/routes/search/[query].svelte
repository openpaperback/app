<script context="module" lang="ts">
  export async function preload({ params }) {
    let search = params.query;
    const books = await booksClient.list({ search, limit: 18 });

    return { books };
  }
</script>

<script lang="ts">
  import { booksClient } from "../../api-client/books";
  import type { Book } from "../../api/routes/books/books.type";
  import BookList from "../../components/BookList.svelte";

  export let books: Book[];
</script>

<div class="collection">
  <h1 class="serif">Search results</h1>

  <BookList previewLimit={1000} {books} />
</div>
