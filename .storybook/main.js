const copy = require('rollup-plugin-copy');

module.exports = {
  stories: ['../dist/**/*.book.{js,md,mdx}'],
  rollupConfig(config) {
    // add a new plugin to the build
    config.plugins.push(copy({
      targets: [
        { src: 'tree.json', dest: 'storybook-static' },
      ]
    }));

    return config;
  },
};
