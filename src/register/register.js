import React, { useState } from "react";
import './register.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from "../asset/components/alert";

const Register = () => {
  const [redirect, setRedirect] = useState(false);
  const [operationType, setOperationType] = useState('Error');
  const [operationMessage, setOperationMessage] = useState("unknown");
  const [showToast, setShowToast] = useState(false);


  const handleCloseToast = () => {
    setShowToast(false);
  };

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    repeat: "",
    termChecked: false
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setShowToast(false);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleTermBoxChange = (event) => {
    const { checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      termChecked: checked
    }));
  };

  const navigate = useNavigate();

  if (redirect) {
    navigate('/login');
  }

  const handleRegistration = () => {
    const {
      firstName,
      middleName,
      lastName,
      email,
      phone,
      password,
      repeat,
      termChecked
    } = formData;

    const url = `https://bookbackend-nhwq.onrender.com/api/user/registration`;

    if (password !== repeat) {
      setOperationType('Error');
      setOperationMessage("Password not match");
      setShowToast(true);
      return;
    }

    if (!termChecked) {
      setOperationType('Suggestion');
      setOperationMessage("Termbox is unchecked");
      setShowToast(true);
      return;
    }

    axios.post(url, {
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      email: email,
      password: password,
      phone: phone
    })
      .then(function (response) {
        console.log(response.data);
        console.log("done");
        setRedirect(true);
      })
      .catch(function (error) {
        console.log(error.response.data.error);
        console.log("error");
        setOperationType('Error');
        setOperationMessage(error.response.data.error);
        setShowToast(true);
      });
  };

  return (
    <>
      {showToast && <Alert type={operationType}
        description={operationMessage}
        duration={2500}
        onClose={handleCloseToast}
      ></Alert>}
      <section className="vh-100" style={{ backgroundColor: '#eee' }}>
        <div className="h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: '25px' }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mx-1 mx-md-4 mt-4">Sign up</p>
                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center name">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="form3Example1c"
                              className="form-control"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                            />
                            <label className="form-label" htmlFor="form3Example1c">First Name</label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center name">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="form3Example1c"
                              className="form-control"
                              name="middleName"
                              value={formData.middleName}
                              onChange={handleInputChange}
                            />
                            <label className="form-label" htmlFor="form3Example1c">Middle Name</label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center name">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="form3Example1c"
                              className="form-control"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                            />
                            <label className="form-label" htmlFor="form3Example1c">Last Name</label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="form3Example3c"
                              className="form-control"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                            />
                            <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="phone"
                              id="form3Example4c"
                              className="form-control"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                            />
                            <label className="form-label" htmlFor="form3Example4c">Phone</label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="form3Example4c"
                              className="form-control"
                              name="password"
                              value={formData.password}
                              onChange={handleInputChange}
                            />
                            <label className="form-label" htmlFor="form3Example4c">Password</label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="form3Example4cd"
                              className="form-control"
                              name="repeat"
                              value={formData.repeat}
                              onChange={handleInputChange}
                            />
                            <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                          </div>
                        </div>
                        <div className="form-check d-flex justify-content-center mb-1">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            id="form2Example3c"
                            name="termChecked"
                            checked={formData.termChecked}
                            onChange={handleTermBoxChange}
                          />
                          <label className="form-check-label" htmlFor="form2Example3">
                            I agree to all statements in <a href="#!">Terms of service</a>
                          </label>
                        </div>
                        <div className="d-flex justify-content-center mb-1 mb-lg-4">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            onClick={handleRegistration}
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>

  );
};

export default Register;
