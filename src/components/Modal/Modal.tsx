import css from "./Modal.module.css";
import { createPortal } from "react-dom";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ onClose, children }: ModalProps) {
  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true">
      <div className={css.modal}>
        <button onClick={onClose} type="button" className={css.closeBtn}>
          ×
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}

export default Modal;
