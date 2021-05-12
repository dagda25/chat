export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const capitalize = (string) => {
  return string[0].toUpperCase() + string.slice(1);
};
