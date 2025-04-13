import { ReactNode, useRef } from "react";
import "./Modal.css"

interface ModalProps {
    modalAction: (formData: FormData) => void;
    onClose: () => void;
    modalHeader: string;
    children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ modalAction, onClose, modalHeader, children }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    }

    return (
        <>
            <div ref={modalRef} onClick={closeModal} className="h-screen">
                <div className="modal-box">
                    <button onClick={onClose} className="close-btn">X</button>
                    <h1>{modalHeader}</h1>
                    <form action={modalAction}>
                        {children}
                        <button type="submit" className="submit-btn">Add</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Modal;