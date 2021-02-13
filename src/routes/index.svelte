<script lang="ts">
  import { onMount } from "svelte";
  import type { Book } from "../api/routes/books/books.type";
  import { booksClient } from "../client/books";

  let top: Book[] = [];

  onMount(async () => {
    top = await booksClient.list();
  });
</script>

<svelte:head>
  <title>Gutenplus | Home</title>
</svelte:head>

<div class="collection">
  <h1 class="serif">Most popular this month</h1>

  <div class="collection-items">
    {#each top as book}
      <div class="item">
        <img src={book.enriched.thumbnail || ""} alt="Book cover" />
        <p class="author">{book.enriched.authors[0]}</p>
        <h3 class="title">{book.enriched.title}</h3>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .collection {
    .collection-items {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      > .item {
        display: flex;
        flex-direction: column;
        width: 33.33%;
        padding: 20px;
        box-sizing: border-box;
        border: 1px solid #ededed;
        align-content: center;

        img {
          width: 150px;
          height: 190px;
          object-fit: cover;
          border-radius: 3px;
          box-shadow: 0 2px 5px rgb(0 0 0 / 40%);
          margin-bottom: 20px;
          align-self: center;
        }

        .title {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0;
          margin-bottom: 10px;
        }

        .author {
          color: #aaa;
          color: #aaa;
          margin-bottom: 0px;
          margin-top: 20px;
        }
      }
    }
  }
</style>
