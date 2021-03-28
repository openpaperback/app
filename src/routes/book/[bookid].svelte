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
  import Dropdown from "../../components/Dropdown.svelte";
  import DropdownItem from "../../components/DropdownItem.svelte";

  export let book: Book;

  $: tags = [...book.enriched.categories, ...book.bookshelves];
  $: epubImages = book.formats.find((f) => f.fileLink.includes("epub.images"));
  $: epubNoImages = book.formats.find((f) => f.fileLink.includes("epub.noimages"));
  $: kindleImages = book.formats.find((f) => f.fileLink.includes("kindle.images"));
  $: kindleNoImages = book.formats.find((f) => f.fileLink.includes("kindle.noimages"));
  $: txt = book.formats.find((f) => f.fileLink.endsWith(".txt"));
</script>

<svelte:head>
  <title>{book.title} | openpaperback</title>
</svelte:head>

<div class="book-details">
  <div class="left-side">
    <div class="cover" style="background-image: url({book.enriched.thumbnail || ''})" alt="Book cover" />
  </div>
  <div class="right-side">
    <a class="author subtitle m0" href={`/author/${book.gutenberg_author_id}`}>
      {book.enriched.authors[0]}
    </a>
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
      <Button type="primary">
        Download
        <Dropdown>
          {#if epubImages}
            <DropdownItem href={epubImages.fileLink}>Epub with images</DropdownItem>
          {/if}
          {#if epubNoImages}
            <DropdownItem href={epubNoImages.fileLink}>Epub no images</DropdownItem>
          {/if}
          {#if kindleImages}
            <DropdownItem href={kindleImages.fileLink}>Kindle with images</DropdownItem>
          {/if}
          {#if kindleNoImages}
            <DropdownItem href={kindleNoImages.fileLink}>Kindle no images</DropdownItem>
          {/if}

          {#if txt}
            <DropdownItem href={txt.fileLink}>Plain text file</DropdownItem>
          {/if}
        </Dropdown>
      </Button>
    </div>
  </div>
</div>

<style lang="scss">
  .book-details {
    display: flex;
    margin-bottom: 300px;

    .left-side {
      width: 33.333%;
    }

    .right-side {
      width: 66.666%;
    }

    @media screen and (max-width: 800px) {
      flex-direction: column;

      .left-side,
      .right-side {
        width: 100%;
      }
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
