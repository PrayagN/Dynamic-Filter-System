import { Container, Typography, Box, CssBaseline, ThemeProvider, createTheme, AppBar, Toolbar } from '@mui/material';
import { FilterBuilder } from './components/FilterBuilder';
import { DataTable } from './components/DataTable';
import { useFilter } from './hooks/useFilter';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Layers } from 'lucide-react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // Indigo 600
      light: '#60a5fa',
      dark: '#1d4ed8',
      contrastText: '#fff',
    },
    secondary: {
      main: '#7c3aed', // Violet 600
    },
    background: {
      default: '#f8fafc', // Slate 50
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a', // Slate 900
      secondary: '#64748b', // Slate 500
    },
    divider: '#e2e8f0',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px 16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
      },
    },
  },
});

function App() {
  const {
    filters,
    filteredData,
    loading,
    addFilter,
    removeFilter,
    updateFilter,
    clearFilters
  } = useFilter();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
        <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'white', color: 'text.primary', borderBottom: '1px solid', borderColor: 'divider' }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ bgcolor: 'primary.main', p: 0.8, borderRadius: 2, display: 'flex' }}>
                <Layers size={20} color="white" />
              </Box>
              <Typography variant="h6" component="div" sx={{ letterSpacing: '-0.02em', fontWeight: 800 }}>
                Employee <Box component="span" sx={{ color: 'primary.main', fontWeight: 400 }}>Filters</Box>
              </Typography>
            </Box>

          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ mt: { xs: 4, md: 6 }, mb: 8 }}>
          <ErrorBoundary>
            <FilterBuilder
              filters={filters}
              onAdd={addFilter}
              onRemove={removeFilter}
              onUpdate={updateFilter}
              onClear={clearFilters}
            />

            <Box sx={{ mt: { xs: 4, md: 6 } }}>
              <DataTable data={filteredData} loading={loading} />
            </Box>
          </ErrorBoundary>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
