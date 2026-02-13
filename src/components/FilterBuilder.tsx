import type { FC } from 'react';
import {
    Box,
    Button,
    Typography,
    Paper,
    Stack,
    Divider,
    Chip
} from '@mui/material';
import { Plus, X, Layers } from 'lucide-react';
import { FilterRow } from './FilterRow';
import type { FilterCondition } from '../types';

interface FilterBuilderProps {
    filters: FilterCondition[];
    onAdd: () => void;
    onRemove: (id: string) => void;
    onUpdate: (id: string, updates: Partial<FilterCondition>) => void;
    onClear: () => void;
}

export const FilterBuilder: FC<FilterBuilderProps> = ({
    filters,
    onAdd,
    onRemove,
    onUpdate,
    onClear
}) => {
    return (
        <Paper
            elevation={0}
            sx={{
                p: { xs: 2.5, md: 4 },
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
                overflow: 'hidden',
                position: 'relative',
                transition: 'all 0.3s ease',
                '&:hover': {
                    borderColor: 'primary.light',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
                },
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '4px',
                    height: '100%',
                    bgcolor: 'primary.main',
                }
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'text.primary', fontWeight: 700 }}>
                        <Layers size={22} color="#2563eb" />
                        Query Builder
                    </Typography>
                    {filters.length > 0 && (
                        <Chip
                            label={`${filters.length} active`}
                            size="small"
                            sx={{
                                fontWeight: 600,
                                bgcolor: 'rgba(37, 99, 235, 0.08)',
                                color: 'primary.main',
                                border: '1px solid',
                                borderColor: 'rgba(37, 99, 235, 0.12)'
                            }}
                        />
                    )}
                </Box>
                {filters.length > 0 && (
                    <Button
                        startIcon={<X size={16} />}
                        onClick={onClear}
                        color="inherit"
                        size="small"
                        sx={{
                            color: 'text.secondary',
                            borderRadius: 2,
                            px: 1.5,
                            '&:hover': { color: 'error.main', bgcolor: 'rgba(239, 68, 68, 0.08)' }
                        }}
                    >
                        Reset All
                    </Button>
                )}
            </Box>

            {filters.length === 0 ? (
                <Box sx={{
                    py: 8,
                    textAlign: 'center',
                    border: '2px dashed',
                    borderColor: 'divider',
                    borderRadius: 4,
                    bgcolor: 'rgba(248, 250, 252, 0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1
                }}>
                    <Typography color="text.primary" variant="body1" sx={{ fontWeight: 600 }}>
                        No query parameters selected
                    </Typography>
                    <Typography color="text.secondary" variant="body2" sx={{ maxWidth: 300 }}>
                        Select field and operator to start filtering the results.
                    </Typography>
                </Box>
            ) : (
                <Stack spacing={3} divider={<Divider sx={{ borderStyle: 'dashed', opacity: 0.5 }} />}>
                    {filters.map((filter) => (
                        <FilterRow
                            key={filter.id}
                            condition={filter}
                            onUpdate={onUpdate}
                            onRemove={onRemove}
                        />
                    ))}
                </Stack>
            )}

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-start' }}>
                <Button
                    variant="contained"
                    startIcon={<Plus size={18} />}
                    onClick={onAdd}
                    sx={{
                        borderRadius: '10px',
                        py: 1.2,
                        px: 3,
                        fontSize: '0.95rem',
                        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
                        '&:hover': {
                            boxShadow: '0 6px 16px rgba(37, 99, 235, 0.35)',
                        }
                    }}
                >
                    Add Parameter
                </Button>
            </Box>
        </Paper>
    );
};
