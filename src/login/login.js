import React, { useState } from "react";
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Alert from "../asset/components/alert";

const Login = () => {
    const [userid, setuserId] = useState("");
    const [password, setPassword] = useState("");
    const [operationType, setOperationType] = useState('Error');
    const [operationMessage, setOperationMessage] = useState("unknown");
    const [showToast, setShowToast] = useState(false);


    const handleCloseToast = () => {
        setShowToast(false);
    };

    const onChangeuserId = (event) => {
        setuserId(event.target.value);
    }
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    }
    //login function
    const login = () => {
        const queryString = `?email=${userid}&password=${password}`
        const url = `https://bookbackend-nhwq.onrender.com/api/user/login${queryString}`;

        console.log(userid + " " + password);
        axios.get(url).then((response) => {
            const arr = response.data.message[0];
            const userName = `${arr.name.fisrt_name} ${arr.name.middle_name} ${arr.name.last_name}`;
            localStorage.setItem('userName', userName);
            localStorage.setItem('email', arr.email);
            localStorage.setItem('id', arr._id);
            localStorage.setItem('phone', arr.phone);
            setOperationType('success');
            setOperationMessage("");
            setShowToast(true);
            window.location.href = '/';
            // Reload the entire React app
            console.log(userName + " " + arr._id)
        }).catch((error) => {
            setOperationType('Error');
            setOperationMessage(error.response.data.message.toString());
            setShowToast(true);
            console.log(error);
        })
    }
    return (
        <>
            {showToast && <Alert type={operationType}
                description={operationMessage}
                duration={2500}
                onClose={handleCloseToast}
            ></Alert>}
            <div className="spinner-border m-5" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
                <div className=" h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div className="card rounded-3 text-black">
                                <div className="row g-0">
                                    <div className="col-lg-6">
                                        <div className="card-body p-md-5 mx-md-4">
                                            <div className="text-center">
                                                <img
                                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                                    style={{ width: '185px' }}
                                                    alt="logo"
                                                />
                                                <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                                            </div>
                                            <form>
                                                <div className="tst find">
                                                    <p>error</p>
                                                </div>
                                                <p>Please login to your account</p>
                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="email"
                                                        id="form2Example11"
                                                        className="form-control"
                                                        onChange={onChangeuserId}
                                                        placeholder="Phone number or email address"
                                                    />
                                                    <label className="form-label" htmlFor="form2Example11">
                                                        Username
                                                    </label>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <input type="password" id="form2Example22" className="form-control" onChange={onChangePassword} />
                                                    <label className="form-label" htmlFor="form2Example22">
                                                        Password
                                                    </label>
                                                </div>
                                                <div className="text-center pt-1 mb-5 pb-1">
                                                    <button
                                                        className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                                                        type="button"
                                                        onClick={login}
                                                    >
                                                        Log in
                                                    </button>
                                                    <a className="text-muted" href="#!">
                                                        Forgot password?
                                                    </a>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-center pb-4">
                                                    <p className="mb-0 me-2">Don't have an account?</p>
                                                    <button type="button" className="btn btn-outline-danger">
                                                        Create new
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                        <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                            <h4 className="mb-4">We are more than just a company</h4>
                                            <p className="small mb-0">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                                                ex ea commodo consequat.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login;