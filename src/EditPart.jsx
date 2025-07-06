import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

export default function EditPart() {
  const { partNumber } = useParams();
  const [form, setForm] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5219/api/parts/${partNumber}`)
      .then(res => setForm(res.data))
      .catch(() => setError('Failed to fetch part.'));
  }, [partNumber]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5219/api/parts/${partNumber}`, form);
      navigate('/');
    } catch (err) {
        const details =
        err.response?.data?.message || JSON.stringify(err.response?.data) || "";
      setError("Failed to update part: " + details);
    }
  };

  if (!form) return <Spinner animation="border" />;

  return (
    <>
      <h2>Edit Part</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Quantity On Hand</Form.Label>
          <Form.Control
            type="number"
            name="quantityOnHand"
            value={form.quantityOnHand}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location Code</Form.Label>
          <Form.Control
            type="text"
            name="locationCode"
            value={form.locationCode}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </>
  );
}