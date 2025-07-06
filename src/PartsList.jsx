// PartsList.jsx
import React, { useEffect, useState } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function PartsList() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5219/api/parts')
      .then(res => {
        setParts(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (partNumber) => {
    if (!window.confirm("Delete this part?")) return;
    axios.delete(`http://localhost:5219/api/parts/${partNumber}`)
      .then(() => setParts(parts.filter(p => p.partNumber !== partNumber)))
      .catch(err => alert("Failed to delete part."));
  };

  if (loading) return <Spinner animation="border" />;

  return (
    <>
      <h2>Parts Inventory</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Part Number</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Location</th>
            <th>Last Stock Take</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parts.map(part => (
            <tr key={part.partNumber}>
              <td>{part.partNumber}</td>
              <td>{part.description}</td>
              <td>{part.quantityOnHand}</td>
              <td>{part.locationCode}</td>
              <td>{new Date(part.lastStockTake).toLocaleDateString()}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  as={Link}
                  to={`/edit/${part.partNumber}`}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(part.partNumber)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}