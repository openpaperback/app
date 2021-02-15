<i class="fas fa-angle-down" />
<div class="dropdown">
  <slot />

  <div class="carret-up" />
  <div class="carret-under" />
</div>

<style lang="scss">
  .fas {
    margin-left: 5px;
  }
  .dropdown {
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
  }

  .carret-up,
  .carret-under {
    width: 0px;
    height: 0px;
    border: 10px solid transparent;
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: white;
    border-left-color: transparent;
    position: absolute;
    top: -20px;
    z-index: 2;
    left: 20px;
  }

  .carret-under {
    top: -21px;
    border-bottom-color: #333;
    z-index: 1;
  }
</style>
