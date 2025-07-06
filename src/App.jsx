import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PartsList from './PartsList';
import AddPart from './AddPart';
import EditPart from './EditPart';

export default function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Parts Tracker</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/add">Add Part</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<PartsList />} />
          <Route path="/add" element={<AddPart />} />
          <Route path="/edit/:partNumber" element={<EditPart />} />
        </Routes>
      </Container>
    </Router>
  );
}
