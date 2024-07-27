import React, { useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { Donormodel } from '../common';
import apiClient from '../api/apiClient';
import DonorForm from './DonorForm';

interface DonorListProps {
  donors: Donormodel[];
  setDonors?: React.Dispatch<React.SetStateAction<Donormodel[]>>;
}



const DonorList: React.FC<DonorListProps> = ({ donors, setDonors }) => {
  const [message, setMessage] = useState('');
  const [editingDonor, setEditingDonor] = useState<Donormodel | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (id: number) => {
    apiClient.delete(`/BloodDonors/${id}`)
      .then((response) => {
        if (response.status === 200) {
          if(setDonors) {
            setDonors(donors.filter(donor => donor.id !== id));
          }
          setMessage('Donor deleted successfully');
        }
      })
      .catch((error) => {
        console.error("Failed to delete donor", error);
        setMessage('Failed to delete donor');
      });
  };

  const handleEdit = (donor: Donormodel) => {
    setEditingDonor(donor);
    setShowModal(true);
  };

  const handleClose = () => {
    setEditingDonor(null);
    setShowModal(false);
  };

  return (
    <div>
      <h2>Donor List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Blood Group</th>
            <th>City</th>
            <th>Country</th>
            <th>State</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((donor) => (
            <tr key={donor.id}>
              <td>{donor.fullName}</td>
              <td>{donor.mobile}</td>
              <td>{donor.email}</td>
              <td>{donor.bloodGroup}</td>
              <td>{donor.city}</td>
              <td>{donor.country}</td>
              <td>{donor.state}</td>
              <td>{donor.age}</td>
              <td>
              <Button variant="warning" onClick={() => handleEdit(donor)} className="edit">Edit</Button>{' '}
              <Button onClick={() => handleDelete(donor.id)} variant="danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {message && <p className={message.includes("successfully") ? 'text-success' : 'text-danger'}>{message}</p>}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Donor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DonorForm donor={editingDonor} setDonors={setDonors} setEditingDonor={setEditingDonor} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DonorList;

