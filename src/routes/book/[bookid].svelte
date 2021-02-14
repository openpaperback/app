<script context="module" lang="ts">
  export async function preload({ params }) {
    let bookid = params.bookid;

    const book = await booksClient.get(bookid);

    return { book };
  }
</script>

<script lang="ts">
  import { booksClient } from "../../api-client/books";
  import type { Book } from "../../api/routes/books/books.type";
  import Button from "../../components/Button.svelte";

  export let book: Book;

  $: tags = [...book.enriched.categories, ...book.bookshelves];
</script>

<div class="book-details">
  <div class="left-side">
    <div class="cover" style="background-image: url({book.enriched.thumbnail || ''})" alt="Book cover" />
  </div>
  <div class="right-side">
    <p class="author subtitle m0">{book.enriched.authors[0]}</p>
    <h1 class="title serif">{book.enriched.title}</h1>
    <div>{book.enriched.description}</div>

    <div class="tags">
      {#each tags as tag, i}
        {#if i != 0}
          <span>{" "}/{" "}</span>
        {/if}
        {tag}
      {/each}
    </div>

    <div class="mt10">
      <Button href="/book/{book._id}/read" type="primary">Read now</Button>
      <Button href="/book/{book._id}/download" type="primary">Download</Button>
    </div>
  </div>
</div>

<style lang="scss">
  .book-details {
    display: flex;

    .left-side {
      width: 33.333%;
    }

    .right-side {
      width: 66.666%;
    }
  }

  .tags {
    color: #aaa;
    text-transform: uppercase;
    margin-top: 20px;
  }

  .author {
    color: #aaa;
    margin-bottom: 0px;
  }

  .cover {
    width: 200px;
    height: 270px;
    object-fit: cover;
    border-radius: 2px;
    box-shadow: 5px 0px 20px rgb(0 0 0 / 30%);
    transition: all 200ms ease-in-out;
    align-self: center;
    position: relative;
    background-size: cover;
    background-repeat: no-repeat;
    margin: 0 auto;
    margin-bottom: 20px;

    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 10px;
      bottom: 0;
      width: 3px;
      background: rgba(0, 0, 0, 0.06);
      box-shadow: 1px 0 3px rgb(255 255 255 / 10%);
    }
  }
</style>
