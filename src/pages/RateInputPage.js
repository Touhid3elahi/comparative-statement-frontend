import React, { useState, useEffect } from 'react';
import APIRequest from '../services/api';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

function RateForm() {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [rate, setRate] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [materials, setMaterials] = useState([]);
  const [rates, setRates] = useState([]);
  const [selectedRate, setSelectedRate] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [editSelectedSupplier, setEditSelectedSupplier] = useState('');
  const [editSelectedMaterial, setEditSelectedMaterial] = useState('');

  useEffect(() => {
    getSuppliers();
    getMaterials();
    getRates();
  }, []);

  const getSuppliers = () => {
    APIRequest.get('/api/suppliers')
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching suppliers', error);
      });
  };

  const handleEditRate = (rate) => {
    setSelectedRate(rate);
    setEditSelectedSupplier(rate.supplier_id);
    setEditSelectedMaterial(rate.material_id);
    setShowEditModal(true);
  };
  
  const getMaterials = () => {
    APIRequest.get('/api/materials')
      .then((response) => {
        setMaterials(response.data);
      })
      .catch((error) => {
        console.error('Error fetching materials', error);
      });
  };

  const getRates = () => {
    APIRequest.get('/api/rates')
      .then((response) => {
        if (response.data && response.data.rates) {
          setRates(response.data.rates);
        } else {
          console.error('No rates found in the API response:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching rates', error);
      });
  };

  const handleAddRate = () => {
    APIRequest.post('/api/rates', {
      supplier_id: selectedSupplier,
      material_id: selectedMaterial,
      rate: rate,
    })
      .then(() => {
        console.log('Rate added successfully');
        setSelectedSupplier('');
        setSelectedMaterial('');
        setRate('');
        getRates();
      })
      .catch((error) => {
        console.error('Error adding rate', error);
      });
  };

  

  const handleDeleteRate = (rateId) => {
    if (window.confirm('Are you sure you want to delete this rate?')) {
      APIRequest.delete(`/api/rates/${rateId}`)
        .then(() => {
          getRates();
        })
        .catch((error) => {
          console.error('Error deleting rate', error);
        });
    }
  };

  const handleUpdateRate = () => {
    APIRequest.put(`/api/rates/${selectedRate.id}`, {
      supplier_id: editSelectedSupplier, // Use editSelectedSupplier
      material_id: editSelectedMaterial, // Use editSelectedMaterial
      rate: selectedRate.rate, // Use selectedRate.rate
    })
      .then(() => {
        setSelectedRate(null);
        setShowEditModal(false);
        getRates();
      })
      .catch((error) => {
        console.error('Error updating rate', error);
      });
  };
  

  return (
    <div className="container">
      <div className="rate-form">
        <h2>Add Rate</h2>
        <form>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Supplier:</label>
                <select
                  className="form-control"
                  value={selectedSupplier}
                  onChange={(e) => setSelectedSupplier(e.target.value)}
                >
                  <option value="">Select a supplier</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Material:</label>
                <select
                  className="form-control"
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                >
                  <option value="">Select a material</option>
                  {materials.map((material) => (
                    <option key={material.id} value={material.id}>
                      {material.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Rate:</label>
            <input
              type="text"
              className="form-control"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </div>
          <Button variant="primary" onClick={handleAddRate} className="m-3">
            Add Rate
          </Button>
        </form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Supplier</th>
              <th>Material</th>
              <th>Rate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rates.map((rate) => (
              <tr key={rate.id}>
                <td>{rate.supplier_name}</td>
                <td>{rate.material_name}</td>
                <td>{rate.rate}</td>
                <td>
                  <Button onClick={() => handleEditRate(rate)} variant="info">
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteRate(rate.id)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
   

      <Modal
      show={showEditModal}
      onHide={() => {
        setSelectedRate(null);
        setShowEditModal(false);
        setEditSelectedSupplier(''); // Reset the edit select fields
        setEditSelectedMaterial(''); // Reset the edit select fields
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Rate</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="form-group">
      <label>Supplier:</label>
      <select
        className="form-control"
        value={editSelectedSupplier}
        onChange={(e) => setEditSelectedSupplier(e.target.value)}
      >
        <option value="">Select a supplier</option>
        {suppliers.map((supplier) => (
          <option key={supplier.id} value={supplier.id}>
            {supplier.name}
          </option>
        ))}
      </select>
    </div>
    <div className="form-group">
      <label>Material:</label>
      <select
        className="form-control"
        value={editSelectedMaterial}
        onChange={(e) => setEditSelectedMaterial(e.target.value)}
      >
        <option value="">Select a material</option>
        {materials.map((material) => (
          <option key={material.id} value={material.id}>
            {material.name}
          </option>
        ))}
      </select>
    </div>
    
        <div className="form-group">
          <label>Rate:</label>
          <input
            type="text"
            className="form-control"
            value={selectedRate ? selectedRate.rate : ''}
            onChange={(e) =>
              setSelectedRate({
                ...selectedRate,
                rate: e.target.value,
              })
            }
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            setSelectedRate(null);
            setShowEditModal(false);
            setEditSelectedSupplier(''); // Reset the edit select fields
            setEditSelectedMaterial(''); // Reset the edit select fields
          }}
        >
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdateRate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
}

export default RateForm;
