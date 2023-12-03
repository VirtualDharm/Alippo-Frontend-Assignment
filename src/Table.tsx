// Table.tsx
import React, { useState, useEffect } from 'react';
import EditModal from './EditModal';
import ConfirmationModal from './ConfirmationModal';
import './Table.css';

interface TableRow {
  name: string | null;
  age: number;
  city: string;
  pinCode: string | null;
}

interface TableProps {
  data: TableRow[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [confirmationData, setConfirmationData] = useState<TableRow | null>(null);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setIsEditModalOpen(true);
  };

  const handleSave = (index: number, updatedData: TableRow) => {
    const updatedTableData = [...tableData];
    updatedTableData[index] = updatedData;
    setTableData(updatedTableData);
    setEditingIndex(null);
    setIsEditModalOpen(false);
  };

  const handleDelete = (index: number) => {
    const dataToDelete = tableData[index];
    setConfirmationData(dataToDelete);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (confirmationData) {
      const updatedData = tableData.filter((item) => item !== confirmationData);
      setTableData(updatedData);
      setConfirmationData(null);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>SL.No</th>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Pin Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.name || '-'}</td>
              <td>{row.age}</td>
              <td>{row.city}</td>
              <td>{row.pinCode || '-'}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditModal
        isOpen={isEditModalOpen}
        data={editingIndex !== null ? tableData[editingIndex] : { name: null, age: 0, city: '', pinCode: null }}
        onSave={(updatedData) => handleSave(editingIndex!, updatedData)}
        onCancel={() => {
          setEditingIndex(null);
          setIsEditModalOpen(false);
        }}
      />
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this item?"
        onConfirm={confirmDelete}
        onCancel={() => {
          setConfirmationData(null);
          setIsDeleteModalOpen(false);
        }}
      />
    </div>
  );
};

export default Table;