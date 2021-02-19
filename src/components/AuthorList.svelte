<script lang="ts">
  import type { Author } from "../api/routes/author/author.type";
  import AuthorItem from "./AuthorItem.svelte";

  export let authors: Author[];
  const previewLimit = 5;
  let showAll = false;

  $: visibleAuthors = showAll ? authors : authors.slice(0, previewLimit);
</script>

<div class="author-list">
  {#each visibleAuthors as author}
    <AuthorItem {author} />
  {/each}
</div>

<div class="more" on:click={() => (showAll = !showAll)}>
  {#if showAll}
    Show less authors <i class="fas fa-angle-up" />
  {:else}
    Show more authors <i class="fas fa-angle-down" />
  {/if}
</div>

<style lang="scss">
  .author-list {
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
