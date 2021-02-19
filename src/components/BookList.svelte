<script lang="ts">
  import type { Book } from "../api/routes/books/books.type";
  import BookItem from "./BookItem.svelte";

  export let books: Book[];
  export let previewLimit = 9;
  let showAll = false;

  $: visibleBooks = showAll ? books : books.slice(0, previewLimit);
</script>

<div class="book-list">
  {#each visibleBooks as book}
    <BookItem {book} />
  {/each}
</div>

{#if books.length > previewLimit}
  <div class="more" on:click={() => (showAll = !showAll)}>
    {#if showAll}
      Show less books <i class="fas fa-angle-up" />
    {:else}
      Show more books <i class="fas fa-angle-down" />
    {/if}
  </div>
{/if}

<style lang="scss">
  .book-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .more {
    cursor: pointer;
    padding: 20px 0;
    text-align: right;
  }
</style>
