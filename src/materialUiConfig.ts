import { createTheme } from "@mui/material/styles";


const theme = createTheme({      
  typography: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: 18,
    button: {
      textTransform: 'none',
      color: 'white'
    }
  }
});

export default theme;