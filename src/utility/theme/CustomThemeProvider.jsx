import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";


const CustomThemeProvider = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
};

export default CustomThemeProvider;