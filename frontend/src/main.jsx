import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './AuthContext.jsx'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme.js'
import { CssBaseline, useMediaQuery } from '@mui/material'

function Root() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  return (
    <ThemeProvider theme={theme(prefersDarkMode ? "dark" : "light")}>
      <CssBaseline>
        <AuthProvider>
          <App />
        </AuthProvider>
      </CssBaseline>
    </ThemeProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
)
