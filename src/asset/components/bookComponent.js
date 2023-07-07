import React from "react";
import './bookComponent.css';
import tempImg from '../image/background.png';

const BookComponent = (props) => {
    /*--------------variable------------------------------- */
    const downloadHandler = () => {
        const link = document.createElement('a');
        // link.href = props.data.readLink;
        // link.download = props.data.name;
        // link.click();
        window.location.href = props.data.readLink;
    }

    return (
        <div>
            <div className="cards" >
                <div className="auther">
                    <h6>Book Name -</h6>
                    <p>{props.data.name}</p>
                </div>
                <div className="image">
                    <img src={tempImg}
                        alt="image" style={{
                            width: '200px',
                            height: '170px'
                        }}
                    />
                </div>
                <div className="header">
                    <div className="auther">
                        <h6>Auther Name -</h6>
                        <p>{props.data.autherName}</p>
                    </div>
                    <div className="auther">
                        <h6>Publisher Name -</h6>
                        <p>{props.data.publisherName}</p>
                    </div>
                    <div className="auther">
                        <h6>Book Catagory -</h6>
                        <p>{props.data.catagory}</p>
                    </div>
                    <div className="auther">
                        <h6>File size -</h6>
                        <p>{`${(props.data.size) / 1000} kb`}</p>
                    </div>
                    <div className="auther">
                        <button type="button" onClick={downloadHandler} className="downloadBtn">
                            Download
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default BookComponent;