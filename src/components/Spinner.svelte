<script>
  export let style = null;
</script>

<style lang="scss">
  @import "../styles/theme.scss";
  .sp {
    position: absolute;
    width: 17px;
    height: 17px;
  }
  .sp-wave {
    border-radius: 50%;
    position: relative;
    opacity: 1;
  }
  .sp-wave:before,
  .sp-wave:after {
    content: "";
    border: 1px $accent solid;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
  }
  .sp-wave:before {
    transform: scale(1, 1);
    opacity: 1;
    animation: spWaveBe 0.6s infinite linear;
  }
  .sp-wave:after {
    transform: scale(0, 0);
    opacity: 0;
    animation: spWaveAf 0.6s infinite linear;
  }

  @keyframes spWaveAf {
    from {
      transform: scale(0.5, 0.5);
      opacity: 0;
    }
    to {
      transform: scale(1, 1);
      opacity: 1;
    }
  }

  @keyframes spWaveBe {
    from {
      transform: scale(1, 1);
      opacity: 1;
    }
    to {
      transform: scale(1.5, 1.5);
      opacity: 0;
    }
  }
</style>

<div class="sp sp-wave" {style} />
