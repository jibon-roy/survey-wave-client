import { useTheme } from "@emotion/react";


const useCustomTheme = () => {
    const theme = useTheme()

    const primary = theme.palette.primary

    return { primary }
};

export default useCustomTheme;