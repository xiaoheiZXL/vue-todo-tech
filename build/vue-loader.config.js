module.exports = isDev => {
  return {
    // 删除多余空格
    preserveWhiteSpace: true,
    extractCSS: !isDev,
    cssModules: {}
  }
}