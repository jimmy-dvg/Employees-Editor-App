export interface Employee {
  id: string
  name: string
  jobTitle: string
  departmentId: string | null
  email: string
  phone: string
  managerId: string | null
}

export interface Department {
  id: string
  name: string
  description: string
  managerId: string | null
}

export type TabKey = 'departments' | 'employees'

export type EmployeeFormInput = Omit<Employee, 'id'>
export type DepartmentFormInput = Omit<Department, 'id'>
