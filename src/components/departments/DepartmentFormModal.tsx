import { useState } from 'react'
import { AppModal } from '../common/AppModal'
import type { Department, DepartmentFormInput, Employee } from '../../types'

interface DepartmentFormModalProps {
  show: boolean
  employees: Employee[]
  editingDepartment: Department | null
  onClose: () => void
  onSubmit: (values: DepartmentFormInput) => void
}

const EMPTY_FORM: DepartmentFormInput = {
  name: '',
  description: '',
  managerId: null,
}

export function DepartmentFormModal({
  show,
  employees,
  editingDepartment,
  onClose,
  onSubmit,
}: DepartmentFormModalProps) {
  const [form, setForm] = useState<DepartmentFormInput>(
    editingDepartment
      ? {
          name: editingDepartment.name,
          description: editingDepartment.description,
          managerId: editingDepartment.managerId,
        }
      : EMPTY_FORM,
  )

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!form.name.trim() || !form.description.trim()) {
      return
    }

    onSubmit({
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
    })
  }

  return (
    <AppModal
      title={editingDepartment ? 'Edit Department' : 'Add Department'}
      show={show}
      onClose={onClose}
      footer={
        <>
          <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" form="department-form">
            {editingDepartment ? 'Save Changes' : 'Create Department'}
          </button>
        </>
      }
    >
      <form id="department-form" onSubmit={handleSubmit} className="row g-3">
        <div className="col-12">
          <label className="form-label">Department Name</label>
          <input
            required
            className="form-control"
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Description</label>
          <textarea
            required
            className="form-control"
            rows={3}
            value={form.description}
            onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Manager (optional)</label>
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
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </AppModal>
  )
}
