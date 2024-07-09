import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary "
        Navbar
        bg="dark"
        data-bs-theme="dark"
      >
        <Container fluid>
          <Navbar.Brand>LM Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/about" className="nav-link">
                  About
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/contact" className="nav-link">
                  Contact
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/books" className="nav-link">
                  Books
                </Link>
              </Nav.Link>
              <NavDropdown
                title="Admin"
                id="navbarScrollingDropdown"
                className="nav-link"
              >
                <NavDropdown.Item href="#action3">Books</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Publishers</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Reservations
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            <Navbar.Text className="ms-4">
              Signed in as: <a href="#login">Mark Otto</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
