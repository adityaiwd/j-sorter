import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      light: '#FBB4B1',
      main: '#F64740',
      dark: '#AE0F09',
    },
    secondary: {
      main: '#FFD5C2',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;