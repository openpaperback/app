<script context="module" lang="ts">
  export async function preload({ params }) {
    let bookid = params.bookid;
    const text = await booksClient.getText(bookid);
    return { text, bookid };
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { booksClient } from "../../../api-client/books";

  export let bookid: string;
  export let text: string;

  let popover: HTMLElement;
  let selectedParagraph: HTMLElement;
  let bookmarks: string[] = [];

  onMount(() => {
    let main: HTMLElement = document.querySelector("main");
    document.querySelectorAll(".read p").forEach((el: HTMLElement) => {
      el.addEventListener("click", (event) => {
        selectedParagraph = el;
        popover.style.opacity = "1";

        const left =
          el.getBoundingClientRect().left - main.getBoundingClientRect().left - popover.clientWidth - 50;
        const top = el.offsetTop - el.scrollTop + el.clientHeight / 2;

        popover.style.top = top + "px";
        popover.style.left = left + "px";
      });
    });

    document.addEventListener("click", (event) => {
      if (selectedParagraph && selectedParagraph != event.target) {
        popover.style.opacity = "0";
      }
    });
  });

  function bookmark(event: MouseEvent) {
    const text = selectedParagraph.innerText.trim();
    bookmarks.push(text);
  }

  function openBookmark(text: string) {
    let paragraph: HTMLElement;
    document.querySelectorAll(".read p").forEach((p: HTMLElement) => {
      if (p.innerHTML.includes(text)) {
        paragraph = p;
      }
    });

    console.log(paragraph);
  }
</script>

<svelte:head>
  <base href="/book/{bookid}/read" />
</svelte:head>

{#each bookmarks as item}
  <div on:click={() => openBookmark(item)}>{item}</div>
{/each}
<div on:click={bookmark} class="popover" bind:this={popover}>
  Bookmark here
  <div class="carret" />
</div>

<div class="read serif">
  {@html text}
</div>

<style lang="scss">
  .read {
    max-width: 500px;
    margin: 0 auto;
    font-size: 18px;
  }

  .popover {
    opacity: 0;
    position: absolute;
    background-color: white;
    width: 100%;
    left: 0;
    transition: all 200ms 100ms ease-in-out;
    box-shadow: 0 1px 1px rgb(0 0 0 / 10%);
    border: 1px solid #333;
    display: flex;
    flex-direction: column;
    border-radius: 3px;
    width: max-content;
    padding: 5px 10px;
    z-index: 3;

    .carret {
      z-index: 1;
      position: absolute;
      width: 10px;
      height: 10px;
      right: -6.4px;
      top: 50%;
      background: white;
      border: 1px solid #333;
      border-bottom: 0;
      border-left: 0;
      top: 50%;
      margin-top: -5px;
      transform: rotate(45deg);
    }
  }
</style>
