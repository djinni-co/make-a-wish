<script>
  import Spinner from "./Spinner.svelte";
  export let ref;
  export let query;
  export let handleSubmit;
  export let handleReset;
  export let loading = false;

  const _handleKeydown = e => {
    if (e.target == ref && query && e.code == "Enter") {
      handleSubmit();
    }
  };
</script>

<style lang="scss">
  @import "../../styles/theme.scss";
  input {
    display: block;
    margin: 0;
    padding: 5px 30px 6px 27px;
    box-sizing: border-box;
    width: 100%;
    color: $mediumText;
    font-size: 12px;
    border-radius: 3px;
    border: 0;
    background: $graphite;
  }
  input + i {
    color: $mediumText;
    font-size: 13px;
    position: absolute;
    margin-top: -19px;
    margin-left: 8px;
  }

  aside {
    float: right;
    margin-top: -20px;
    margin-right: 8px;
  }

  .reset-btn {
    display: block;
    cursor: pointer;
    color: $mediumText;
    font-size: 11px;
    padding: 15px;
    margin-top: -13px;
    margin-right: -14px;
  }
</style>

<input
  type="text"
  bind:this={ref}
  bind:value={query}
  on:keydown={_handleKeydown} />
<i class="icon-search" />

<aside>
  {#if loading}
    <Spinner style={'width: 11px; height: 11px;'} />
  {:else if query && handleReset}
    <i class="icon-close-regular reset-btn" on:click={handleReset} />
  {/if}

</aside>
