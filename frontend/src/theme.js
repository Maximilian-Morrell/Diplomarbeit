import { createTheme } from '@mui/material/styles'

const theme = (mode) => createTheme({
    typography: {
        fontFamily: 'NebulaSans, sans-serif',
    },
    palette: {
        mode,
    }
})

export default theme