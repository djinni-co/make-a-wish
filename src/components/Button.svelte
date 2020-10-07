<script>
  export let label;
  export let link = null;
  export let handleClick = null;
  export let icon = null;
  export let outline = false;
  export let color;
  export let textColor;
  // export let disabled = false; // TODO
</script>

<style lang="scss">
  @import "../styles/theme.scss";
  span {
    font-size: 12px;
    font-weight: 600;
    display: inline-block;
    padding: 9px 15px 10px 15px;
    color: white;
    background-color: $accent;
    border-radius: 3px;
    cursor: pointer;
    opacity: 0.95;

    &:hover {
      opacity: 1;
      box-shadow: 0 2px 1px rgba(0, 0, 0, 0.1);
    }

    & i {
      color: white;
      font-size: 14px;
      margin-right: 3px;
    }

    &.outline {
      background-color: transparent;
      border: 1px solid $accent;
      color: $accent;

      & i {
        color: $accent;
      }

      &:hover {
        color: white;
        background: $accent;
        box-shadow: none;

        & i {
          color: white;
        }
      }
    }
  }
</style>

<span
  style={`color: ${textColor || (outline ? '#4859ff' : 'white')}; background-color: ${color || (outline ? 'white' : '#4859ff')}`}
  class:outline
  on:click={link ? () => {
        window.location.href = link;
      } : handleClick}>
  {#if icon}
    <i class={icon} />
  {/if}
  {label}
</span>
