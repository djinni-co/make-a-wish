<script>
  import Userpic from "./Userpic.svelte";
  export let picture = null;
  export let name = null;
  export let subtitle = null;
  export let link = "";
</script>

<style lang="scss">
  @import "../styles/theme.scss";
  .wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  aside {
    display: inline-block;
  }
  .picturebox {
    margin-right: 13px;
    height: 35px;
  }
  .textbox {
    padding-top: 3px;
    font-size: 13px;
    color: $lightText;
    line-height: 1.4;

    & a {
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    & strong {
      display: block;
      color: $darkText;
    }
  }
</style>

<div class="wrapper">
  <aside class="picturebox">
    <a href={link}>
      <Userpic {name} {picture} small="true" lineheight="1.2" />
    </a>
  </aside>
  <aside class="textbox">
    <a href={link}>
      <strong>{name}</strong>
    </a>
    {#if subtitle}{subtitle}{/if}
  </aside>
</div>
