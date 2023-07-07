import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './donate.css';
import photo from '../asset/image/background.png';
import axios from 'axios';
import Alert from '../asset/components/alert';
import Spinner from "../asset/components/spinner";

const Donate = () => {
    /*-------------------------use state-------------------*/
    const [data, setData] = useState({
        bookName: '',
        authorName: '',
        publisherName: '',
        bookDescription: '',
        termChecked: false
    });
    const [catagory, setCatagory] = useState('N/A');
    const [selectedFile, setSelectedFile] = useState(null);
    const [progressPercent, setUploadProgress] = useState(0);
    const [pgContainer, setPgContainer] = useState({ display: 'none' });

    const [operationType, setOperationType] = useState('Error');
    const [operationMessage, setOperationMessage] = useState("unknown");
    const [showToast, setShowToast] = useState(false);
    const [showSpn, setShowSpn] = useState(false);
    /*---------xxxx--------------use state---------xxxxxxxxx----------*/
    /*-----------------onChange handle event-------------------------*/
    const handleCloseToast = () => {
        setShowToast(false);
    };
    const handleSelectChange = (event) => {
        setCatagory(event.target.value);
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleData = (event) => {
        const { name, value } = event.target;
        setData((prevFormData) => ({
            ...prevFormData,
            [name]: value

        }));
    };

    const handleTermBoxChange = (event) => {
        const { checked } = event.target;
        setData((prevFormData) => ({
            ...prevFormData,
            termChecked: checked
        }));
    };
    const handleReset = () => {
        setData({
            bookName: '',
            authorName: '',
            publisherName: '',
            bookDescription: '',
            termChecked: false
        });
    };
    function clearFields(event) {
        // we have to convert event.target to array
        // we use from method to convert event.target to array
        // after that we will use forEach function to go through every input to clear it
        Array.from(event.target).forEach((e) => (e.value = ""));
    }
    function submitFormHandler(event) {
        event.preventDefault();
        clearFields(event);
        handleReset();
    }

    /*-----------------onChange handle event-------------------------*/
    const handleSubmitBtn = (event) => {
        // event.preventDefault();
        const { bookName, authorName, publisherName, bookDescription, termChecked } = data;
        const id = localStorage.getItem('id');
        if (!id) alert('please login');
        const url = 'https://bookbackend-nhwq.onrender.com/api/file/upload';
        const formData = new FormData();
        formData.append('myfiles', selectedFile);
        formData.append('bookName', bookName);
        formData.append('autherName', authorName);
        formData.append('publisherName', publisherName);
        formData.append('bookDescription', bookDescription);
        formData.append('userId', id);
        formData.append('catagory', catagory);
        console.log(`${bookName} ${authorName} ${publisherName} ${bookDescription} ${termChecked}
         ${catagory} ${id}`);
        setShowSpn(true);
        axios.post(url, formData, {
            onUploadProgress: (progressEvent) => {
                const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                setPgContainer({ display: 'flex' });
                setUploadProgress(progress);
            },
        }).then((response) => {
            console.log(response.data);
            setOperationType('success');
            setOperationMessage("Uploaded successfully");
            setShowToast(true);
            setShowSpn(false);
            setPgContainer({ display: 'none' });
            handleReset();
        }).catch((err) => {
            console.log(err)
            setOperationType('Error');
            setOperationMessage(err.response.data.error.toString());
            setShowToast(true);
            setShowSpn(false);
            setPgContainer({ display: 'none' });
        })
        console.log(bookDescription);
    }


    return (
        <>
            {showToast && <Alert type={operationType}
                description={operationMessage}
                duration={2500}
                onClose={handleCloseToast}
            ></Alert>}
            {showSpn &&
                <Spinner ></Spinner>
            }
            <div className="container">
                <h2 style={{ textAlign: 'center', padding: '10px 0 10px 0', color: 'rgb(105, 210, 30)' }}>DONATE BOOKS</h2>
                <div className="card card-custom">
                    <img src={photo} alt="background" className="photo" />
                    <div className="card-body">
                        <form onSubmit={submitFormHandler}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="bookNameInput">Book Name</label>
                                    <input type="text" onChange={handleData} className="form-control" id="bookNameInput" name="bookName" placeholder="Book Name" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="authorNameInput">Author Name</label>
                                    <input type="text" onChange={handleData} className="form-control" id="authorNameInput" name="authorName" placeholder="Author Name" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="publisherNameInput">Publisher Name</label>
                                    <input type="text" onChange={handleData} className="form-control" id="publisherNameInput" name="publisherName" placeholder="Publisher Name" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="categoryInput">Category</label>
                                    <select onChange={handleSelectChange} className="form-control" id="categoryInput" name="category">
                                        <option value="N/A">Select Category</option>
                                        <option value="Arts & Music">Arts & Music</option>
                                        <option value="engineering">Engineering</option>
                                        <option value="law">Law</option>
                                        <option value="neet">Neet asprient</option>
                                        <option value="engineering_asprient">Engineering Asprient</option>
                                        <option value="Biographies">Biographies</option>
                                        <option value="Business">Business</option>
                                        <option value="Comics">Comics</option>
                                        <option value="Computer & Tech">Computers & Tech</option>
                                        <option value="Cooking">Cooking</option>
                                        <option value="Education & Reference">Education & Reference</option>
                                        <option value="Entertainment">Entertainment</option>
                                        <option value="Health & Fitness">Health & Fitness</option>
                                        <option value="History">History</option>
                                        <option value="Hobbies & Crafts">Hobbies & Crafts</option>
                                        <option value="Home & Garden">Home & Garden</option>
                                        <option value="Horror">Horror</option>
                                        <option value="Kids">Kids</option>
                                        <option value="Literature & Fiction">Literature & Fiction</option>
                                        <option value="Medical">Medical</option>
                                        <option value="Mystery">Mystery</option>
                                        <option value="Parenting">Parenting</option>
                                        <option value="Religion">Religion</option>
                                        <option value="Romance">Romance</option>
                                        <option value="Sci-Fi & Fantasy">Sci-Fi & Fantasy</option>
                                        <option value="Science & Maths">Science & Maths</option>
                                        <option value="Self-Help">Self-Help</option>
                                        <option value="Social Sciences">Social Sciences</option>
                                        <option value="Sports">Sports</option>
                                        <option value="Travel">Travel</option>
                                        <option value="True Crime">True Crime</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="fileInput">e-Book file (.pdf only)</label>
                                <input onChange={handleFileChange} type="file" className="form-control" id="fileInput" name="file" placeholder="1234 Main St" />
                                <div className="progress-container" style={pgContainer}>
                                    <div className="bg-progress"></div>
                                    <div className="inner-container">
                                        <div className="status">Uploading...</div>
                                        <div className="percent-container">
                                            <span className="percentage" id="progressPercent">{progressPercent}</span>%
                                        </div>
                                        <div className="progress-bar"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="bookDescriptionInput">Book Description</label>
                                <textarea onChange={handleData} className="form-control" id="bookDescriptionInput" name="bookDescription" placeholder="Data structure and algorithm using Java. It contains linked list, graph, and all DS algo..."></textarea>
                            </div>
                            <div className="form-group">
                                <div className="form-check">
                                    <input onChange={handleTermBoxChange} className="form-check-input" type="checkbox" id="termsCheck" />
                                    <label className="form-check-label" htmlFor="termsCheck">
                                        Agree to terms and conditions
                                    </label>
                                </div>
                            </div>
                            <button onClick={handleSubmitBtn} type="submit" className="btn btn-primary donateBtn">Donate</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Donate;
