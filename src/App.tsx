import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { DepartmentsTable } from './components/departments/DepartmentsTable'
import { EmployeesTable } from './components/employees/EmployeesTable'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { SAMPLE_DEPARTMENTS, SAMPLE_EMPLOYEES } from './data/sampleData'
import type {
  Department,
  DepartmentFormInput,
  Employee,
  EmployeeFormInput,
  TabKey,
} from './types'
import {
  loadDepartments,
  loadEmployees,
  saveDepartments,
  saveEmployees,
} from './utils/storage'

const createId = () => {
  if ('randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

const getInitialData = () => {
  const storedEmployees = loadEmployees()
  const storedDepartments = loadDepartments()

  if (storedEmployees && storedDepartments) {
    return {
      employees: storedEmployees,
      departments: storedDepartments,
      isSampleData: false,
    }
  }

  return {
    employees: SAMPLE_EMPLOYEES,
    departments: SAMPLE_DEPARTMENTS,
    isSampleData: true,
  }
}

function App() {
  const initialData = useMemo(() => getInitialData(), [])
  const [activeTab, setActiveTab] = useState<TabKey>('departments')
  const [employees, setEmployees] = useState<Employee[]>(initialData.employees)
  const [departments, setDepartments] = useState<Department[]>(initialData.departments)

  useEffect(() => {
    if (initialData.isSampleData) {
      toast.info('Loaded sample company data for quick testing.')
    }
  }, [initialData.isSampleData])

  useEffect(() => {
    saveEmployees(employees)
    saveDepartments(departments)
  }, [departments, employees])

  const stats = useMemo(() => {
    return {
      employees: employees.length,
      departments: departments.length,
    }
  }, [departments.length, employees.length])

  const handleAddEmployee = (input: EmployeeFormInput) => {
    setEmployees((prev) => [...prev, { id: createId(), ...input }])
    toast.success('Employee added.')
  }

  const handleEditEmployee = (employeeId: string, input: EmployeeFormInput) => {
    setEmployees((prev) => prev.map((employee) => (employee.id === employeeId ? { id: employeeId, ...input } : employee)))
    toast.success('Employee updated.')
  }

  const handleDeleteEmployee = (employeeId: string) => {
    setEmployees((prev) => {
      return prev
        .filter((employee) => employee.id !== employeeId)
        .map((employee) =>
          employee.managerId === employeeId ? { ...employee, managerId: null } : employee,
        )
    })

    setDepartments((prev) =>
      prev.map((department) =>
        department.managerId === employeeId ? { ...department, managerId: null } : department,
      ),
    )

    toast.success('Employee deleted.')
  }

  const handleAddDepartment = (input: DepartmentFormInput) => {
    setDepartments((prev) => [...prev, { id: createId(), ...input }])
    toast.success('Department added.')
  }

  const handleEditDepartment = (departmentId: string, input: DepartmentFormInput) => {
    setDepartments((prev) => prev.map((department) => (department.id === departmentId ? { id: departmentId, ...input } : department)))
    toast.success('Department updated.')
  }

  const handleDeleteDepartment = (departmentId: string) => {
    setDepartments((prev) => prev.filter((department) => department.id !== departmentId))
    setEmployees((prev) =>
      prev.map((employee) =>
        employee.departmentId === departmentId ? { ...employee, departmentId: null } : employee,
      ),
    )
    toast.success('Department deleted.')
  }

  return (
    <div className="app-shell">
      <Header />

      <main className="container py-4 py-md-5">
        <div className="stats-panel mb-4">
          <span className="badge rounded-pill text-bg-light">Departments: {stats.departments}</span>
          <span className="badge rounded-pill text-bg-light">Employees: {stats.employees}</span>
        </div>

        <ul className="nav nav-pills app-tabs mb-4">
          <li className="nav-item">
            <button
              type="button"
              className={`nav-link ${activeTab === 'departments' ? 'active' : ''}`}
              onClick={() => setActiveTab('departments')}
            >
              Departments
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className={`nav-link ${activeTab === 'employees' ? 'active' : ''}`}
              onClick={() => setActiveTab('employees')}
            >
              Employees
            </button>
          </li>
        </ul>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === 'departments' ? (
            <DepartmentsTable
              departments={departments}
              employees={employees}
              onAddDepartment={handleAddDepartment}
              onEditDepartment={handleEditDepartment}
              onDeleteDepartment={handleDeleteDepartment}
            />
          ) : (
            <EmployeesTable
              employees={employees}
              departments={departments}
              onAddEmployee={handleAddEmployee}
              onEditEmployee={handleEditEmployee}
              onDeleteEmployee={handleDeleteEmployee}
            />
          )}
        </motion.div>
      </main>

      <Footer />

      <ToastContainer
        position="bottom-right"
        theme="colored"
        autoClose={1800}
        hideProgressBar={false}
      />
    </div>
  )
}

export default App
