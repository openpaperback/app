<script lang="ts">
  import Nav from "../components/Nav.svelte";

  export let segment: string;
</script>

<Nav {segment} />

<main>
  <slot />
</main>

<style lang="scss">
  :global(.serif) {
    font-family: "Newsreader", serif;
  }

  :global(.sans) {
    font-family: "Open Sans", serif;
  }

  :global(body) {
    font-family: "Open Sans", serif;
  }

  :global(.f18) {
    font-size: 18px;
  }

  main {
    position: relative;
    max-width: 1120px;
    background-color: white;
    padding: 2em;
    margin: 1em auto;
    box-sizing: border-box;
  }
</style>
