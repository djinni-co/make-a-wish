<script>
  import Tag from "./Tag.svelte";
  import Spinner from "./Spinner.svelte";
  export let items = [];
  export let totalCount = 0;
  export let activeValues = [];
  export let activeColor = null;
  export let activeTextColor = null;
  export let color = null;
  export let textColor = null;
  export let handleClick = null;
  export let handleDismiss = null;
  export let handleMore = null;
  export let isAllDismissable = false;
  export let centered = false;
  export let extraParams = {};
  export let loading = false;

  const _isActive = item => {
    if (!activeValues) return false;
    return activeValues.findIndex(val => item.value == val.value) > -1;
  };
</script>

<style lang="scss">
  ul {
    display: inline-block;
    margin: 0;
    padding: 0;
    text-align: left;

    &.centered {
      text-align: center;
    }
  }

  li {
    /* float: left; */
    display: inline-block;
    list-style-type: none;
    margin-top: 10px;
    margin-right: 5px;

    & i {
      margin-left: -3px;
    }
  }
</style>

<ul class:centered>
  {#each items as item, index}
    <li>
      <Tag
        color={item.value && _isActive(item) ? activeColor : color}
        textColor={item.value && _isActive(item) ? activeTextColor : textColor}
        handleClick={() => handleClick({ ...item, ...extraParams })}
        handleDismiss={(isAllDismissable || _isActive(item)) && handleDismiss && (() => handleDismiss(
              { ...item, ...extraParams }
            ))}
        active={item.value && _isActive(item)}>
        {#if item.icon}
          <i class={item.icon} />
        {/if}
        {item.name}
      </Tag>
    </li>
    {#if index == items.length - 1 && totalCount > items.length && handleMore}
      <li>
        <Tag handleClick={handleMore}>...</Tag>
      </li>
    {/if}
  {/each}
  {#if loading}
    <li>
      <Spinner style="padding-top: 4px;" />
    </li>
  {/if}
</ul>
