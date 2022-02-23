import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { blue, amber } from "@mui/material/colors";

let theme = createTheme({
    palette: {
        primary: blue,
        secondary: amber,
    },
});

theme = responsiveFontSizes(theme);

export default theme;
