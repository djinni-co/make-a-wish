<script>
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import Logo from "./Logo.svelte";
</script>

<style lang="scss">
  @import "../styles/theme.scss";
  header {
    position: relative;
    display: block;
    width: 100%;
    padding: 22px 20px 0 $horizontalPadding;
    margin: 0 auto;
    height: 50px;
    z-index: 98;
  }

  .logo-wrapper {
    position: relative;
    display: block;
    float: left;
    z-index: 100;
  }

  @media (max-width: $small) {
    header {
      padding: 18px;
    }
  }
</style>

<header>
  <a class="logo-wrapper" href="/">
    <Logo small={true} />
  </a>
</header>
