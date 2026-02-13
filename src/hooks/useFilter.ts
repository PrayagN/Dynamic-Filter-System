import { useState, useMemo, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { FilterCondition, Employee } from '../types';
import { applyFilters } from '../utils/filterUtils';
import { mockData } from '../data/mockData';

const STORAGE_KEY = 'app_filter_state';

export const useFilter = () => {
    const [data, setData] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<FilterCondition[]>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
    }, [filters]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 800));
            setData(mockData);
            setLoading(false);
        };
        fetchData();
    }, []);

    const filteredData = useMemo(() => {
        return applyFilters(data, filters);
    }, [data, filters]);

    const addFilter = () => {
        const newFilter: FilterCondition = {
            id: uuidv4(),
            field: '',
            operator: 'contains',
            value: ''
        };
        setFilters([...filters, newFilter]);
    };

    const removeFilter = (id: string) => {
        setFilters(filters.filter(f => f.id !== id));
    };

    const updateFilter = (id: string, updates: Partial<FilterCondition>) => {
        setFilters(filters.map(f => (f.id === id ? { ...f, ...updates } : f)));
    };

    const clearFilters = () => {
        setFilters([]);
    };

    return {
        filters,
        filteredData,
        loading,
        addFilter,
        removeFilter,
        updateFilter,
        clearFilters,
        totalCount: data.length,
        filteredCount: filteredData.length
    };
};
