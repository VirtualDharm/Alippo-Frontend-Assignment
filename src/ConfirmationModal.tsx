// ConfirmationModal.tsx
import React from 'react';
import Modal from 'react-modal';
import './ConfirmationModal.css';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      contentLabel="Confirmation"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div>
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={onConfirm}>Confirm</button>
        <button className="cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
