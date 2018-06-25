'use strict';

const upcaseFirstChar = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const startCase = (string) => {
  return string
    .split(/[\W]/)
    .map(upcaseFirstChar)
    .join('');
};

module.exports = {
  upcaseFirstChar,
  startCase,
};
