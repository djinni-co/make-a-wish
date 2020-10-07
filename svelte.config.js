const sveltePreprocess = require("svelte-preprocess");
module.exports = {
  // customElement: true,
  preprocess: sveltePreprocess({
    scss: {
      includePaths: ["src"],
    },
  }),
};
