# Employee Filter System

A professional, high-performance dynamic filtering system built with React, TypeScript, and Material-UI. This project allows users to build complex queries against a dataset of employee records with real-time updates.

## 🚀 Features

- **Dynamic Query Builder**: Add multiple parameters with field-specific operators.
- **Complex Logic Support**: Handles nested object properties (e.g., city), arrays (skills), and date ranges.
- **Grouped Filtering**: Logic is applied as `OR` within the same field and `AND` between different fields.
- **Theme Support**: Fully responsive Light and Dark modes with automatic persistence.
- **Persistence**: Filters and theme preferences are automatically saved to `localStorage`.
- **CSV Export**: Instantly download the filtered results as a CSV report.
- **Scroll to Top**: Floating action button for quick navigation on long data tables.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Material-UI (MUI v6), Lucide Icons
- **Build Tool**: Vite
- **State Management**: Custom React Hooks

## 📦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository
   ```bash
   git clone https://github.com/PrayagN/Dynamic-Filter-System.git
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Run the development server
   ```bash
   npm run dev
   ```

## 🧩 Component Usage

The system is designed with modularity in mind. Below are examples of how the core components are utilized.

### 1. FilterBuilder
The `FilterBuilder` component manages the UI for creating and managing multiple filter conditions.

```tsx
import { FilterBuilder } from './components/FilterBuilder';

// Usage in a parent component
<FilterBuilder
  filters={filters}      // Array of FilterCondition objects
  onAdd={addFilter}      // Handler to add a new empty filter
  onRemove={removeFilter} // Handler to remove a specific filter by ID
  onUpdate={updateFilter} // Handler to update filter values
  onClear={clearFilters}  // Handler to remove all filters
/>
```

### 2. DataTable
The `DataTable` component provides a polished, sortable view of the filtered data.

```tsx
import { DataTable } from './components/DataTable';

// Usage in a parent component
<DataTable 
  data={filteredData}  // The filtered subset of employees
  loading={loading}    // Boolean to show loading states
/>
```

### 3. Custom Hook: `useFilter`
All filtering logic and state management are encapsulated in a single, reusable hook.

```tsx
import { useFilter } from './hooks/useFilter';

const {
  filters,
  filteredData,
  loading,
  addFilter,
  removeFilter,
  updateFilter,
  clearFilters,
  totalCount,
  filteredCount
} = useFilter();
```

## 🔍 Implementation Details

### Grouped Filtering Logic
The system uses a custom evaluation engine in `src/utils/filterUtils.ts`. 
- **OR within fields**: If you add two "Department" filters (e.g. 'Engineering', 'Sales'), it shows employees in *either* department.
- **AND across fields**: If you add "Department = Engineering" and "Salary > 100k", it only shows High-earning Engineers.

