<script context="module" lang="ts">
  export async function preload({ params }) {
    let authorId = params.authorid;
    const books = await booksClient.listByAuthor(authorId);
    const author = await authorsClient.get(authorId);
    return { books, author };
  }
</script>

<script lang="ts">
  import { authorsClient } from "../../api-client/authors";
  import { booksClient } from "../../api-client/books";
  import type { Author } from "../../api/routes/author/author.type";
  import type { Book } from "../../api/routes/books/books.type";
  import BookList from "../../components/BookList.svelte";

  export let books: Book[];
  export let author: Author;
</script>

<svelte:head>
  <title>{author.aliases[0]} | openpaperback</title>
</svelte:head>

<div class="collection">
  <div class="author">
    <div class="left-side">
      <h1 class="serif">{author.aliases[0]}</h1>
      <p>{@html author.wiki.extract}</p>
      <p>
        <a target="_blank" href={author.wiki.url}>Read more on Wikipedia</a>
      </p>
    </div>
    <div class="right-side">
      <img src={author.wiki.thumbnail} alt="" />
    </div>
  </div>

  <h1 class="serif">Books by {author.aliases[0]}</h1>

  <BookList previewLimit={1000} {books} />
</div>

<style lang="scss">
  .author {
    display: flex;
    margin-bottom: 20px;

    .right-side {
      width: 33.333%;
      display: flex;
      justify-content: center;
      align-content: center;

      img {
        object-fit: cover;
        width: 200px;
        height: 250px;
        box-shadow: rgba(0, 0, 0, 0.3) 5px 0px 20px;
        border-radius: 2px;
      }
    }

    .left-side {
      width: 66.666%;
    }
  }
</style>
