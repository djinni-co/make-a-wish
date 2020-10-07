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
    Button
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
    .job-company-wrapper {
      background: white;
    }
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
  .text-badge {
    display: inline-block;
    padding: 3px 8px;
    font-size: 12px;
    background: $lightFill;
    color: $lightText;
    border-radius: 5px;
    margin: 10px 0;
  }
  .faded {
    opacity: 0.5;
  }
  .sub-actions-wrapper {
    cursor: pointer;
    position: absolute;
    margin-left: -65px;
    // margin-top: 10px;
    span,
    a {
      display: block;
      padding: 10px;
      margin-left: -10px;
    }
    a:hover {
      i {
        border-radius: 5px;
        background: $lightFill;
      }
    }
    & i {
      font-size: 16px;
      color: $black;
      padding: 10px;
    }
    .back-button {
      transition: 0.3s;
      &:hover {
        margin-left: -15px;
        padding-right: 15px;
      }
    }
    .edit-button {
      margin-top: 5px;
    }
  }
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
        // a {
        //   color: $successText;
        //   border-bottom: 1px dashed $successText;
        //   &:hover {
        //     border-bottom: none;
        //   }
        // }
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
        & .icon-eye,
        & .icon-hand {
          font-size: 17px;
          margin-top: 1px;
        }
      }
    }
  }
  .submit-wrapper {
    position: relative;
    max-width: 600px;
    // &.hidden {
    //   display: none !important;
    // }
  }
  .submit-wrapper,
  .sticky-actions {
    a.submit {
      padding: 11px 15px;
    }
    & .submit {
      display: inline-block;
      & + .submit {
        margin-top: 10px;
      }
    }
    & .submit.linkedin-btn {
      background: $accent;
      min-width: auto;
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
      // font-size: 16px;
      cursor: pointer;
      margin-right: 5px;
      // display: inline-block;
    }
    .icon-star:hover {
      color: $lightText;
    }
  }
  .submit + .favorite-toggler-wrapper {
    margin-left: 10px;
  }
  .job-hint-wrapper {
    padding: 20px;
    margin: 30px 0;
    color: $lightText;
    font-size: 13px;
    border-left: 2px solid $lightBorder;
    &.usertype-warning {
      margin: 0;
      a:hover {
        text-decoration: underline;
      }
    }
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
  .job-company-wrapper {
    width: 100%;
    background: $lightestFill;
    & .job-company {
      padding: 25px 35px 25px 30px;
      margin: 0;
      & p {
        white-space: pre-wrap;
        font-size: 15px;
        line-height: 1.9;
        &:last-of-type {
          margin-bottom: 0;
        }
        & i {
          font-size: 12px;
        }
        // & small {
        //   font-size: 13px;
        // }
        & a {
          color: $lightText;
          font-size: 13px;
          &:hover {
            color: $black;
          }
        }
      }
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
  .navigation-wrapper {
    // display: block;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 600px;
    position: relative;
    margin: 40px 0 10px;
    height: auto;
    overflow-y: hidden;
    padding: 20px 0 0;
    text-align: right;
    border-top: 1px dashed $lightBorder;
    & + section {
      margin-top: 20px;
    }
    .next-job-preview-wrapper {
      padding: 0 20px;
      text-align: right;
      flex-grow: 1;
    }
    small {
      // display: block;
      color: $lightText;
      font-size: 13px;
      strong {
        font-size: 12px;
      }
    }
    a {
      font-size: 13px;
      // color: $lightText;
      color: $black;
      font-weight: 700;
      &:hover {
        color: $accent;
        text-decoration: underline;
      }
    }
    // .key-buttons-wrapper {
    //   height: auto;
    //   overflow: hidden;
    //   margin-bottom: 20px;
    // }
    .key-button {
      display: flex;
      float: right;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      min-width: 40px;
      min-height: 40px;
      border-radius: 12px;
      border: 1px solid $lightBorder;
      color: $lightText;
      text-decoration: none;
      & + a.key-button {
        float: left;
      }
      &:hover {
        text-decoration: none;
        box-shadow: none;
        border: 1px solid $lightBorder;
      }
      i {
        font-size: 16px;
        &.icon-right-open-big {
          margin-left: 1px;
        }
        &.icon-left-open-big {
          margin-right: 1px;
        }
      }
    }
  }
  .related-jobs-wrapper {
    margin: 50px 0;
    h4 {
      margin-bottom: 30px;
    }
    li {
      margin: 30px 0;
    }
    p {
      color: $lightText;
    }
  }
  .sticky-actions {
    position: fixed;
    width: 100%;
    bottom: -500px;
    opacity: 0;
    transition: 0.3s;
    padding: 15px 20px;
    box-sizing: border-box;
    text-align: right;
    z-index: 99;
    &.active {
      bottom: 0;
      opacity: 1;
    }
  }
  @media (min-width: 1600px) {
    main.page-wrapper {
      width: 800px;
    }
  }
  @media (max-width: 1100px) {
    .sticky-actions {
      background: rgba(255, 255, 255, 0.9);
      text-align: center;
    }
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
    .sub-actions-wrapper {
      position: relative;
      display: block;
      margin: -5px 0 10px -10px;
      .back-button:hover {
        margin-left: -10px;
      }
      a,
      span {
        display: inline-block;
      }
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
    .submit-wrapper,
    .sticky-actions {
      .submit {
        display: block;
        width: 100%;
      }
    }
    .sticky-actions {
      padding-bottom: 10px;
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
    .navigation-wrapper {
      border-top: none;
      padding-top: 0;
      margin-top: 15px;
      .next-job-preview-wrapper {
        display: none;
      }
    }
    .page-footer-wrapper.spaced {
      padding-bottom: 130px;
    }
  }
</style>

<svelte:head>
  <title>{job.title} — {lang && formatMessage('Djinni')}</title>
</svelte:head>

<svelte:window
  bind:innerHeight={viewportHeight}
  bind:scrollY={y}
  on:keydown={_handleKeyDown} />

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
        <span class:favorite={job.isFavorite} on:click={() => {}}>
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
        handleSuccess={() => {}}
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
