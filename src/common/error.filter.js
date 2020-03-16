export default errorValue => {
  if (!errorValue) {
    return ''
  }
  if (Array.isArray(errorValue)) {
    return errorValue.map(item => {
      if (item.param && item.msg) {
        return `${item.msg} "${item.param}"`
      }
      return item
    }).join('; ')
  }
  if (errorValue.msg) {
    return errorValue.msg
  }
  return errorValue;
};
