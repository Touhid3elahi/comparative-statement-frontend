import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import APIRequest from '../services/api';

function SupplierPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [name, setName] = useState('');
  const [contactInformation, setContactInformation] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isCreating, setIsCreating] = useState(true);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setSelectedSupplier(null);
    setName('');
    setContactInformation('');
  };

  const handleShow = (supplier, createMode) => {
    setIsCreating(createMode);
    setSelectedSupplier(supplier);
    setName(supplier.name);
    setContactInformation(supplier.contact_information);
    setShowModal(true);
  };

  const fetchSuppliers = () => {
    APIRequest.get('/api/suppliers')
      .then((response) => {
        console.log('API Response:', response.data);
        setSuppliers(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('API error:', error);
        setIsLoading(false);
      });
  };

  const handleEdit = () => {
    APIRequest.put(`/api/suppliers/${selectedSupplier.id}`, {
      name,
      contact_information: contactInformation,
    })
      .then(() => {
        handleClose();
        fetchSuppliers();
      })
      .catch((error) => {
        console.error('Edit error:', error);
      });
  };
  const handleDelete = (supplier) => {
    if (!supplier) {
      alert("No supplier selected for delete.");
      return;
    }
  
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      APIRequest.delete(`/api/suppliers/${supplier.id}`)
        .then(() => {
          handleClose();
          fetchSuppliers();
        })
        .catch((error) => {
          console.error('Delete error:', error);
        });
    }
  };
  

  const handleCreate = () => {
    APIRequest.post('/api/suppliers', {
      name,
      contact_information: contactInformation,
    })
      .then(() => {
        handleClose();
        fetchSuppliers();
      })
      .catch((error) => {
        console.error('Create error:', error);
      });
  };

  return (
    <div>
      <h2 className="my-4">Supplier List</h2>
      <div className="m-3 d-flex justify-content-end">
        <Button onClick={() => handleShow({ name: '', contact_information: '' }, true)} variant="primary">
          Create Supplier
        </Button>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : suppliers && Array.isArray(suppliers) ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact Information</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.id}>
                <td>{supplier.name}</td>
                <td>{supplier.contact_information}</td>
                <td>
                  <Button onClick={() => handleShow(supplier, false)} variant="info">
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(supplier)} variant="danger">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div>No suppliers available.</div>
      )}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isCreating ? 'Create Supplier' : 'Edit Supplier'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contactInformation" className="form-label">
                Contact Information:
              </label>
              <input
                type="text"
                className="form-control"
                id="contactInformation"
                value={contactInformation}
                onChange={(e) => setContactInformation(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant={isCreating ? 'success' : 'primary'}
            onClick={isCreating ? handleCreate : handleEdit}
          >
            {isCreating ? 'Create' : 'Update'}
          </Button>
          {!isCreating && (
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SupplierPage;
