<script context="module" lang="ts">
  export async function preload({ params }) {
    let bookid = params.bookid;

    const [text, book] = await Promise.all([booksClient.getText(bookid), booksClient.get(bookid)]);
    return { text, book, bookid };
  }
</script>

<script lang="ts">
  import { booksClient } from "../../../api-client/books";
  import type { Book } from "../../../api/routes/books/books.type";

  export let bookid: string;
  export let book: Book;
  export let text: string;
</script>

<svelte:head>
  <base href="/book/{bookid}/read" />
  <title>{book.title} | openpaperback</title>
</svelte:head>

<div class="read">{@html text}</div>

<style lang="scss">
  .read {
    max-width: 500px;
    margin: 0 auto;
    font-size: 18px;
    font-family: Georgia, "Times New Roman", Times, serif;
    content-visibility: auto;
  }
</style>
