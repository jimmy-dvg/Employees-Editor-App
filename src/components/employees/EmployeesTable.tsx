import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi'
import { ConfirmDialog } from '../common/ConfirmDialog'
import { EmployeeFormModal } from './EmployeeFormModal'
import type { Department, Employee, EmployeeFormInput } from '../../types'

interface EmployeesTableProps {
  employees: Employee[]
  departments: Department[]
  onAddEmployee: (input: EmployeeFormInput) => void
  onEditEmployee: (employeeId: string, input: EmployeeFormInput) => void
  onDeleteEmployee: (employeeId: string) => void
}

export function EmployeesTable({
  employees,
  departments,
  onAddEmployee,
  onEditEmployee,
  onDeleteEmployee,
}: EmployeesTableProps) {
  const [showForm, setShowForm] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const employeesById = useMemo(() => {
    return new Map(employees.map((employee) => [employee.id, employee]))
  }, [employees])

  const departmentsById = useMemo(() => {
    return new Map(departments.map((department) => [department.id, department]))
  }, [departments])

  const closeForm = () => {
    setShowForm(false)
    setEditingEmployee(null)
  }

  const handleSubmit = (input: EmployeeFormInput) => {
    if (editingEmployee) {
      onEditEmployee(editingEmployee.id, input)
    } else {
      onAddEmployee(input)
    }

    closeForm()
  }

  return (
    <section className="card border-0 shadow-sm table-card">
      <div className="card-body p-0">
        <div className="d-flex justify-content-between align-items-center p-3 p-md-4 border-bottom">
          <div>
            <h2 className="h4 mb-1">Employees</h2>
            <p className="text-secondary mb-0">Create, edit, and organize your team structure.</p>
          </div>
          <button
            type="button"
            className="btn btn-primary d-inline-flex align-items-center gap-2"
            onClick={() => setShowForm(true)}
          >
            <FiPlus />
            Add Employee
          </button>
        </div>

        <div className="table-responsive">
          <table className="table align-middle mb-0 table-hover">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Job Title</th>
                <th>Department</th>
                <th>Manager</th>
                <th>Contacts</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-secondary">
                    No employees yet. Add your first employee.
                  </td>
                </tr>
              ) : (
                employees.map((employee, index) => (
                  <motion.tr
                    key={employee.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <td>{employee.name}</td>
                    <td>{employee.jobTitle}</td>
                    <td>{employee.departmentId ? departmentsById.get(employee.departmentId)?.name ?? '-' : '-'}</td>
                    <td>{employee.managerId ? employeesById.get(employee.managerId)?.name ?? '-' : '-'}</td>
                    <td>
                      <div className="small d-flex flex-column">
                        <span>{employee.email || '-'}</span>
                        <span>{employee.phone || '-'}</span>
                      </div>
                    </td>
                    <td className="text-end">
                      <div className="d-inline-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => {
                            setEditingEmployee(employee)
                            setShowForm(true)
                          }}
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => setDeleteId(employee.id)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm ? (
        <EmployeeFormModal
          key={editingEmployee?.id ?? 'new-employee'}
          show={showForm}
          departments={departments}
          employees={employees}
          editingEmployee={editingEmployee}
          onClose={closeForm}
          onSubmit={handleSubmit}
        />
      ) : null}

      <ConfirmDialog
        show={Boolean(deleteId)}
        title="Delete employee"
        message="This employee will be removed. Related manager assignments will be cleared."
        onCancel={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) {
            onDeleteEmployee(deleteId)
            setDeleteId(null)
          }
        }}
      />
    </section>
  )
}
