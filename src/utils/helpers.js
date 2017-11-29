export const removeEmpty = obj => {
  Object.keys(obj).forEach(key => obj[key] == null && delete obj[key])
  return obj
}

export const setDocTitle = title => {
  document.title = title + ' | Teemaderegister'
}
