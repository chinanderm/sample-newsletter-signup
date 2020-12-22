import '@emotion/react'
import { ThemeColors } from './styles/theme'

declare module '@emotion/react' {
  export interface Theme {
    colors: ThemeColors
    darkMode: boolean
  }
}