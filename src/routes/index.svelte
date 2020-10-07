<script context="module">
  import { getJob } from "../services/jobs";
  export async function preload(page, session) {
    const res = await getJob("126080", this.fetch);
    if (!res.error) {
      return { job: res.data, error: null };
    } else {
      this.redirect(302, "/404"); // TODO
      return { error: res.error };
    }
  }
</script>

<script>
  import formatMessage from "format-message";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { stores, goto } from "@sapper/app";
  const { session } = stores();
  import { parseTime } from "../utils/time-utils";
  import { pluralize } from "../utils/locale-utils";
  import translations from "../locales";
  import { profile, pageSettings } from "../stores";
  import {
    Header,
    UserTile,
    PageFooter,
    ApplyForm,
    Button,
    Dude
  } from "../components";
  export let job = {};

  let lang;
  let category;
  let location;
  let locationSummary;
  let experience;
  let showForm = false;
  let showSuccess = false;
  let viewportHeight;
  let backLink;
  let y;
  let _submitWrapperRef;
  let _submitWrapperTriggerHeight;
  let currentIndex;
  let previousJob;
  let nextJob;
  let _formLinkRef;
  let applyMessage = "";
  let _fullDescriptionRef;
  let _descriptionRef;
  let doMagic = false;
  let spell;

  $: _submitWrapperTriggerHeight = _submitWrapperTriggerHeight
    ? _submitWrapperTriggerHeight
    : _submitWrapperRef &&
      _submitWrapperRef.offsetTop + _submitWrapperRef.scrollHeight;
  $: lang = $profile.lang || "ru";
  $: {
    formatMessage.setup({
      missingTranslation: "ignore",
      translations,
      locale: lang
    });
  }

  const _formatMarkedInnerHtml = (text, element) => {
    if (!element) return;
    element.innerHTML = formatMarkedText(text);
  };
</script>

<style lang="scss">
  @import "../styles/theme.scss";
  main.page-wrapper {
    display: block;
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    padding-left: 130px;
    padding-top: 60px;
    overflow-x: hidden;
    clear: both;
  }
  .blured {
    background: $lightFill;
  }
  // BREADCRUMBS
  ul.breadcrumbs {
    width: 100%;
    padding: 15px 0;
    & li {
      color: $lightText;
      font-size: 12px;
      display: inline-block;
      margin-right: 10px;
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
        content: "/";
        margin-left: 10px;
      }
      & a {
        color: $lightText;
        &:hover {
          color: $black;
          // text-decoration: underline;
        }
      }
    }
  } // ul.breadcrumbs

  .summary-box {
    max-width: 600px;
    & h1,
    & h2 {
      position: relative;
      z-index: 97;
    }
    & h1 {
      margin-top: 10px;
    }
    h2 a {
      color: $black;
      &:hover {
        text-decoration: underline;
      }
    }
    .success-message {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      position: relative;
      width: 100%;
      margin: 30px 0;
      border-radius: 5px;
      background: $successFill;
      color: $successText;
      padding: 20px 25px;
      font-size: 12px;
      font-weight: 700;
      i {
        margin-right: 5px;
        font-size: 14px;
        display: block;
      }
      span {
        padding-left: 20px;
      }
    }
  }
  .summary {
    width: 90%;
    // max-width: 600px;
    columns: 2;
    column-gap: 30px;
    margin: 20px 0;
    & li {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 0;
      padding: 10px 0;
      color: $lightText;
      font-size: 13px;
      // display: inline-block;
      width: 100%;
      & .icon {
        display: flex;
        width: 20px;
        height: 20px;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        margin-right: 25px;
        margin-top: -2px;
      }
    }
  }
  .submit-wrapper {
    position: relative;
    max-width: 600px;
  }
  .submit-wrapper {
    .submit {
      display: inline-block;
    }
  }
  .form-wrapper {
    position: relative;
    max-width: 600px;
    margin-top: 40px;
    margin-bottom: -25px;
  }
  .favorite-toggler-wrapper {
    display: inline-block;
    min-width: 160px;
    margin-left: 0;
    height: 30px;
    span {
      cursor: pointer;
      display: inline-block;
      color: $lightText;
      background: $lightFill;
      border-radius: 3px;
      padding: 11px 15px;
      font-size: 12px;
      font-weight: 700;
      width: 100%;
      // max-width: 160px;
      text-align: center;
      &:hover {
        background: $lightestFill;
      }
      &.favorite {
        background: transparent;
        color: $black;
        &:hover {
          background: $lightestFill;
        }
      }
    }
    i {
      cursor: pointer;
      margin-right: 5px;
    }
    .icon-star:hover {
      color: $lightText;
    }
  }
  .submit + .favorite-toggler-wrapper {
    margin-left: 10px;
  }

  .job-teaser {
    display: block;
    width: 100%;
    max-width: 600px;
    font-size: 17px;
    line-height: 1.7;
    margin: 20px 0 30px;
  }
  section.description-wrapper {
    max-width: 600px;
    margin: 40px 0;
    border-top: 1px dashed $lightBorder;
    h2 {
      margin-bottom: 30px;
    }
  }
  .job-description-wrapper {
    width: 100%;
    padding: 0;
    margin: 35px 0;
    & p {
      white-space: pre-wrap;
      font-size: 15px;
      line-height: 1.9;
    }
  }

  .author-wrapper {
    margin: 30px 0 40px;
  }
  .page-footer-wrapper {
    padding: 20px $horizontalPadding;
    z-index: 100;
    &.spaced {
      padding-bottom: 65px;
    }
  }
  @media (min-width: 1600px) {
    main.page-wrapper {
      width: 800px;
    }
  }
  @media (max-width: 1100px) {
    .page-footer-wrapper {
      z-index: 96;
    }
  }
  @media (max-width: $xlarge) {
    main.page-wrapper {
      padding-left: 95px;
      padding-right: $horizontalPadding;
    }
  }

  @media (max-width: $xmedium) {
    section.summary-box .summary {
      columns: 1;
    }
    h1 {
      font-size: 30px;
    }
    h2 {
      font-size: 24px;
    }
  }
  @media (max-width: $medium) {
    main.page-wrapper {
      padding-left: $horizontalPadding;
    }
    .breadcrumbs {
      display: none;
    }

    .page-footer-wrapper {
      max-width: none;
    }
  }
  @media (max-width: $small) {
    main.page-wrapper {
      padding-left: 20px;
      padding-right: 20px;
    }
    .submit-wrapper {
      height: auto;
      overflow: hidden;
    }
    .submit-wrapper {
      .submit {
        display: block;
        width: 100%;
      }
    }
    .submit + .favorite-toggler-wrapper {
      margin-left: 0;
      margin-top: 10px;
    }
    .favorite-toggler-wrapper {
      width: 100%;
      margin-left: 0;
      margin-top: 20px;
      height: 45px;
    }
    .page-footer-wrapper.spaced {
      padding-bottom: 130px;
    }
  }
