<script>
  import ClickOutside from "svelte-click-outside";
  import formatMessage from "format-message";
  import { onMount } from "svelte";
  import translations from "../locales";
  import Userpic from "./Userpic.svelte";
  import Switch from "./Switch.svelte";

  export let user = { active: true };
  export let lang = "ru";

  let active = false;
  let userpicRef;
  let name = {};

  $: {
    const nameData = user.name ? user.name.split(" ") : [];
    if (nameData && nameData.length > 1) {
      name = {
        first: nameData[0],
        last: nameData[1]
      };
    }
  }
  $: {
    formatMessage.setup({
      missingTranslation: "ignore",
      translations,
      locale: lang
    });
  }
  // let isActiveProfile = false;

  const _toggle = () => (active = !active);

  // const _toggleProfile = () => (isActiveProfile = !isActiveProfile);
</script>

<style lang="scss">
  @import "../../styles/theme.scss";

  .userpic-wrapper {
    display: block;
    width: 35px;
    height: 35px;
    border-radius: 12px;
    cursor: pointer;
    opacity: 0.5;
    z-index: 97;

    &.activeProfile {
      opacity: 1;
    }
  }

  .box {
    position: absolute;
    width: 220px;
    right: 0;
    height: auto;
    overflow: hidden;
    min-height: 150px;
    background: white;
    border-radius: 20px;
    box-shadow: 0 2px 4px $lightShadow;
    margin-top: -11px;
    margin-right: -11px;
    z-index: 97;
  }

  .box-top {
    width: 100%;
    min-height: 53px;
    background: $lightestFill;

    & p {
      color: $lightestText;
      font-size: 13px;
      margin: 0;
      padding: 12px 10px 0 15px;
      width: 100%;
      line-height: 1.2;

      & a {
        font-size: 13px;
        color: $darkText;
        padding-right: 50px;
        margin-bottom: 15px;

        & strong {
          font-size: 15px;
        }
      }
    }

    & .switcher {
      margin-top: 5px;

      &:last-of-type {
        padding-bottom: 20px;
      }

      //   & span {
      //     display: block;
      //     margin-top: -3px;
      //     // margin-right: -5px;
      //     float: right;
      //   }
    }
  }

  ul {
    margin: 0;
    list-style: none;
    padding: 0;

    & li {
      & a {
        display: block;
        width: 100%;
        padding: 15px;
        color: $darkText;
        font-size: 13px;

        & i {
          margin-right: 10px;
        }

        &:hover i {
          color: $accent;
        }

        &.logout {
          color: $lightestText;
        }
      }
    }
  }
</style>

{#if active}
  <ClickOutside
    on:clickoutside={() => {
      active = false;
    }}
    exclude={[userpicRef]}>
    <div class="box">
      <div class="box-top">
        <p>
          <a
            href={user.usertype === 'candidate' ? '/my/profile' : '/home/profile'}>
            {#if name && name.first}
              <strong>{name.first}</strong>
              <br />
            {/if}
            {#if name && name.last}{name.last}{/if}
          </a>
        </p>
        {#if user.usertype === 'candidate'}
          <p class="switcher">
            {#if user.active}
              {formatMessage('Looking for jobs')}
            {:else}{formatMessage('Profile is inactive')}{/if}
            <!-- <span>
            <Switch bind:checked={isActiveProfile} />
          </span> -->
          </p>
        {/if}
      </div>
      <ul>
        <li>
          <a
            href={user.usertype === 'candidate' ? '/my/profile' : '/home/profile'}>
            <i class="icon-cog" />
            {formatMessage('Settings')}
          </a>
        </li>
        <li>
          <a class="logout" href="/logout">
            <i class="icon-off" />
            {formatMessage('Logout')}
          </a>
        </li>
      </ul>
    </div>
  </ClickOutside>
{/if}
<div
  bind:this={userpicRef}
  class="userpic-wrapper"
  class:active
  class:activeProfile={user.usertype === 'candidate' ? user.active : true}
  on:click={_toggle}>
  <Userpic
    name={user.name}
    picture={user.picture ? user.picture.thumbnail : ''}
    small />
</div>
