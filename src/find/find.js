import React, { useState } from "react";
import './find.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import BookComponent from "../asset/components/bookComponent";
import nullImage from '../asset/image/null.png'
import Spinner from "../asset/components/spinner";

const Find = () => {
    /*------------------useState--------------*/
    const [query, setQuery] = useState("");
    const [catagory, setCatagory] = useState('all');
    const [bookData, setData] = useState([]);
    const [isNull, setNull] = useState({
        display: 'none'
    });
    const [opacityOfpage, setOpacity]=useState('1');
    const [showSpn, setShowSpn]=useState(false);
    /*-----------xxxxxx-----useState------x-xxxxxx- */
    /*----------------------SetHandler---------------- */

    const onChangeHandlerForQuery = (event) => {
        setQuery(event.target.value)
    }
    const onChangeHandlerForCatagory = (event) => {
        setCatagory(event.target.value)
    }
    const searchHandler = () => {
        const baseUrl = 'http://localhost:3000/api/file/seacrh';
        const url = `${baseUrl}?nameTag=${query}&catagoryTag=${catagory}`;
        setOpacity('0.5');
        setShowSpn(true);
        axios.get(url).then((response) => {
            setData(response.data);
            if (response.data.length == 0) {
                setNull({
                    display: 'flex'
                });
            } else {
                setNull({
                    display: 'none'
                });
            }
            setOpacity('1');
            setShowSpn(false);
            console.log(bookData);
        }).catch((err) => {
            console.log(err);
            setShowSpn(false);
            setOpacity('1');
        })
    }

    /*--------------xxx-----SetHandler------xxxx------- */
    return (
        <>
            { showSpn &&
                <Spinner ></Spinner>
            }
            <div style={{opacity: {opacityOfpage}}}>
                <div className="searchBar" >
                    <div className="input-group srh ">
                        <input onChange={onChangeHandlerForQuery} type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                        <button onClick={searchHandler} type="button" className="btn btn-outline-primary">search</button>
                    </div>
                    <div className="form-group col-md-4">
                        <select onChange={onChangeHandlerForCatagory} className="form-control catagory" id="inputEmail4">
                            <option value="all">All Catagory</option>
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
                <div className="cardsClass">
                    {
                        bookData.map((val) => {
                            return (
                                <BookComponent key={val._id} data={val} />
                            )
                        })
                    }
                    <div style={{ position: 'absolute', top: '30%', left: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={nullImage} style={isNull}></img>
                    </div>
                </div>
            </div>

        </>

    )
};
export default Find;