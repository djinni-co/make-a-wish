<script>
  import formatMessage from "format-message";
  import { onMount } from "svelte";
  import { changeLanguage } from "../services/profile";
  import translations from "../locales";
  import { profile } from "../stores";
  import Logo from "./Logo.svelte";
  export let logo = true;
  let lang;
  let linksText = {};

  $: lang = $profile.lang || "ru";

  $: {
    formatMessage.setup({
      missingTranslation: "ignore",
      translations,
      locale: lang
    });

    // custom element walkaround:
    // CE doesnt rerenders if use formatMessage directly in template
    linksText = {
      developers: formatMessage("Developers"),
      jobs: formatMessage("Jobs"),
      account: formatMessage("Account"),
      imRecruiter: formatMessage("I'm recruiter"),
      salaries: formatMessage("Salaries"),
      terms: formatMessage("Terms"),
      logout: formatMessage("Logout"),
      oldDesign: formatMessage("Back to old design")
    };
  }

  const _changeLanguage = language => {
    $profile.lang = language;
    changeLanguage(language);
  };
</script>

<style lang="scss">
  @import "../styles/theme";
  footer {
    width: 100%;
    // margin: 20px 0 15px 0;
    // padding: 10px 30px;
    color: $lightText;

    ul {
      width: 100%;
      padding: 0;
      margin: 5px 0 10px 0;
      // padding: 20px 0;

      & li {
        color: $lightText;
        font-size: 12px;
        display: inline-block;
        margin-right: 10px;
        padding: 5px 0;
        // text-transform: capitalize;

        &:first-of-type {
          margin-left: 0;
        }

        &:last-of-type {
          margin-right: 0;

          &::after {
            content: "";
            margin-left: 0;
          }
        }

        &::after {
          content: "";
          margin-left: 10px;
        }

        & a {
          color: $lightText;
          text-decoration: none;

          &:hover {
            color: $darkText;
            // text-decoration: underline;
          }
        }
      }
    }
  }

  p {
    font-size: 12px;
    color: $lightestText;
    margin: 5px 0 10px;

    .clickable {
      cursor: pointer;
      color: $lightestText;
      margin-left: 10px;
      text-decoration: none;
    }
  }
</style>

<footer>
  {#if logo}
    <Logo small color="#82829a" />
  {/if}
  <ul>
    <li>
      <a href="/pricing.html">{linksText.terms}</a>
    </li>
    <li>
      <a href="/help/privacy">Privacy</a>
    </li>
  </ul>
  <p>
    © 2020 Djinni.co
    {#if lang != 'en'}
      <span class="clickable" on:click={() => _changeLanguage('en')}>
        English
      </span>
    {/if}
    {#if lang != 'ru'}
      <span class="clickable" on:click={() => _changeLanguage('ru')}>
        Русский
      </span>
    {/if}
    {#if lang != 'uk'}
      <span class="clickable" on:click={() => _changeLanguage('uk')}>
        Українська
      </span>
    {/if}
  </p>
</footer>
