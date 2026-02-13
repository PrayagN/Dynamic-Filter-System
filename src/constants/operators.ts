import type { FilterOperator, FilterFieldType } from '../types';

export const OPERATORS_BY_TYPE: Record<FilterFieldType, FilterOperator[]> = {
    text: ['contains', 'equals', 'startsWith', 'endsWith', 'doesNotContain'],
    number: ['equals', 'isNot', 'gt', 'lt', 'gte', 'lte', 'between'],
    amount: ['equals', 'isNot', 'gt', 'lt', 'gte', 'lte', 'between'],
    date: ['between', 'gt', 'lt', 'last7Days', 'last30Days', 'thisMonth', 'thisYear'],
    boolean: ['is'],
    select: ['equals', 'isNot'],
    multiselect: ['in', 'notIn', 'containsAll']
};

export const OPERATOR_LABELS: Record<FilterOperator, string> = {
    equals: 'Equals',
    contains: 'Contains',
    startsWith: 'Starts With',
    endsWith: 'Ends With',
    doesNotContain: 'Does Not Contain',
    gt: 'Greater Than / After',
    lt: 'Less Than / Before',
    gte: 'Greater Than or Equal',
    lte: 'Less Than or Equal',
    between: 'Between / Range',
    is: 'Is',
    isNot: 'Is Not / Not Equal',
    in: 'Includes Any (OR)',
    notIn: 'Excludes All (NOT)',
    containsAll: 'Includes All (AND)',
    last7Days: 'Last 7 Days',
    last30Days: 'Last 30 Days',
    thisMonth: 'This Month',
    thisYear: 'This Year'
};
