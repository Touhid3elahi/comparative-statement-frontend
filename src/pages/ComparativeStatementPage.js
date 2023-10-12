import React, { useState, useEffect } from 'react';
import APIRequest from '../services/api';
import './ComparativeStatementComparison.css'; // Import your CSS file for styling

function ComparativeStatementComparison() {
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [comparisonResults, setComparisonResults] = useState([]);
  const [materials, setMaterials] = useState([]); // Add materials state
  const [suppliers, setSuppliers] = useState([]); // Add suppliers state

  const getMaterials = () => {
    APIRequest.get('/api/materials')
      .then((response) => {
        setMaterials(response.data); // Update the materials state
      })
      .catch((error) => {
        console.error('Error fetching materials', error);
      });
  };

  const getSuppliers = () => {
    APIRequest.get('/api/suppliers')
      .then((response) => {
        setSuppliers(response.data); // Update the suppliers state
      })
      .catch((error) => {
        console.error('Error fetching suppliers', error);
      });
  };

  useEffect(() => {
    getMaterials();
    getSuppliers();
  }, []);

  const handleMaterialChange = (materialId) => {
    const updatedSelectedMaterials = [...selectedMaterials];
    if (updatedSelectedMaterials.includes(materialId)) {
      updatedSelectedMaterials.splice(updatedSelectedMaterials.indexOf(materialId), 1);
    } else {
      updatedSelectedMaterials.push(materialId);
    }
    setSelectedMaterials(updatedSelectedMaterials);
  };

  const handleSupplierChange = (supplierId) => {
    const updatedSelectedSuppliers = [...selectedSuppliers];
    if (updatedSelectedSuppliers.includes(supplierId)) {
      updatedSelectedSuppliers.splice(updatedSelectedSuppliers.indexOf(supplierId), 1);
    } else {
      updatedSelectedSuppliers.push(supplierId);
    }
    setSelectedSuppliers(updatedSelectedSuppliers);
  };

  const compareStatements = () => {
    APIRequest.post('/api/compare', {
      selected_materials: selectedMaterials,
      selected_suppliers: selectedSuppliers,
    })
      .then((response) => {
        if (response.status === 200) {
          setComparisonResults(response.data);
        } else {
          console.error('Error comparing statements');
        }
      })
      .catch((error) => {
        console.error('Error comparing statements', error);
      });
  };

  return (
    <div className="comparative-statement-comparison">
      <h1>Comparative Statement Comparison</h1>
      <div className="selection-container">
        <div>
          <h2>Select Materials</h2>
          {materials.map((material) => (
            <label key={material.id}>
              <input
                type="checkbox"
                value={material.id}
                checked={selectedMaterials.includes(material.id)}
                onChange={() => handleMaterialChange(material.id)}
              />
              {material.name}
            </label>
          ))}
        </div>
        <div>
          <h2>Select Suppliers</h2>
          {suppliers.map((supplier) => (
            <label key={supplier.id}>
              <input
                type="checkbox"
                value={supplier.id}
                checked={selectedSuppliers.includes(supplier.id)}
                onChange={() => handleSupplierChange(supplier.id)}
              />
              {supplier.name}
            </label>
          ))}
        </div>
      </div>
      <button className="compare-button" onClick={compareStatements}>
        Compare Statements
      </button>
      <div className="results-container">
        <h2>Comparison Results</h2>
        <ul>
          {comparisonResults.map((result) => (
            <li key={result.material.id}>
              <h3>Material: {result.material.name}</h3>
              {result.lowest_rate ? ( // Check if lowest_rate exists
                <p>Lowest Rate: {result.lowest_rate.rate}</p>
              ) : (
                <p>No rate found for selected suppliers</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ComparativeStatementComparison;
