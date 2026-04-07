import { AppModal } from './AppModal'

interface ConfirmDialogProps {
  show: boolean
  title: string
  message: string
  confirmLabel?: string
  onCancel: () => void
  onConfirm: () => void
}

export function ConfirmDialog({
  show,
  title,
  message,
  confirmLabel = 'Delete',
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <AppModal
      title={title}
      show={show}
      onClose={onCancel}
      footer={
        <>
          <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="btn btn-danger" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </>
      }
    >
      <p className="mb-0">{message}</p>
    </AppModal>
  )
}
