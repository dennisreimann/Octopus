'use strict';

const stencil = require('@stencil/core/server');
const { readFileSync } = require('fs');
const { resolve } = require('path');

// create the renderer
const config = stencil.loadConfig(resolve(__dirname, '..', '..', '..'));
config.flags = { ssr: true };
const renderer = new stencil.Renderer(config);

const PARTS_REGEX = /<head>\s?(<style.*?>\s?(.*)\s?<\/style>)\s?<\/head>\s?<body>\s?(.*)\s?<\/body>/;

const render = async (options, filePath, data = {}) => {
  try {
    // invalidateModuleCache(filePath);
    const content = readFileSync(filePath, 'utf-8');
    const result = await renderer.hydrate({ html: content });
    // console.log(result.components)
    const [, styles, css, html] = result.html.match(PARTS_REGEX);

    return {
      rendered: `${styles}\n${html}`,
      parts: [
        {
          title: 'HTML',
          content: html,
          lang: 'html',
        },
        {
          title: 'CSS',
          content: css,
          lang: 'css',
        },
      ],
    };
  } catch (err) {
    const message = [`Stencil could not render "${filePath}"!`, err];

    if (options.debug) message.push(JSON.stringify(data, null, 2));

    throw new Error(message.join('\n\n'));
  }
};

// creates an additional TSX file for every component
const filesForVariant = (componentName, variantName) => {
  return [
    {
      basename: `${variantName}.stml`,
      data: `<${componentName}></${componentName}>\n`,
    },
  ];
};

module.exports = {
  render,
  filesForVariant,
};
