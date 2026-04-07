import type { Department, Employee } from '../types'

const EMPLOYEES_KEY = 'employees-editor-employees'
const DEPARTMENTS_KEY = 'employees-editor-departments'

const safeParse = <T>(value: string | null): T | null => {
  if (!value) {
    return null
  }

  try {
    return JSON.parse(value) as T
  } catch {
    return null
  }
}

export const loadEmployees = (): Employee[] | null => {
  return safeParse<Employee[]>(localStorage.getItem(EMPLOYEES_KEY))
}

export const loadDepartments = (): Department[] | null => {
  return safeParse<Department[]>(localStorage.getItem(DEPARTMENTS_KEY))
}

export const saveEmployees = (employees: Employee[]): void => {
  localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(employees))
}

export const saveDepartments = (departments: Department[]): void => {
  localStorage.setItem(DEPARTMENTS_KEY, JSON.stringify(departments))
}
