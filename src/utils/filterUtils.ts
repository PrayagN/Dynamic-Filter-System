import type { Employee, FilterCondition } from '../types';


// Utility to safely retrieve nested values (e.g., 'address.city') from an object
export const getValueByPath = (obj: any, path: string): any => {
    return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
};


// Core function to evaluate a single condition against a data item
export const checkCondition = (item: Employee, condition: FilterCondition): boolean => {
    const { field, operator, value } = condition;
    const itemValue = getValueByPath(item, field);

    // If data is missing for the field, only 'isNot' returns true
    if (itemValue === undefined || itemValue === null) {
        return operator === 'isNot';
    }

    if (typeof itemValue === 'string' && !['gt', 'lt', 'gte', 'lte', 'between', 'last7Days', 'last30Days', 'thisMonth', 'thisYear'].includes(operator)) {
        const strValue = String(itemValue).toLowerCase();
        const filterValue = String(value).toLowerCase();

        switch (operator) {
            case 'equals': return strValue === filterValue;
            case 'contains': return strValue.includes(filterValue);
            case 'startsWith': return strValue.startsWith(filterValue);
            case 'endsWith': return strValue.endsWith(filterValue);
            case 'doesNotContain': return !strValue.includes(filterValue);
            case 'is': return strValue === filterValue;
            case 'isNot': return strValue !== filterValue;
            default: return false;
        }
    }

    if (typeof itemValue === 'number' || (typeof itemValue === 'string' && !isNaN(Number(itemValue)) && operator !== 'contains' && operator !== 'startsWith' && operator !== 'endsWith' && operator !== 'doesNotContain')) {
        const numValue = Number(itemValue);
        const numFilterValue = Number(value);

        switch (operator) {
            case 'equals': return numValue === numFilterValue;
            case 'isNot': return numValue !== numFilterValue;
            case 'gt': return numValue > numFilterValue;
            case 'lt': return numValue < numFilterValue;
            case 'gte': return numValue >= numFilterValue;
            case 'lte': return numValue <= numFilterValue;
            case 'between': {
                if (Array.isArray(value) && value.length === 2) {
                    const min = Number(value[0]);
                    const max = Number(value[1]);
                    return numValue >= min && numValue <= max;
                }
                return false;
            }
            default: break; // Continue to date checks if needed
        }
    }

    if (typeof itemValue === 'boolean') {
        switch (operator) {
            case 'is': return itemValue === (value === 'true' || value === true);
            case 'isNot': return itemValue !== (value === 'true' || value === true);
            default: return false;
        }
    }


    // Date Handling: Convert to timestamps for comparison
    const dateValue = new Date(itemValue).getTime();
    if (!isNaN(dateValue)) {
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

        switch (operator) {
            case 'gt': // After
                return dateValue > new Date(value).getTime();
            case 'lt': // Before
                return dateValue < new Date(value).getTime();
            case 'between': {
                if (Array.isArray(value) && value.length === 2) {
                    const startDate = new Date(value[0]).getTime();
                    const endDate = new Date(value[1]).getTime();
                    return dateValue >= startDate && dateValue <= endDate;
                }
                return false;
            }
            case 'last7Days': {
                const sevenDaysAgo = startOfToday - (7 * 24 * 60 * 60 * 1000);
                return dateValue >= sevenDaysAgo && dateValue <= now.getTime();
            }
            case 'last30Days': {
                const thirtyDaysAgo = startOfToday - (30 * 24 * 60 * 60 * 1000);
                return dateValue >= thirtyDaysAgo && dateValue <= now.getTime();
            }
            case 'thisMonth': {
                const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
                return dateValue >= startOfMonth && dateValue <= now.getTime();
            }
            case 'thisYear': {
                const startOfYear = new Date(now.getFullYear(), 0, 1).getTime();
                return dateValue >= startOfYear && dateValue <= now.getTime();
            }
        }
    }

    // Array operators (e.g. skills)
    if (Array.isArray(itemValue)) {
        const valueArray = Array.isArray(value) ? value : [value];

        switch (operator) {
            case 'in': // Contains Any
                return valueArray.some((v: any) => itemValue.includes(v));
            case 'notIn': // Does Not Contain any of
                return !valueArray.some((v: any) => itemValue.includes(v));
            case 'containsAll': // Contains All
                return valueArray.every((v: any) => itemValue.includes(v));
            case 'contains':
                return itemValue.includes(value);
            default: return false;
        }
    }

    // Fallback for select
    if (operator === 'is' || operator === 'equals') {
        return itemValue == value;
    }
    if (operator === 'isNot') {
        return itemValue != value;
    }

    return false;
};

/**
 * Core filtering algorithm for the Dynamic Filter System.
 * 
 * LOGIC:
 * - AND logic is applied between different fields.
 * - OR logic is applied within the same field.
 *   e.g., (Dept='Sales' OR Dept='Eng') AND (Salary > 50000)
 * 
 * @param data The full dataset to filter
 * @param conditions Array of active filter conditions
 * @returns The filtered subset of data
 */
export const applyFilters = (data: Employee[], conditions: FilterCondition[]): Employee[] => {
    if (!conditions || conditions.length === 0) return data;

    // To support complex queries, we group filters by the field they operate on
    const groupedConditions: Record<string, FilterCondition[]> = {};
    conditions.forEach(condition => {
        if (!groupedConditions[condition.field]) {
            groupedConditions[condition.field] = [];
        }
        groupedConditions[condition.field].push(condition);
    });

    return data.filter(item => {
        // Logic: (Field1_Cond1 OR Field1_Cond2) AND (Field2_Cond1 OR Field2_Cond2)
        return Object.values(groupedConditions).every(fieldGroup => {
            return fieldGroup.some(condition => {
                if (!condition.field) return true;
                return checkCondition(item, condition);
            });
        });
    });
};
