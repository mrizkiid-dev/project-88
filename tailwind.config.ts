import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

export default <Partial<Config>> {
  content: [
      'components/**/*.{vue,js,ts}',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'composables/**/*.{js,ts}',
      'plugins/**/*.{js,ts}',
      'App.{js,ts,vue}',
      'app.{js,ts,vue}',
      'Error.{js,ts,vue}',
      'error.{js,ts,vue}',
      'content/**/*.md'
  ],
  theme: {
    // extend: { //
      
    // },
    colors: {
      'primary': '#3A3A3A',
      'secondary': '#FDFD96',
      'third-color': '#FFFFFF',
      'gray-v1': '#F8F7F4',
      'gray-darker': '#E4E4E4',
      'error-red': '#CC0202'
    },
    fontFamily: {
      'Inconsolata': ['Inconsolata', 'sans-serif'],
      'Dela-Gothic-One': ['Dela Gothic One', 'sans-serif']
    }
  },
  plugins: [],
}

