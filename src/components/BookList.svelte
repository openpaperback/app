<script lang="ts">
  import type { Book } from "../api/routes/books/books.type";
  import BookItem from "./BookItem.svelte";

  export let books: Book[];
</script>

<div class="book-list">
  {#each books as book}
    <BookItem {book} />
  {/each}
</div>

<style lang="scss">
  .book-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
</style>
