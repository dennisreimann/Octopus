'use strict';

// creates an additional CSS file for every component
const filesForComponent = (componentName) => {
  return [
    {
      basename: `${componentName}.css`,
      data: '/* TODO: Implement */\n.${componentName} {\n}\n',
    },
  ];
};

module.exports = {
  filesForComponent,
};
