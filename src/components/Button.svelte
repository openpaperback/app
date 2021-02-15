<script lang="ts">
  export let href: string | undefined;
  export let type: "primary" | "secondary" = "primary";
</script>

{#if href}
  <a {href} class={`button ${type}`}>
    <slot />
  </a>
{:else}
  <div class={`button ${type}`}>
    <slot />
  </div>
{/if}

<style lang="scss">
  .button {
    padding: 10px 30px;
    text-decoration: none;
    border-radius: 3px;
    display: inline-block;
    position: relative;
    cursor: pointer;
    user-select: none;

    &.primary {
      border: 1px solid #333;
      color: #333;
    }

    &:hover {
      :global(.dropdown) {
        opacity: 1;
        margin-top: 15px;
      }
    }

    :global(.dropdown) {
      opacity: 0;
      position: absolute;
      top: 45px;
      margin-top: 0;
    }
  }
</style>
