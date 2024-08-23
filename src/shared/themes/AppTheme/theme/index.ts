import { createTheme } from "@mui/material";
import components from "shared/themes/AppTheme/theme/options/components";
import typography from "shared/themes/AppTheme/theme/options/typography";
import { light } from "shared/themes/AppTheme/theme/options/palette";
const palette = light;

const theme = createTheme({
    ...components,
    ...typography,
    ...palette
})

export default theme;