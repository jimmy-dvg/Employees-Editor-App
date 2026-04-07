import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface AppModalProps {
  title: string
  show: boolean
  onClose: () => void
  children: ReactNode
  footer?: ReactNode
}

export function AppModal({ title, show, onClose, children, footer }: AppModalProps) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="modal-backdrop-custom"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-dialog-custom"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-content shadow-lg">
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={onClose}
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">{children}</div>
              {footer ? <div className="modal-footer">{footer}</div> : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
