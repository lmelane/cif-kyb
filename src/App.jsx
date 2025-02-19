import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { theme } from './theme';
import Questionnaire from './components/Questionnaire';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Questionnaire />
    </ThemeProvider>
  );
}

export default App;
