'use strict';

const { startCase } = require('./util');

// creates an additional TSX file for every component
const filesForComponent = (componentName) => {
  return [
    {
      basename: `${componentName}.tsx`,
      data: `import { Component, Prop } from '@stencil/core';

@Component({
  tag: '${componentName}',
  styleUrl: '${componentName}.css',
})
export class ${startCase(componentName)} {
  /* TODO: Implement */
  render() {
    return (
      <div class="${componentName}"></div>
    );
  }
}
      `,
    },
  ];
};

module.exports = {
  filesForComponent,
};
