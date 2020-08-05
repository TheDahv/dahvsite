import Typography from 'typography'
import theme from 'typography-theme-sutro'

  // See src/styles/global.css
theme.overrideThemeStyles = (config, options) => ({
  'a': {
    color: '#db512f',
  },
  'a:hover': {
    color: '#dd5c3c',
  },
})

const typography = new Typography(theme)

export default typography
