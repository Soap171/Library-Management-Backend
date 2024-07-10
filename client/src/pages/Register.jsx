import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form data:", formData);
  };

  return (
    <section className="text-center">
      <div
        className="p-5 bg-image"
        style={{
          backgroundImage:
            "url('https://mdbootstrap.com/img/new/textures/full/171.jpg')",
          height: "300px",
        }}
      ></div>

      <div
        className="card mx-4 mx-md-5 shadow-5-strong bg-body-tertiary"
        style={{
          marginTop: "-100px",
          backdropFilter: "blur(30px)",
        }}
      >
        <div className="card-body py-5 px-md-5">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8">
              <h2 className="fw-bold mb-5">Sign up now</h2>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="form-control"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                      <label className="form-label" htmlFor="firstName">
                        First name
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="form-control"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                      <label className="form-label" htmlFor="lastName">
                        Last name
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    className="form-control"
                    value={formData.userName}
                    onChange={handleChange}
                  />
                  <label className="form-label" htmlFor="userName">
                    Username
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <label className="form-label" htmlFor="email">
                    Email address
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="form-control"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                  <label className="form-label" htmlFor="phoneNumber">
                    Phone number
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="form-control"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  <label className="form-label" htmlFor="address">
                    Address
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4"
                >
                  Sign up
                </button>

                <div className="text-center">
                  <p>or sign up with:</p>
                  <button
                    type="button"
                    className="btn btn-link btn-floating mx-1"
                  >
                    <FontAwesomeIcon icon={faGoogle} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
