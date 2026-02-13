export type FilterOperator =
    | 'equals'
    | 'contains'
    | 'startsWith'
    | 'endsWith'
    | 'doesNotContain'
    | 'gt' // Greater Than
    | 'lt' // Less Than
    | 'gte' // Greater Than or Equal
    | 'lte' // Less Than or Equal
    | 'between'
    | 'is'
    | 'isNot'
    | 'in'
    | 'notIn'
    | 'containsAll'
    | 'last7Days'
    | 'last30Days'
    | 'thisMonth'
    | 'thisYear';

export type FilterFieldType = 'text' | 'number' | 'date' | 'amount' | 'boolean' | 'select' | 'multiselect';

export interface FilterField {
    key: string;
    label: string;
    type: FilterFieldType;
    options?: string[]; // For select/multiselect
}

export interface FilterCondition {
    id: string;
    field: string;
    operator: FilterOperator;
    value: any;
}

export interface Address {
    city: string;
    state: string;
    country: string;
}

export interface Employee {
    id: number;
    name: string;
    email: string;
    department: string;
    role: string;
    salary: number;
    joinDate: string; // ISO Date string
    isActive: boolean;
    skills: string[];
    address: Address;
    projects: number;
    lastReview: string; // ISO Date string
    performanceRating: number;
}
