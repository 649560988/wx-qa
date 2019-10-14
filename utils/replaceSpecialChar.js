function replaceSpecialChar(url) {
  url = url.replace(/=/g, '%3D');
  url = url.replace(/\<\/?em\>/g, '');
  return url;
}
module.exports = {
  replaceSpecialChar: replaceSpecialChar
}