import React from 'react';
import { createTheme, GlobalStyles, ThemeProvider } from '@mui/material';
import Main from './Main';
import HeaderContent from './common/HeaderContent';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const familyFont = ['Poppins', 'Maven Pro'].join(',');
const theme = createTheme({
  body: {
    width: '100%',
    height: '100%',
    margin: 0,
    overflowX: 'hidden',
  },
  palette: {
    type: 'light',
    primary: {
      main: '#013C6D',
    },
    secondary: {
      main: '#0F5FC1',
      light: '#076DE0',
    },
    success: {
      main: '#00845A',
    },
    black: {
      main: '#000',
    },
    white: {
      main: '#fff',
    },
    neutral: {
      main: '#b8bcd1',
      light: '#fcfcfc',
      grey: '#4C5258',
    },
    blue: {
      deep: '#233446',
    },
    warning: {
      main: '#FFA800',
    },
    error: {
      main: '#E42444',
    },
    status: {
      success: {
        label: '#005C3A',
        background: '#F0FFFA',
      },
      warning: {
        label: '#9F4900',
        background: '#FFF5EB',
      },
      info: {
        label: '#076DE0',
        background: '#E6F0FF',
      },
    },
  },
  typography: {
    fontFamily: familyFont,
  },
  components: {},
});
const App = () => {
  return (
    <React.StrictMode>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <GlobalStyles styles={{ body: theme.body }} />
          <HeaderContent />
          <Main />
        </ThemeProvider>
      </LocalizationProvider>
    </React.StrictMode>
  );
};

export default App;
