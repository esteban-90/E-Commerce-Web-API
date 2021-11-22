export default {
  capitalize(param = "") {
    return param.toLowerCase().replace(/(^|\s)(\w)/g, (letter) => letter.toUpperCase());
  },
};
