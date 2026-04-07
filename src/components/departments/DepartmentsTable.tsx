import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi'
import { ConfirmDialog } from '../common/ConfirmDialog'
import { DepartmentFormModal } from './DepartmentFormModal'
import type { Department, DepartmentFormInput, Employee } from '../../types'

interface DepartmentsTableProps {
  departments: Department[]
  employees: Employee[]
  onAddDepartment: (input: DepartmentFormInput) => void
  onEditDepartment: (departmentId: string, input: DepartmentFormInput) => void
  onDeleteDepartment: (departmentId: string) => void
}

export function DepartmentsTable({
  departments,
  employees,
  onAddDepartment,
  onEditDepartment,
  onDeleteDepartment,
}: DepartmentsTableProps) {
  const [showForm, setShowForm] = useState(false)
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const employeesById = useMemo(() => {
    return new Map(employees.map((employee) => [employee.id, employee]))
  }, [employees])

  const closeForm = () => {
    setShowForm(false)
    setEditingDepartment(null)
  }

  const handleSubmit = (input: DepartmentFormInput) => {
    if (editingDepartment) {
      onEditDepartment(editingDepartment.id, input)
    } else {
      onAddDepartment(input)
    }

    closeForm()
  }

  return (
    <section className="card border-0 shadow-sm table-card">
      <div className="card-body p-0">
        <div className="d-flex justify-content-between align-items-center p-3 p-md-4 border-bottom">
          <div>
            <h2 className="h4 mb-1">Departments</h2>
            <p className="text-secondary mb-0">Define departments and assign managers.</p>
          </div>
          <button
            type="button"
            className="btn btn-primary d-inline-flex align-items-center gap-2"
            onClick={() => setShowForm(true)}
          >
            <FiPlus />
            Add Department
          </button>
        </div>

        <div className="table-responsive">
          <table className="table align-middle mb-0 table-hover">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Manager</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-secondary">
                    No departments yet. Add your first department.
                  </td>
                </tr>
              ) : (
                departments.map((department, index) => (
                  <motion.tr
                    key={department.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <td>{department.name}</td>
                    <td>{department.description}</td>
                    <td>
                      {department.managerId
                        ? employeesById.get(department.managerId)?.name ?? '-'
                        : '-'}
                    </td>
                    <td className="text-end">
                      <div className="d-inline-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => {
                            setEditingDepartment(department)
                            setShowForm(true)
                          }}
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => setDeleteId(department.id)}
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
        <DepartmentFormModal
          key={editingDepartment?.id ?? 'new-department'}
          show={showForm}
          employees={employees}
          editingDepartment={editingDepartment}
          onClose={closeForm}
          onSubmit={handleSubmit}
        />
      ) : null}

      <ConfirmDialog
        show={Boolean(deleteId)}
        title="Delete department"
        message="The department will be removed and employee department assignments will be cleared."
        onCancel={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) {
            onDeleteDepartment(deleteId)
            setDeleteId(null)
          }
        }}
      />
    </section>
  )
}
