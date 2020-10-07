<script>
  export let color = null;
  export let textColor = null;
  export let active = false;
  export let arrow = false;
  export let handleClick;
  export let handleDismiss = null;
</script>

<style lang="scss">
  @import "../../styles/theme.scss";
  span {
    cursor: pointer;
    display: inline-block;
    padding: 3px 6px;
    color: $mediumText;
    font-size: 12px;
    // font-weight: 700;
    border-radius: 3px;
    background: $graphite;

    &:hover {
      color: white;
      background: $red;
    }

    &.active,
    &.active:hover {
      font-weight: 700;
      font-size: 11px;
      color: white;
      background-color: $red;
    }

    &.arrow {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      font-size: 11px;
      font-weight: 700;
      height: 23px;
      // padding: 3px 6px 5px;
    }
  }

  svg {
    position: absolute;
    right: 0;
    margin-top: -3px;
    margin-right: -8px;
  }

  @media (max-width: $xlarge) {
    span:hover {
      background: transparent;
    }
  }

  // i {
  //   display: block;
  //   float: right;
  //   margin-left: 7px;
  //   margin-top: 4px;
  //   font-size: 8px;
  // }
</style>

<span
  on:click={active && handleDismiss ? handleDismiss : handleClick}
  class:active
  class:arrow
  style={`${color ? 'background-color: ' + color : ''}; ${textColor ? 'color: ' + textColor : ''}`}>
  {#if arrow}
    <svg height="23" width="8">
      <polygon points="0,0 8,12 0,23" style={`fill:${color}`} />
    </svg>
  {/if}
  <slot />
  <!-- {#if handleDismiss}
    <i class="icon-close" />
  {/if} -->
</span>
