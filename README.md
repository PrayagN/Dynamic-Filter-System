# Employee Filter System

A professional, high-performance dynamic filtering system built with React, TypeScript, and Material-UI. This project allows users to build complex queries against a dataset of employee records with real-time updates.

## 🚀 Features

- **Dynamic Query Builder**: Add multiple parameters with field-specific operators.
- **Complex Logic Support**: Handles nested object properties (e.g., city), arrays (skills), and date ranges.
- **Grouped Filtering**: Logic is applied as `OR` within the same field and `AND` between different fields.
- **Persistence**: Filters are automatically saved to `localStorage` and restored on page reload.
- **CSV Export**: Instantly download the filtered results as a CSV report.
- **Robust Design**: Includes a Material-UI premium theme, responsive layout, and React Error Boundaries for stability.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Material-UI (MUI), Lucide Icons
- **Build Tool**: Vite
- **Utilities**: uuid (for unique identifiers)

## 📦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Run the development server
   ```bash
   npm run dev
   ```
4. Build for production
   ```bash
   npm run build
   ```

## 🔍 Implementation Details

### Data Structure
The application uses a flat array of `Employee` objects. Each object contains nested address data and skills as an array of strings.

### Filtering Algorithm
The core logic resides in `src/utils/filterUtils.ts`. It uses a custom-built processing engine that handles type-specific operations (text, number, boolean, date, array) while respecting field groupings.


