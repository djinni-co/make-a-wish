<script>
  // export let message = "";
</script>

<style lang="scss">
  @import "../styles/theme";
  .helper-wrapper {
    position: absolute;
    width: 100px;
    height: 1px;
    // bottom: -1px;
    top: 0;
    right: 10%;
    z-index: 99;
  }
  .dude-body {
    width: 100px;
    height: 150px;
    background-color: $accent;
    // margin-top: -150px;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    overflow: hidden;
  }
  // .dude-body.active {
  //   animation: dudepopup 2s ease-in;
  // }
  .dude-eye {
    position: absolute;
    width: 27px;
    height: 27px;
    border-radius: 50%;
    background-color: white;
    margin-top: 40px;
    margin-left: 7px;
  }
  .dude-eye:after {
    content: "";
    display: block;
    width: 7px;
    height: 7px;
    margin-top: 14px;
    margin-left: 7px;
    background-color: $accent;
    border-radius: 50%;
  }
  .dude-eye:nth-child(2) {
    margin-left: 40px;
  }
  // .dude-lips {
  //   position: absolute;
  //   width: 36px;
  //   height: 28px;
  //   border-radius: 14px;
  //   background-color: rgba(0, 0, 0, 0.2);
  //   margin-top: 75px;
  //   margin-left: 17px;
  // }
  // .dude-lips:after {
  //   content: "";
  //   display: block;
  //   width: 12px;
  //   height: 6px;
  //   border-radius: 3px;
  //   background-color: $accent;
  //   margin-top: 9px;
  //   margin-left: 9px;
  // }
  .dude-dot {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.2);
  }
  .dude-dot {
    position: relative;
    display: block;
    width: 33px;
    height: 33px;
    margin-left: 80px;
    margin-top: 65px;
  }
  .dude-dot + .dude-dot {
    position: absolute;
    width: 10px;
    height: 10px;
    margin-left: 68px;
    margin-top: -35px;
  }
  // .speech-bubble {
  //   position: relative;
  //   background: #e3e3e3;
  //   border-radius: 0.4em;
  //   color: #333;
  //   padding: 7px 10px;
  //   font-weight: bold;
  //   width: 120px;
  //   text-align: center;
  // }
  // .speech-bubble:after {
  //   content: "";
  //   position: absolute;
  //   bottom: 0;
  //   left: 50%;
  //   width: 0;
  //   height: 0;
  //   border: 10px solid transparent;
  //   border-top-color: #e3e3e3;
  //   border-bottom: 0;
  //   margin-left: -10px;
  //   margin-bottom: -10px;
  // }
  // .ouch {
  //   position: absolute;
  //   margin-top: 0px;
  //   margin-left: -10px;
  //   opacity: 1;
  //   z-index: 98;
  //   // margin-top: -200px;
  // }
  // .ouch.active {
  //   animation: speechpopup 2s ease-out;
  //   animation-delay: 0.5s;
  // }
  // @keyframes dudepopup {
  //   0% {
  //     margin-top: 0px;
  //   }
  //   15% {
  //     margin-top: -150px;
  //   }
  //   85% {
  //     margin-top: -150px;
  //   }
  //   100% {
  //     margin-top: 0px;
  //   }
  // }
  // @keyframes speechpopup {
  //   0% {
  //     margin-top: -200px;
  //   }
  //   100% {
  //     margin-top: -300px;
  //     opacity: 0;
  //   }
  // }
  // @media (max-width: $large) {
  //   .helper-wrapper {
  //     right: 30%;
  //   }
  // }
</style>

<div class="helper-wrapper">
  <!-- <span class="speech-bubble ouch" class:active={show}>{message}</span> -->
  <div class="dude-body">
    <span class="dude-eye" />
    <span class="dude-eye" />
    <!-- <span class="dude-lips" /> -->
    <span class="dude-dot" />
    <span class="dude-dot" />
  </div>
</div>