</style>

<svelte:head>
  <title>{job.title} — {lang && formatMessage('Djinni')}</title>
</svelte:head>

<svelte:window bind:innerHeight={viewportHeight} bind:scrollY={y} />

<header class="page-header">
  <Header pageName={$pageSettings.name} />
</header>

<main class="page-wrapper" class:blured={showForm}>
  <ul class="breadcrumbs">
    <li>
      <a href="/">{lang && formatMessage('All jobs')}</a>
    </li>
  </ul>

  <section class="summary-box">
    <h1>{job.title}</h1>
    {#if job.company && job.company.name}
      <h2>
        {lang && formatMessage('at')}
        <a href="/">{job.company.name}</a>
      </h2>
    {/if}
    <!-- SUCCESS MESSAGE-->
    <p class="success-message" in:fly={{ y: 20, duration: 300, delay: 300 }}>
      <i class="icon-ok" />
      <span>{lang && formatMessage('Mischief Managed!')}</span>
    </p>
    <!---->
    <ul class="summary">
      {#if job.language && job.language.name}
        <li>
          <i class="icon icon-ienglish" />
          {job.language.name}
        </li>
      {/if}
      <li>
        <i class="icon icon-clock" />
        {lang && formatMessage('Published')}
        {parseTime(job.publicationDate, lang)}
      </li>
    </ul>

    {#if job.description}
      <p class="job-teaser" bind:this={_descriptionRef}>{job.description}</p>
    {/if}
  </section>

  {#if !showForm}
    <section class="submit-wrapper" bind:this={_submitWrapperRef}>
      <button
        class="submit"
        on:click={() => {
          showForm = true;
          const offset = _formLinkRef.offsetTop;
          window.scroll({
            top: y > 50 ? offset - 100 : 0,
            left: 0,
            behavior: 'smooth'
          });
        }}>
        {lang && formatMessage('Apply')}
      </button>
      <div class="favorite-toggler-wrapper">
        <span
          class:favorite={job.isFavorite}
          on:click={() => {
            spell = 'Lumos Maxima!';
            doMagic = true;
          }}>
          <i class={job.isFavorite ? 'icon-star' : 'icon-star-empty'} />
          {lang && formatMessage('Add to favorites')}
        </span>
      </div>
    </section>
  {/if}
  <span bind:this={_formLinkRef} />
  {#if showForm}
    <section class="form-wrapper">
      <ApplyForm
        bind:job
        bind:message={applyMessage}
        handleSuccess={() => {
          spell = 'Expecto Patronum!';
          doMagic = true;
          showForm = false;
        }}
        handleDismiss={() => {
          showForm = false;
        }} />
    </section>
  {/if}

  <section class="description-wrapper">
    <div class="job-description-wrapper">
      <h2>{lang && formatMessage('About job')}</h2>
      <p>{job.fullDescription}</p>
    </div>

    <div class="author-wrapper">
      <UserTile
        name={job.recruiter.name}
        picture={job.recruiter.picture}
        subtitle={job.recruiter.headline}
        link={job.recruiter.url} />
    </div>

  </section>
</main>

<footer
  class="page-footer-wrapper"
  class:spaced={job.isOnline && $profile.can_apply_jobs}
  class:blured={showForm}>
  <PageFooter type="candidate" auth={!!$profile.id} />
</footer>

<div class="dude-wrapper">
  <Dude bind:show={doMagic} message={spell} />
</div>
