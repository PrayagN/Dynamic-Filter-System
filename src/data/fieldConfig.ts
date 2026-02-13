import type { FilterField } from '../types';

export const employeeFilterFields: FilterField[] = [
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'email', label: 'Email', type: 'text' },
    { key: 'department', label: 'Department', type: 'select', options: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Legal', 'Product', 'Design'] },
    { key: 'role', label: 'Role', type: 'text' },
    { key: 'salary', label: 'Salary', type: 'amount' },
    { key: 'joinDate', label: 'Join Date', type: 'date' },
    { key: 'isActive', label: 'Active Status', type: 'boolean' },
    { key: 'skills', label: 'Skills', type: 'multiselect', options: ['React', 'TypeScript', 'Node.js', 'Python', 'Java', 'Go', 'Rust', 'SQL', 'GraphQL', 'Docker', 'Kubernetes', 'AWS'] },
    { key: 'address.city', label: 'City', type: 'text' },
    { key: 'projects', label: 'Projects Count', type: 'number' },
    { key: 'lastReview', label: 'Last Review Date', type: 'date' },
    { key: 'performanceRating', label: 'Performance Rating', type: 'number' },
];
