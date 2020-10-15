import { createGlobalStyle } from 'styled-components'

export const FontStack = createGlobalStyle`
  @font-face {
    font-family: 'Manrope';
    src: url('/manrope-variable.ttf');
    font-weight: 1 999;
  }
  body,
  html {
    font-family: 'Manrope', sans-serif;
  }
`

export const fontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
}
