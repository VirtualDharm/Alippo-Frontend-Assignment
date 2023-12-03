import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './EditModal.css';

interface TableRow {
  name: string | null;
  age: number;
  city: string;
  pinCode: string | null;
}

interface EditModalProps {
  isOpen: boolean;
  data: TableRow;
  onSave: (updatedData: TableRow) => void;
  onCancel: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, data, onSave, onCancel }) => {
  const [editedData, setEditedData] = useState<TableRow>({ ...data });

  useEffect(() => {
    setEditedData({ ...data });
  }, [data]);

  const handleSave = () => {
    onSave(editedData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      contentLabel="Edit Entry"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div>
        <h2>Edit Entry</h2>
        <label>
          Name:
          <input
            type="text"
            value={editedData.name || ''}
            onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            value={editedData.age}
            onChange={(e) => setEditedData({ ...editedData, age: parseInt(e.target.value) || 0 })}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            value={editedData.city}
            onChange={(e) => setEditedData({ ...editedData, city: e.target.value })}
          />
        </label>
        <label>
          Pin Code:
          <input
            type="text"
            value={editedData.pinCode || ''}
            onChange={(e) => setEditedData({ ...editedData, pinCode: e.target.value })}
          />
        </label>
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </Modal>
  );
};

export default EditModal;