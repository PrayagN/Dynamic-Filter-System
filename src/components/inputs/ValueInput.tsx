import type { FC, ChangeEvent } from 'react';
import {
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Box,
    Chip,
    OutlinedInput,
    Stack,
    Switch,
    FormControlLabel,
    Typography,
    type SelectChangeEvent
} from '@mui/material';
import type { FilterField, FilterOperator } from '../../types';

interface ValueInputProps {
    fieldConfig: FilterField;
    operator: FilterOperator;
    value: any;
    onChange: (value: any) => void;
}

export const ValueInput: FC<ValueInputProps> = ({ fieldConfig, operator, value, onChange }) => {
    const { type, options } = fieldConfig;

    const isRelativeDate = ['last7Days', 'last30Days', 'thisMonth', 'thisYear'].includes(operator);
    if (isRelativeDate) {
        return (
            <Box sx={{ minWidth: 200, display: 'flex', alignItems: 'center', height: 40, px: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    Filtering by relative date range...
                </Typography>
            </Box>
        );
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<any>) => {
        onChange(e.target.value);
    };

    if (type === 'select' || type === 'multiselect') {
        const isMulti = type === 'multiselect';
        return (
            <FormControl size="small" fullWidth sx={{ minWidth: 200 }}>
                <InputLabel>{fieldConfig.label}</InputLabel>
                <Select
                    multiple={isMulti}
                    value={value || (isMulti ? [] : '')}
                    onChange={handleChange}
                    input={<OutlinedInput label={fieldConfig.label} sx={{ borderRadius: 2.5 }} />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {isMulti ? (
                                (selected as string[]).map((val) => (
                                    <Chip key={val} label={val} size="small" sx={{ borderRadius: 1 }} />
                                ))
                            ) : (
                                <Chip label={selected as string} size="small" sx={{ borderRadius: 1 }} />
                            )}
                        </Box>
                    )}
                >
                    {options?.map((opt: string) => (
                        <MenuItem key={opt} value={opt}>
                            {opt}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }

    if (type === 'boolean') {
        return (
            <Stack direction="row" spacing={2} alignItems="center" sx={{ height: 40 }}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={!!value}
                            onChange={(e) => onChange(e.target.checked)}
                            color="primary"
                        />
                    }
                    label={value ? "True / Yes" : "False / No"}
                    sx={{
                        '& .MuiTypography-root': {
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            color: value ? 'primary.main' : 'text.secondary'
                        }
                    }}
                />
            </Stack>
        );
    }

    if (operator === 'between') {
        const currentValue = Array.isArray(value) ? value : ['', ''];
        return (
            <Stack direction="row" spacing={1} alignItems="center" sx={{ width: '100%', minWidth: 300 }}>
                <TextField
                    size="small"
                    label="From"
                    type={type === 'date' ? 'date' : 'number'}
                    value={currentValue[0] || ''}
                    onChange={(e) => onChange([e.target.value, currentValue[1]])}
                    InputLabelProps={{ shrink: true }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2.5 } }}
                />
                <Typography variant="body2" sx={{ color: 'text.disabled', px: 0.5 }}>—</Typography>
                <TextField
                    size="small"
                    label="To"
                    type={type === 'date' ? 'date' : 'number'}
                    value={currentValue[1] || ''}
                    onChange={(e) => onChange([currentValue[0], e.target.value])}
                    InputLabelProps={{ shrink: true }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2.5 } }}
                />
            </Stack>
        );
    }

    if (type === 'date') {
        return (
            <TextField
                size="small"
                label="Date"
                type="date"
                value={value || ''}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                sx={{
                    '& .MuiOutlinedInput-root': { borderRadius: 2.5 },
                    minWidth: 160
                }}
                error={!value && value !== undefined}
            />
        );
    }

    return (
        <TextField
            size="small"
            label="Value"
            type={type === 'number' || type === 'amount' ? 'number' : 'text'}
            value={value || ''}
            onChange={handleChange}
            error={!value && value !== undefined && !['last7Days', 'last30Days', 'thisMonth', 'thisYear'].includes(operator)}
            helperText={!value && value !== undefined && !['last7Days', 'last30Days', 'thisMonth', 'thisYear'].includes(operator) ? 'Value required' : ''}
            fullWidth
            placeholder="Enter search term..."
            sx={{
                '& .MuiOutlinedInput-root': { borderRadius: 2.5 },
                minWidth: 160
            }}
        />
    );
};
