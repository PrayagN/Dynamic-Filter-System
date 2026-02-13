import type { FC } from 'react';
import {
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    IconButton,
    Grid,
    Tooltip,
    TextField
} from '@mui/material';
import { Trash2, GripVertical } from 'lucide-react';
import { employeeFilterFields } from '../data/fieldConfig';
import { ValueInput } from './inputs/ValueInput';
import { OPERATORS_BY_TYPE, OPERATOR_LABELS } from '../constants/operators';
import type { FilterCondition } from '../types';

interface FilterRowProps {
    condition: FilterCondition;
    onUpdate: (id: string, updates: Partial<FilterCondition>) => void;
    onRemove: (id: string) => void;
}

export const FilterRow: FC<FilterRowProps> = ({ condition, onUpdate, onRemove }) => {
    const selectedField = employeeFilterFields.find(f => f.key === condition.field);
    const availableOperators = selectedField ? OPERATORS_BY_TYPE[selectedField.type] : [];

    const handleFieldChange = (newField: string) => {
        const field = employeeFilterFields.find(f => f.key === newField);
        if (field) {
            onUpdate(condition.id, {
                field: newField,
                operator: OPERATORS_BY_TYPE[field.type][0],
                value: field.type === 'multiselect' ? [] : (field.type === 'boolean' ? false : '')
            });
        }
    };

    return (
        <Box
            className="transition-all"
            sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2,
                py: 1.5,
                width: '100%',
                position: 'relative',
                '&:hover': {
                    '& .drag-handle': {
                        color: 'primary.main',
                        opacity: 1
                    }
                }
            }}
        >
            <Box
                className="drag-handle"
                sx={{
                    color: 'text.disabled',
                    mt: 1,
                    display: { xs: 'none', md: 'flex' },
                    opacity: 0.5,
                    transition: 'all 0.2s ease',
                    cursor: 'grab',
                    flexShrink: 0
                }}
            >
                <GripVertical size={20} />
            </Box>

            <Grid container spacing={2.5} sx={{ flexGrow: 1, alignItems: 'flex-start' }}>
                <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                    <FormControl size="small" fullWidth variant="outlined">
                        <InputLabel sx={{ fontSize: '0.85rem' }}>Select Field</InputLabel>
                        <Select
                            value={condition.field}
                            onChange={(e) => handleFieldChange(e.target.value as string)}
                            label="Select Field"
                            sx={{
                                borderRadius: 2.5,
                                bgcolor: 'background.paper',
                                minWidth: 120, // Ensure minimum width
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderWidth: '2px'
                                }
                            }}
                        >
                            {employeeFilterFields.map((field) => (
                                <MenuItem key={field.key} value={field.key} sx={{ fontSize: '0.9rem' }}>
                                    {field.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 3, md: 2.5 }}>
                    <FormControl
                        size="small"
                        fullWidth
                        disabled={!condition.field}
                        variant="outlined"
                    >
                        <InputLabel sx={{ fontSize: '0.85rem' }}>Operator</InputLabel>
                        <Select
                            value={condition.operator}
                            onChange={(e) => onUpdate(condition.id, { operator: e.target.value as any })}
                            label="Operator"
                            sx={{
                                borderRadius: 2.5,
                                bgcolor: 'background.paper',
                                minWidth: 100 // Ensure minimum width
                            }}
                        >
                            {availableOperators.map((op) => (
                                <MenuItem key={op} value={op} sx={{ fontSize: '0.9rem' }}>
                                    {OPERATOR_LABELS[op]}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 4, md: 5.5 }}>
                    <Box sx={{ width: '100%', minWidth: { md: 250 } }}>
                        {selectedField ? (
                            <ValueInput
                                fieldConfig={selectedField}
                                operator={condition.operator}
                                value={condition.value}
                                onChange={(val) => onUpdate(condition.id, { value: val })}
                            />
                        ) : (
                            <TextField
                                size="small"
                                disabled
                                fullWidth
                                placeholder="Select a field first"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2.5,
                                        bgcolor: 'rgba(0,0,0,0.02)'
                                    }
                                }}
                            />
                        )}
                    </Box>
                </Grid>
            </Grid>

            <Tooltip title="Remove parameter">
                <IconButton
                    onClick={() => onRemove(condition.id)}
                    size="small"
                    sx={{
                        mt: 0.5,
                        color: 'text.secondary',
                        flexShrink: 0,
                        transition: 'all 0.2s ease',
                        '&:hover': { color: 'error.main', bgcolor: 'rgba(239, 68, 68, 0.08)' }
                    }}
                >
                    <Trash2 size={18} />
                </IconButton>
            </Tooltip>
        </Box>
    );
};
