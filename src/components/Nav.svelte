<script lang="ts">
  import { goto } from "@sapper/app";

  export let segment: string;
  let search = "";

  const onKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter" && search != "" && search.length > 3) {
      goto(`/search/${search}`);
    }
  };
</script>

<nav>
  <ul>
    <li>
      <a class="logo" href="/">gutenplus</a>
    </li>
  </ul>
  <div class="search">
    <i class="fas fa-search" />
    <input type="text" on:keypress={onKeyPress} bind:value={search} />
  </div>
  <ul>
    <li>
      <a aria-current={segment === undefined ? "page" : undefined} href=".">home</a>
    </li>
    <li>
      <a rel="prefetch" aria-current={segment === "about" ? "page" : undefined} href="about">about</a>
    </li>
  </ul>
</nav>

<style lang="scss">
  nav {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    border-right: 1px solid #ededed;
    font-weight: 300;
    display: flex;
    justify-content: space-between;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
  }

  .logo {
    height: 100%;
    font-weight: 400;
    height: 72px;
    line-height: 72px;
    font-size: 1.2em;
    padding: 0 1em;
  }

  .search {
    flex: 1;
    position: relative;

    i {
      position: absolute;
      left: 30px;
      top: 28px;
      color: #a5a5a5;
    }

    input {
      height: calc(100%);
      padding: 0;
      margin: 0;
      width: 100%;
      border: 0;
      border-left: 1px solid rgba(0, 0, 0, 0.1);
      border-right: 1px solid rgba(0, 0, 0, 0.1);
      padding-left: 60px;
      box-sizing: border-box;
      font-weight: 300;
      font-family: "Open Sans";
      line-height: 1.5;
      font-size: 16px;

      &:focus {
        outline: none;
      }
    }
  }

  ul {
    margin: 0;
    padding: 0;
    padding: 0 1em;
  }

  /* clearfix */
  ul::after {
    content: "";
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  [aria-current] {
    position: relative;
    display: inline-block;
  }

  a {
    text-decoration: none;
    padding: 1.5em 1em;
    display: block;
  }
</style>
