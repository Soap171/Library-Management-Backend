import React from "react";
import Logo from "../images/logo.svg";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const role = "admin";
  const location = useLocation().pathname;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={Logo} width="36" alt="Logo" />
        </Link>
        <div className="d-flex align-items-center d-lg-none">
          <li className="nav-item dropdown me-2">
            <a
              className="avatar"
              href="#"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img src="/images/avatar/1.jpg" alt="Avatar" />
              <span className="avatar-badge border bg-red-300 p-1"></span>
            </a>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Logout
                </a>
              </li>
            </ul>
          </li>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarExample"
            aria-controls="navbarExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="collapse navbar-collapse" id="navbarExample">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${location === "/" ? "active" : ""}`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location === "/books" ? "active" : ""}`}
                to="/books"
              >
                Books
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location === "/about" ? "active" : ""}`}
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location === "/contact" ? "active" : ""
                }`}
                to="/contact"
              >
                Contact
              </Link>
            </li>

            {role === "admin" && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Admin
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="#">
                      Manage Books
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Publishers
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Reservations
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Contact Developers
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>
          <div className="d-flex align-items-center flex-column flex-lg-row">
            {location === "/books" && (
              <form className="me-2 mb-2 mb-lg-0">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Search"
                />
              </form>
            )}
            <li className="nav-item dropdown me-3 d-none d-lg-block">
              <a
                className="avatar"
                href="#"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src="/images/avatar/1.jpg" alt="Avatar" />
                <span className="avatar-badge border bg-red-300 p-1"></span>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Logout
                  </a>
                </li>
              </ul>
            </li>
            <Link className="btn btn-primary d-none d-lg-block" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
