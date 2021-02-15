<script lang="ts">
  export let href: string;
</script>

<a {href} class="dropdown-item">
  <slot />
</a>

<style lang="scss">
  .dropdown-item {
    text-decoration: none;
    padding: 10px 15px;
  }
</style>
