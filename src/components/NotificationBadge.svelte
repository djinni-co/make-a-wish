<script>
  export let count = 0;
  export let link = "/my/inbox/";
  export let dark = false;
</script>

<style lang="scss">
  @import "../../styles/theme.scss";
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 45px;
    height: 45px;
    text-align: center;

    &.dark {
      span {
        background: $graphite;
        &.active {
          background: $accent;
        }
      }

      i {
        color: $mediumText;
      }
    }
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 35px;
    height: 35px;
    border-radius: 34%;
    background: $lightFill;
    // border: 1px solid $darkText;
    color: white;
    // color: white;
    font-weight: 700;
    font-size: 11px;
    padding: 0;
    margin: 10px;

    &.active {
      background: $accent;
    }
  }

  i {
    display: block;
    font-size: 16px;
    margin-top: -1px;
    // color: $lightestText;
    color: $darkText;

    // &:hover {
    //   color: $darkFill;
    // }
  }
</style>

<a href={link} class:dark>
  <span class:active={count > 0}>
    {#if count > 0}
      {count}
    {:else}
      <i class="icon-comment" />
    {/if}
  </span>
</a>
