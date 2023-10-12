import React, { useState, useEffect } from 'react';
import APIRequest from '../services/api';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function MaterialPage() {
  const [materials, setMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [unit_of_measurement, setunit_of_measurement] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isCreating, setIsCreating] = useState(true);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setSelectedMaterial(null);
    setName('');
    setDescription('');
    setunit_of_measurement('');
  };

  const handleShow = (material, createMode) => {
    setIsCreating(createMode);
    setSelectedMaterial(material);
    setName(material.name);
    setDescription(material.description);
    setunit_of_measurement(material.unit_of_measurement);
    setShowModal(true);
  };

  const fetchMaterials = () => {
    APIRequest.get('/api/materials')
      .then((response) => {
        console.log('API Response:', response.data);
        setMaterials(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('API error:', error);
        setIsLoading(false);
      });
  };

  const handleEdit = () => {
    if (selectedMaterial) {
      APIRequest.put(`/api/materials/${selectedMaterial.id}`, {
        name,
        description,
        unit_of_measurement,
      })
        .then(() => {
          handleClose();
          fetchMaterials();
        })
        .catch((error) => {
          console.error('Edit error:', error);
        });
    }
  };

  const handleDelete = (material) => {
    if (material) {
      if (window.confirm('Are you sure you want to delete this material?')) {
        APIRequest.delete(`/api/materials/${material.id}`)
          .then(() => {
            handleClose();
            fetchMaterials();
          })
          .catch((error) => {
            console.error('Delete error:', error);
          });
      }
    }
  };

  const handleCreate = () => {
    APIRequest.post('/api/materials', {
      name,
      description,
      unit_of_measurement,
    })
      .then(() => {
        handleClose();
        fetchMaterials();
      })
      .catch((error) => {
        console.error('Create error:', error);
      });
  };

  return (
    <div>
      <h2 className="my-4">Material List</h2>
      <div className="m-3 d-flex justify-content-end">
        <Button onClick={() => handleShow({ name: '', description: '', unit_of_measurement: '' }, true)} variant="primary">
          Create Material
        </Button>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : materials && Array.isArray(materials) ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Unit of Measurement</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((material) => (
              <tr key={material.id}>
                <td>{material.name}</td>
                <td>{material.description}</td>
                <td>{material.unit_of_measurement}</td>
                <td>
                  <Button onClick={() => handleShow(material, false)} variant="info">
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(material)} className='ms-2' variant="danger">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div>No materials available.</div>
      )}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isCreating ? 'Create Material' : 'Edit Material'}</Modal.Title>
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
              <label htmlFor="description" className="form-label">
                Description:
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="unit_of_measurement" className="form-label">
                Unit of Measurement:
              </label>
              <input
                type="text"
                className="form-control"
                id="unit_of_measurement"
                value={unit_of_measurement}
                onChange={(e) => setunit_of_measurement(e.target.value)}
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
            <Button variant="danger" onClick={() => handleDelete(selectedMaterial)}>
              Delete
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MaterialPage;
