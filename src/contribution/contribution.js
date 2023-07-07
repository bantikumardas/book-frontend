import { useEffect, useState } from "react";
import axios from "axios";
import BookComponent from "../asset/components/bookComponent";
import nullImage from '../asset/image/null.png'

const Contribution = () => {
    const [books, setBooks] = useState([]);
    const [isNull, setNull] = useState({
        display: 'none'
    });
    useEffect(() => {
        const id = localStorage.getItem('id');
        const url = `https://bookbackend-nhwq.onrender.com/api/user/contribution/${id}`;
        axios.get(url).then((response) => {
            console.log(response.data);
            setBooks(response.data);
            if (response.data.length == 0) {
                setNull({
                    display: 'flex'
                });
            } else {
                setNull({
                    display: 'none'
                });
            }
        }).catch((error) => {
            console.log(error)
        });
    }, []);
    return (
        <div>
            <div className="cardsClass">
                {
                    books.map((val) => {
                        return (
                            <BookComponent key={val._id} data={val} />
                        )
                    })
                }
                <div style={{ position: 'absolute', top: '50%', left: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={nullImage} style={isNull}></img>
                </div>
            </div>
        </div>
    )
}

export default Contribution;