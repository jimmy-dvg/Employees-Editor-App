import { FiBriefcase, FiUsers } from 'react-icons/fi'

export function Header() {
  return (
    <header className="app-header shadow-sm">
      <div className="container py-4">
        <div className="d-flex align-items-center gap-3">
          <div className="header-icon-wrap">
            <FiBriefcase />
          </div>
          <div>
            <h1 className="mb-1">Employees Editor</h1>
            <p className="mb-0 text-secondary d-flex align-items-center gap-2">
              <FiUsers />
              Manage departments and employee hierarchy in one place.
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
