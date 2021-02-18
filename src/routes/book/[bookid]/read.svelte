<script context="module" lang="ts">
  export async function preload({ params }) {
    let bookid = params.bookid;
    const text = await booksClient.getText(bookid);
    return { text, bookid };
  }
</script>

<script lang="ts">
  import { booksClient } from "../../../api-client/books";

  export let bookid: string;
  export let text: string;
</script>

<svelte:head>
  <base href="/book/{bookid}/read" />
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
