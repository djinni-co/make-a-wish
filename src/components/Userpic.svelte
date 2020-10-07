<script>
  import { beforeUpdate } from "svelte";
  export let picture;
  export let name = "";
  export let small = false;
  export let medium = false;
  export let big = false;
  export let className = "";
  let color;
  let shortname = "";
  const getLetters = name => {
    if (!name) return "";
    let result = "";
    const nameWords = name.split(" ");
    if (nameWords.length > 0) result = nameWords[0][0] ? nameWords[0][0] : "";
    if (nameWords.length > 1)
      result = nameWords[1][0] ? result + nameWords[1][0] : "";
    if (result && result.length > 2) result = result.slice(0, 2);
    return result;
  };
  const colors = [
    "#9adb56",
    "#56d6db",
    "#ff5e6a",
    "#dc5ba3",
    "#c59ae2",
    "#c8da3e"
  ];
  const getColor = char => {
    if (!char) return colors[0];
    var charnum = char.toLowerCase().charCodeAt(0) - 97;
    if (charnum < 4) {
      return colors[0];
    } else if (charnum < 8) {
      return colors[1];
    } else if (charnum < 12) {
      return colors[2];
    } else if (charnum < 16) {
      return colors[3];
    } else if (charnum < 20) {
      return colors[4];
    } else {
      return colors[5];
    }
  };
  beforeUpdate(() => {
    shortname = getLetters(name);
    color = shortname ? getColor(shortname[0]) : colors[0];
  });
</script>

<style lang="scss">
  .wrapper {
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 34%;
    background-color: #eee;
    border: none;
    background-repeat: no-repeat;
    color: white;
    font-size: 12px;
    font-weight: bold;
    text-decoration: none !important;
    box-sizing: border-box;
    overflow: hidden;
    &:hover {
      color: white;
      text-decoration: none !important;
    }
    &.small {
      width: 35px;
      height: 35px;
      & span {
        margin-top: 12px;
        font-size: 11px;
        width: 35px;
      }
      & .userpic {
        width: 35px;
        height: 35px;
      }
    }
    &.medium {
      width: 140px;
      height: 140px;
      & span {
        margin-top: 47px;
        font-size: 44px;
        width: 140px;
      }
      & .userpic {
        width: 140px;
        height: 140px;
      }
    }
    &.big {
      width: 200px;
      height: 200px;
      & span {
        margin-top: 67px;
        font-size: 64px;
        width: 200px;
      }
      & .userpic {
        width: 200px;
        height: 200px;
      }
    }
  }
  .userpic {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 34%;
    background-color: transparent;
    background-size: cover;
    background-position: center;
    box-sizing: border-box;
  }
  span {
    display: block;
    position: absolute;
    width: 50px;
    text-align: center;
    margin-top: 19px;
    z-index: 0;
    height: 16px;
    line-height: 1;
  }
  @media (max-width: 767px) {
    .wrapper.medium,
    .wrapper.big {
      width: 50px;
      height: 50px;
      & span {
        margin-top: 19px;
        font-size: 12px;
        width: 50px;
      }
      & .userpic {
        width: 50px;
        height: 50px;
      }
    }
  }
</style>

<div
  class="wrapper {className}"
  class:small
  class:medium
  class:big
  style="background-color: {color};">
  {#if shortname}
    <span>{shortname}</span>
  {/if}
  <div
    class="userpic"
    style={picture ? `background-image: url('${picture}');` : ''} />
</div>
