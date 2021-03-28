<script lang="ts">
  import type { Author } from "../api/routes/author/author.type";

  export let author: Author;
</script>

{#if author && author.wiki}
  <a class="author" href={`/author/${author.gutenberg_id}`}>
    <div class="cover" style="background-image: url({author.wiki.thumbnail || ''})" alt="Author cover" />
    <!-- <p class="author subtitle">{book.enriched.authors[0]}</p> -->
    <h3 class="title">{author.aliases[0]}</h3>
  </a>
{/if}

<style lang="scss">
  .author {
    display: flex;
    flex-direction: column;
    width: 20%;
    padding: 20px;
    box-sizing: border-box;
    border: 1px solid #ededed;
    align-content: center;
    text-decoration: none;

    @media screen and (max-width: 900px) {
      width: 33.3333%;
    }

    @media screen and (max-width: 550px) {
      width: 50%;
    }

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

    // .author {
    //   margin-bottom: 0px;
    //   margin-top: 20px;
    // }
  }
</style>
