import type { Department, Employee } from '../types'

export const SAMPLE_EMPLOYEES: Employee[] = [
  {
    id: 'emp-1',
    name: 'Alex Johnson',
    jobTitle: 'CTO',
    departmentId: 'dep-1',
    email: 'alex.johnson@company.com',
    phone: '+1 555 0101',
    managerId: null,
  },
  {
    id: 'emp-2',
    name: 'Maya Patel',
    jobTitle: 'Senior Frontend Engineer',
    departmentId: 'dep-2',
    email: 'maya.patel@company.com',
    phone: '+1 555 0102',
    managerId: 'emp-1',
  },
  {
    id: 'emp-3',
    name: 'Jordan Lee',
    jobTitle: 'Backend Engineer',
    departmentId: 'dep-2',
    email: 'jordan.lee@company.com',
    phone: '+1 555 0103',
    managerId: 'emp-1',
  },
  {
    id: 'emp-4',
    name: 'Nina Gomez',
    jobTitle: 'HR Manager',
    departmentId: 'dep-3',
    email: 'nina.gomez@company.com',
    phone: '+1 555 0104',
    managerId: 'emp-1',
  },
  {
    id: 'emp-5',
    name: 'Chris Walker',
    jobTitle: 'Product Designer',
    departmentId: 'dep-2',
    email: 'chris.walker@company.com',
    phone: '+1 555 0105',
    managerId: 'emp-2',
  },
]

export const SAMPLE_DEPARTMENTS: Department[] = [
  {
    id: 'dep-1',
    name: 'Executive',
    description: 'Company strategy and cross-team leadership.',
    managerId: 'emp-1',
  },
  {
    id: 'dep-2',
    name: 'Engineering',
    description: 'Builds and maintains product features and infrastructure.',
    managerId: 'emp-2',
  },
  {
    id: 'dep-3',
    name: 'People Ops',
    description: 'Supports hiring, onboarding, and internal culture.',
    managerId: 'emp-4',
  },
]
