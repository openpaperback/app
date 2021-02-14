<script lang="ts">
  export let href: string;
  export let type: "primary" | "secondary" = "primary";
</script>

<a {href} class={`button ${type}`}>
  <slot />
</a>

<style lang="scss">
  .button {
    padding: 10px 30px;
    text-decoration: none;
    border-radius: 3px;
    display: inline-block;

    &.primary {
      border: 1px solid #333;
      color: #333;
    }
  }
</style>
