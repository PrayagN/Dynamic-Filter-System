import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '60vh',
                    p: 4
                }}>
                    <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 4, maxWidth: 500, border: '1px solid', borderColor: 'divider' }}>
                        <AlertTriangle size={48} color="#ef4444" style={{ marginBottom: 16 }} />
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                            An error occurred
                        </Typography>
                        <Typography color="text.secondary" paragraph>
                            The application ran into an issue while loading the data or applying filters.
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<RotateCcw size={18} />}
                            onClick={() => window.location.reload()}
                            sx={{ mt: 2, borderRadius: 2 }}
                        >
                            Reload Application
                        </Button>
                    </Paper>
                </Box>
            );
        }

        return this.props.children;
    }
}
