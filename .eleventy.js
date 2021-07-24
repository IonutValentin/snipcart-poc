const htmlmin = require("html-minifier");
const pluginESbuild = require("@jamshop/eleventy-plugin-esbuild");

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget("./src/assets/sass");
  eleventyConfig.addPassthroughCopy({ "src/assets/img": "img" });
  eleventyConfig.addPassthroughCopy({ "src/assets/fonts": "fonts" });


  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if( outputPath && outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });

  eleventyConfig.addPlugin(pluginESbuild, {
    entryPoints: {
      main: "src/assets/js/main.js"
    },
    output: "public/js"
  });

  return {
    dir: { input: 'src/views', output: 'public', includes: '_includes', data: '_data'},
  };
};
