export function isValidLink(link){
  const regExp = new RegExp(/^https?:\/\//,"i")
  return regExp.test(link);
}