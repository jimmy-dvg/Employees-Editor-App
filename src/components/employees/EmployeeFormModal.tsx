import { useMemo, useState } from 'react'
import { AppModal } from '../common/AppModal'
import type { Department, Employee, EmployeeFormInput } from '../../types'

interface EmployeeFormModalProps {
  show: boolean
  departments: Department[]
  employees: Employee[]
  editingEmployee: Employee | null
  onClose: () => void
  onSubmit: (values: EmployeeFormInput) => void
}

const EMPTY_FORM: EmployeeFormInput = {
  name: '',
  jobTitle: '',
  departmentId: null,
  email: '',
  phone: '',
  managerId: null,
}

export function EmployeeFormModal({
  show,
  departments,
  employees,
  editingEmployee,
  onClose,
  onSubmit,
}: EmployeeFormModalProps) {
  const [form, setForm] = useState<EmployeeFormInput>(
    editingEmployee
      ? {
          name: editingEmployee.name,
          jobTitle: editingEmployee.jobTitle,
          departmentId: editingEmployee.departmentId,
          email: editingEmployee.email,
          phone: editingEmployee.phone,
          managerId: editingEmployee.managerId,
        }
      : EMPTY_FORM,
  )

  const managerOptions = useMemo(() => {
    if (!editingEmployee) {
      return employees
    }

    return employees.filter((employee) => employee.id !== editingEmployee.id)
  }, [editingEmployee, employees])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!form.name.trim() || !form.jobTitle.trim()) {
      return
    }

    onSubmit({
      ...form,
      name: form.name.trim(),
      jobTitle: form.jobTitle.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    })
  }

  return (
    <AppModal
      title={editingEmployee ? 'Edit Employee' : 'Add Employee'}
      show={show}
      onClose={onClose}
      footer={
        <>
          <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" form="employee-form">
            {editingEmployee ? 'Save Changes' : 'Create Employee'}
          </button>
        </>
      }
    >
      <form id="employee-form" onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Name</label>
          <input
            required
            className="form-control"
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Job Title</label>
          <input
            required
            className="form-control"
            value={form.jobTitle}
            onChange={(event) => setForm((prev) => ({ ...prev, jobTitle: event.target.value }))}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Department</label>
          <select
            className="form-select"
            value={form.departmentId ?? ''}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                departmentId: event.target.value || null,
              }))
            }
          >
            <option value="">No Department</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Manager</label>
          <select
            className="form-select"
            value={form.managerId ?? ''}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                managerId: event.target.value || null,
              }))
            }
          >
            <option value="">No Manager</option>
            {managerOptions.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Email (optional)</label>
          <input
            type="email"
            className="form-control"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Phone (optional)</label>
          <input
            className="form-control"
            value={form.phone}
            onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
          />
        </div>
      </form>
    </AppModal>
  )
}
