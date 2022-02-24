import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { blue, amber } from '@mui/material/colors';

let theme = createTheme({
    palette: {
        primary: blue,
        secondary: amber
    },
    typography: {
        button: {
            textTransform: 'none'
        }
    }
});

theme = responsiveFontSizes(theme);

export default theme;
