import { createTheme, alpha as muiAlpha, lighten as muiLighten, darken as muiDarken } from "@mui/material/styles";

export const createMaterialTableCompatibleTheme = () => {
  const muiTheme = createTheme({
    components: {
      MuiTableRow: {
        styleOverrides: {
          root: {
            "&:hover": {
              cursor: "pointer",
              backgroundColor: "rgba(224, 224, 224, 1) !important",
            },
            "&:nth-of-type(even)": {
              backgroundColor: "#f0f5f5",
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
          },
        },
      },
    },
    palette: {
      primary: {
        main: "#1d1464",
        light: "#5347a0",
        dark: "#000e4a",
      },
      secondary: {
        main: "#fff",
      },
      background: {
        default: "#fff",
        paper: "#fff",
      },
      text: {
        primary: "rgba(0, 0, 0, 0.87)",
        secondary: "rgba(0, 0, 0, 0.54)",
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  });

  // Helper functions for color manipulation
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  // Create a fully compatible theme object for Material-Table
  const compatibleTheme = {
    ...muiTheme,
    
    // Add all required theme functions that Material-Table expects
    alpha: (color, opacity) => {
      if (typeof muiAlpha === 'function') {
        return muiAlpha(color, opacity);
      }
      // Fallback alpha implementation
      if (color && color.startsWith('#')) {
        const rgb = hexToRgb(color);
        if (rgb) {
          return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
        }
      }
      return color;
    },
    
    lighten: (color, coefficient) => {
      if (typeof muiLighten === 'function') {
        return muiLighten(color, coefficient);
      }
      // Fallback lighten implementation
      if (color && color.startsWith('#')) {
        const rgb = hexToRgb(color);
        if (rgb) {
          const factor = 1 + coefficient;
          return rgbToHex(
            Math.min(255, Math.round(rgb.r * factor)),
            Math.min(255, Math.round(rgb.g * factor)),
            Math.min(255, Math.round(rgb.b * factor))
          );
        }
      }
      return color;
    },
    
    darken: (color, coefficient) => {
      if (typeof muiDarken === 'function') {
        return muiDarken(color, coefficient);
      }
      // Fallback darken implementation
      if (color && color.startsWith('#')) {
        const rgb = hexToRgb(color);
        if (rgb) {
          const factor = 1 - coefficient;
          return rgbToHex(
            Math.max(0, Math.round(rgb.r * factor)),
            Math.max(0, Math.round(rgb.g * factor)),
            Math.max(0, Math.round(rgb.b * factor))
          );
        }
      }
      return color;
    },
    
    // Add other theme utilities that might be needed
    dark: false,
    shadows: muiTheme.shadows || Array(25).fill('none'),
    
    // Ensure all palette colors are available
    palette: {
      ...muiTheme.palette,
      type: 'light', // Material-Table v4 compatibility
      getContrastText: (color) => {
        // Simple contrast text calculation
        const rgb = hexToRgb(color);
        if (rgb) {
          // Calculate relative luminance
          const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
          return luminance > 0.5 ? '#000000' : '#ffffff';
        }
        return '#000000';
      },
    },
    
    // Add spacing function
    spacing: (factor) => `${8 * factor}px`,
    
    // Add breakpoints
    breakpoints: {
      up: (key) => {
        const breakpoints = {
          xs: 0,
          sm: 600,
          md: 960,
          lg: 1280,
          xl: 1920,
        };
        return `@media (min-width:${breakpoints[key]}px)`;
      },
    },
    
    // Add shape
    shape: {
      borderRadius: 4,
    },
    
    // Add transitions
    transitions: {
      create: (props, options = {}) => {
        const { duration = 300, easing = 'ease-in-out', delay = 0 } = options;
        return `all ${duration}ms ${easing} ${delay}ms`;
      },
      easing: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
        complex: 375,
        enteringScreen: 225,
        leavingScreen: 195,
      },
    },
    
    // Add zIndex
    zIndex: {
      mobileStepper: 1000,
      speedDial: 1050,
      appBar: 1100,
      drawer: 1200,
      modal: 1300,
      snackbar: 1400,
      tooltip: 1500,
    },

    // Add mixins
    mixins: {
      toolbar: {
        minHeight: 56,
        '@media (min-width:0px) and (orientation: landscape)': {
          minHeight: 48,
        },
        '@media (min-width:600px)': {
          minHeight: 64,
        },
      },
    },

    // Add direction
    direction: 'ltr',
  };

  return compatibleTheme;
};


export const tableTheme = createMaterialTableCompatibleTheme();