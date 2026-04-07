# Employees Editor

Employees Editor is a modern React app for managing company departments and employee hierarchy. It provides full CRUD operations for both entities, responsive tables, animated modals, and browser-based persistence through local storage.

Live Demo: https://employees-editor-app.netlify.app

## Features

- Manage departments with Add, Edit, Delete
- Manage employees with Add, Edit, Delete
- Optional relations for:
  - Department manager
  - Employee department
  - Employee manager
- Automatic relationship cleanup on delete:
  - Deleting employee clears related manager references
  - Deleting department clears employee department assignments
- Two-tab layout: Departments | Employees
- Responsive Bootstrap UI with custom visual styling
- Animated transitions using Framer Motion
- Toast notifications for user actions
- Sample seed data for quick testing
- Persistent state in browser local storage

## Tech Stack

- React 19
- TypeScript
- Vite
- Bootstrap 5 + Bootstrap Icons
- React Icons
- Framer Motion
- React Toastify

## Data Model

Department:
- `id`
- `name`
- `description`
- `managerId` (optional)

Employee:
- `id`
- `name`
- `jobTitle`
- `departmentId` (optional)
- `email` (optional)
- `phone` (optional)
- `managerId` (optional)

## Local Storage

The app stores data under these keys:

- `employees-editor-employees`
- `employees-editor-departments`

If no stored data exists, the app loads built-in sample departments and employees from `src/data/sampleData.ts`.

To reload seed data after you already used the app:

1. Open browser DevTools
2. Go to Application/Storage -> Local Storage
3. Remove both keys above
4. Refresh the page

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build locally

```bash
npm run preview
```

### 5. Lint code

```bash
npm run lint
```

## Project Structure

```text
src/
  components/
    common/
      AppModal.tsx
      ConfirmDialog.tsx
    departments/
      DepartmentFormModal.tsx
      DepartmentsTable.tsx
    employees/
      EmployeeFormModal.tsx
      EmployeesTable.tsx
    layout/
      Footer.tsx
      Header.tsx
  data/
    sampleData.ts
  utils/
    storage.ts
  App.tsx
  index.css
  main.tsx
  types.ts
```

## Deployment

The project is configured for Netlify with `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `dist`
- SPA redirect to `index.html`

You can deploy with:

```bash
npx netlify-cli deploy --prod --dir=dist
```

## Notes

- This project is client-side only and uses no backend/database.
- Data persistence is per browser and per device.
