import Typography from 'typography'
//import theme from 'typography-theme-sutro'

const theme = {
  baseFontSize: '16px',
  baseLineHeight: 1.69,
  headerFontFamily: ['Playfair Display', 'Georgia', 'serif'],
  bodyFontFamily: ['Roboto', 'Helvetica', 'sans-serif'],
  scaleRatio: 3,
  googleFonts: [
    {
      name: 'Playfair Display',
      styles: ['400', '400i', '700']
    },
    {
      name: 'Roboto',
      styles: ['400', '400i', '500', '500i']
    }
  ]
}

// See src/styles/global.css
/*
theme.overrideThemeStyles = (config, options) => ({
  'a': {
    color: '#db512f',
  },
  'a:hover': {
    color: '#dd5c3c',
  },
})
*/

const typography = new Typography(theme)
const resumeTypography = new Typography({
  ...theme,
  baseFontSize: '14px',
  baseLineHeight: 1.5,
  scaleRatio: 1.75,
})

export { resumeTypography };

export default typography
