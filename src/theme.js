import { createTheme } from '@mui/material';

const fundoraBlue = '#4639FF';

export const theme = createTheme({
  palette: {
    primary: {
      main: fundoraBlue,
      light: '#7466FF',
      dark: '#3128B2',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F8F9FC',
    },
    text: {
      primary: '#1A1B1E',
      secondary: '#6B7280',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          '&:hover': {
            backgroundColor: '#3128B2',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: '#D1D5DB',
          '&.Mui-checked': {
            color: fundoraBlue,
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#D1D5DB',
          '&.Mui-checked': {
            color: fundoraBlue,
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: fundoraBlue,
          height: 8,
        },
        thumb: {
          height: 24,
          width: 24,
          backgroundColor: '#fff',
          border: `2px solid ${fundoraBlue}`,
          '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
          },
        },
        track: {
          height: 8,
          borderRadius: 4,
        },
        rail: {
          height: 8,
          borderRadius: 4,
          backgroundColor: '#E5E7EB',
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          '&.Mui-active': {
            color: fundoraBlue,
            fontWeight: 600,
          },
          '&.Mui-completed': {
            color: '#059669',
            fontWeight: 500,
          },
        },
      },
    },
  },
});
