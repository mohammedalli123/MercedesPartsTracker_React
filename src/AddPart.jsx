import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddPart() {
  const [form, setForm] = useState({
    partNumber: "",
    description: "",
    quantityOnHand: 0,
    locationCode: "",
    lastStockTake: new Date().toISOString(),
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5219/api/parts", form);
      navigate("/");
    } catch (err) {
      const details =
        err.response?.data?.message || JSON.stringify(err.response?.data) || "";
      setError("Failed to add part: " + details);
    }
  };

  return (
    <>
      <h2>Add New Part</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Part Number</Form.Label>
          <Form.Control
            type="text"
            name="partNumber"
            value={form.partNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>

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
          Save
        </Button>
      </Form>
    </>
  );
}
