/**
 * 在此处配置字体
 */
const CONFIG = require('../config')

// const { fontFamily } = require('tailwindcss/defaultTheme')

function CJK() {
  switch (CONFIG.LANG.toLowerCase()) {
    case 'zh-cn':
    case 'zh-sg':
      return 'SC'
    case 'zh':
    case 'zh-hk':
    case 'zh-tw':
      return 'TC'
    case 'ja':
    case 'ja-jp':
      return 'JP'
    case 'ko':
    case 'ko-kr':
      return 'KR'
    default:
      return null
  }
}

const fontSansCJK = !CJK()
  ? []
  : [`"Noto Sans CJK ${CJK()}"`, `"Noto Sans ${CJK()}"`]
const fontSerifCJK = !CJK()
  ? []
  : [`"Noto Serif CJK ${CJK()}"`, `"Noto Serif ${CJK()}"`]

const fontFamilies = {
  sans: [...CONFIG.FONT_SANS, ...fontSansCJK],
  serif: [...CONFIG.FONT_SERIF, ...fontSerifCJK],
  noEmoji: [
    'ui-sans-serif',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'sans-serif'
  ]
}
module.exports = { fontFamilies }
