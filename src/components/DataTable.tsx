import { useState, useMemo } from 'react';
import type { FC, ChangeEvent } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Chip,
    Box,
    Typography,
    TableSortLabel,
    CircularProgress,
    Avatar,
    Stack,
    Button
} from '@mui/material';
import { CheckCircle, XCircle, Search, Download } from 'lucide-react';
import type { Employee } from '../types';

interface DataTableProps {
    data: Employee[];
    loading?: boolean;
}

type SortDirection = 'asc' | 'desc' | false;
type SortableColumn = keyof Employee | 'address.city' | 'isActive' | 'skills';

export const DataTable: FC<DataTableProps> = ({ data, loading }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [orderBy, setOrderBy] = useState<SortableColumn | null>(null);
    const [order, setOrder] = useState<SortDirection>(false);

    // Generates a CSV blob and triggers a browser download
    const handleExport = () => {
        if (data.length === 0) return;

        const headers = ["ID", "Name", "Email", "Department", "Role", "Salary", "JoinDate", "Status", "Skills", "City"];
        const csvRows = data.map(row => [
            row.id,
            `"${row.name}"`,
            row.email,
            row.department,
            row.role,
            row.salary,
            row.joinDate,
            row.isActive ? 'Active' : 'Inactive',
            `"${row.skills.join(', ')}"`,
            `"${row.address.city}"`
        ].join(','));

        const csvString = [headers.join(','), ...csvRows].join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', `employee_report_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSort = (column: SortableColumn) => {
        if (orderBy === column) {
            if (order === 'asc') {
                setOrder('desc');
            } else if (order === 'desc') {
                setOrder(false);
                setOrderBy(null);
            }
        } else {
            setOrderBy(column);
            setOrder('asc');
        }
    };

    const getNestedValue = (obj: any, path: string): any => {
        return path.split('.').reduce((acc, part) => acc?.[part], obj);
    };

    // Memoized processing for sorting to maintain performance during pagination
    const filteredAndSortedData = useMemo(() => {
        if (!orderBy || !order) return data;

        return [...data].sort((a, b) => {
            const aValue = getNestedValue(a, orderBy);
            const bValue = getNestedValue(b, orderBy);

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return order === 'asc'
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }

            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return order === 'asc' ? aValue - bValue : bValue - aValue;
            }

            if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
                return order === 'asc'
                    ? (aValue === bValue ? 0 : aValue ? 1 : -1)
                    : (aValue === bValue ? 0 : aValue ? -1 : 1);
            }

            if (Array.isArray(aValue) && Array.isArray(bValue)) {
                return order === 'asc' ? aValue.length - bValue.length : bValue.length - aValue.length;
            }

            return 0;
        });
    }, [data, orderBy, order]);

    const visibleRows = filteredAndSortedData.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
    );

    // Helper to generate sort event handlers for table headers
    const createSortHandler = (column: SortableColumn) => () => {
        handleSort(column);
    };

    return (
        <Paper elevation={0} sx={{ width: '100%', mb: 4, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                        Employee Directory
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {loading ? 'Fetching records...' : `Displaying ${data.length} matches`}
                    </Typography>
                </Box>
                <Stack direction="row" spacing={2} alignItems="center">
                    {loading && <CircularProgress size={20} thickness={5} sx={{ color: 'primary.main' }} />}
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Download size={16} />}
                        onClick={handleExport}
                        disabled={data.length === 0}
                        sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
                    >
                        Export CSV
                    </Button>
                </Stack>
            </Box>

            <TableContainer sx={{ maxHeight: 600 }}>
                <Table stickyHeader size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ bgcolor: 'rgba(248, 250, 252, 0.8)', fontWeight: 600 }}>
                                <TableSortLabel
                                    active={orderBy === 'id'}
                                    direction={orderBy === 'id' && order ? order : 'asc'}
                                    onClick={createSortHandler('id')}
                                >
                                    ID
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ bgcolor: 'rgba(248, 250, 252, 0.8)', fontWeight: 600 }}>
                                <TableSortLabel
                                    active={orderBy === 'name'}
                                    direction={orderBy === 'name' && order ? order : 'asc'}
                                    onClick={createSortHandler('name')}
                                >
                                    Employee
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ bgcolor: 'rgba(248, 250, 252, 0.8)', fontWeight: 600 }}>
                                <TableSortLabel
                                    active={orderBy === 'department'}
                                    direction={orderBy === 'department' && order ? order : 'asc'}
                                    onClick={createSortHandler('department')}
                                >
                                    Department
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ bgcolor: 'rgba(248, 250, 252, 0.8)', fontWeight: 600 }}>
                                <TableSortLabel
                                    active={orderBy === 'isActive'}
                                    direction={orderBy === 'isActive' && order ? order : 'asc'}
                                    onClick={createSortHandler('isActive')}
                                >
                                    Status
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ bgcolor: 'rgba(248, 250, 252, 0.8)', fontWeight: 600 }}>
                                <TableSortLabel
                                    active={orderBy === 'skills'}
                                    direction={orderBy === 'skills' && order ? order : 'asc'}
                                    onClick={createSortHandler('skills')}
                                >
                                    Skills
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ bgcolor: 'rgba(248, 250, 252, 0.8)', fontWeight: 600 }}>
                                <TableSortLabel
                                    active={orderBy === 'joinDate'}
                                    direction={orderBy === 'joinDate' && order ? order : 'asc'}
                                    onClick={createSortHandler('joinDate')}
                                >
                                    Joined
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ bgcolor: 'rgba(248, 250, 252, 0.8)', fontWeight: 600 }} align="right">
                                <TableSortLabel
                                    active={orderBy === 'salary'}
                                    direction={orderBy === 'salary' && order ? order : 'asc'}
                                    onClick={createSortHandler('salary')}
                                >
                                    Compensation
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ bgcolor: 'rgba(248, 250, 252, 0.8)', fontWeight: 600 }} align="right">
                                <TableSortLabel
                                    active={orderBy === 'performanceRating'}
                                    direction={orderBy === 'performanceRating' && order ? order : 'asc'}
                                    onClick={createSortHandler('performanceRating')}
                                >
                                    Rating
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!loading && visibleRows.map((row) => (
                            <TableRow key={row.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>#{row.id}</TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <Avatar sx={{
                                            width: 32,
                                            height: 32,
                                            fontSize: '0.8rem',
                                            bgcolor: 'primary.lighter',
                                            color: 'primary.main',
                                            fontWeight: 700
                                        }}>
                                            {row.name.charAt(0)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>{row.name}</Typography>
                                            <Typography variant="caption" color="text.secondary">{row.email}</Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={row.department}
                                        size="small"
                                        sx={{
                                            borderRadius: 1.5,
                                            bgcolor: 'rgba(100, 116, 139, 0.08)',
                                            color: 'slate.700',
                                            fontWeight: 500,
                                            fontSize: '0.75rem'
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    {row.isActive ? (
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'success.main' }}>
                                            <CheckCircle size={14} />
                                            <Typography variant="caption" sx={{ fontWeight: 600 }}>Active</Typography>
                                        </Box>
                                    ) : (
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.disabled' }}>
                                            <XCircle size={14} />
                                            <Typography variant="caption" sx={{ fontWeight: 600 }}>Inactive</Typography>
                                        </Box>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {row.skills.slice(0, 2).map(skill => (
                                            <Chip
                                                key={skill}
                                                label={skill}
                                                size="small"
                                                variant="outlined"
                                                sx={{ fontSize: '0.7rem', height: 20, borderColor: 'divider' }}
                                            />
                                        ))}
                                        {row.skills.length > 2 && (
                                            <Typography variant="caption" color="text.disabled" sx={{ ml: 0.5 }}>
                                                +{row.skills.length - 2}
                                            </Typography>
                                        )}
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>{row.joinDate}</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 700 }}>${row.salary.toLocaleString()}</TableCell>
                                <TableCell align="right">
                                    <Box sx={{
                                        display: 'inline-flex',
                                        px: 1,
                                        py: 0.25,
                                        borderRadius: 1,
                                        bgcolor: row.performanceRating >= 4.5 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                        color: row.performanceRating >= 4.5 ? 'success.dark' : 'warning.dark',
                                        fontSize: '0.85rem',
                                        fontWeight: 700
                                    }}>
                                        {row.performanceRating}
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                        {!loading && data.length === 0 && (
                            <TableRow sx={{ height: 300 }}>
                                <TableCell colSpan={8} align="center">
                                    <Box sx={{ opacity: 0.5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                        <Search size={48} />
                                        <Typography variant="body1">No results found for current filters</Typography>
                                        <Typography variant="body2">Try adjusting your query parameters</Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ borderTop: '1px solid', borderColor: 'divider' }}
            />
        </Paper>
    );
};
