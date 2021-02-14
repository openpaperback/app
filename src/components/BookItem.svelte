<script lang="ts">
  import type { Book } from "../api/routes/books/books.type";

  export let book: Book;
</script>

<a class="book" href={`/book/${book._id}`}>
  <div class="cover" style="background-image: url({book.enriched.thumbnail || ''})" alt="Book cover" />
  <p class="author subtitle">{book.enriched.authors[0]}</p>
  <h3 class="title">{book.enriched.title}</h3>
</a>

<style lang="scss">
  .book {
    display: flex;
    flex-direction: column;
    width: 33.33%;
    padding: 20px;
    box-sizing: border-box;
    border: 1px solid #ededed;
    align-content: center;
    text-decoration: none;

    &:hover {
      .cover {
        transform: scale(1.1);
      }
    }

    .cover {
      width: 150px;
      height: 190px;
      object-fit: cover;
      border-radius: 2px;
      box-shadow: 5px 0px 20px rgb(0 0 0 / 30%);
      transition: all 200ms ease-in-out;
      margin-bottom: 20px;
      align-self: center;
      position: relative;
      background-size: cover;
      background-repeat: no-repeat;

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
      margin-bottom: 0px;
      margin-top: 20px;
    }
  }
</style>
