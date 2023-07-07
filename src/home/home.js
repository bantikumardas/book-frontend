import React from 'react';
import background from '../asset/image/background.png'
import './home.css'

const Home = () => {
    return (
        <>
            <div>
                <img src={background} alt="backgrond" className="backgrond" />
                <h1>Well come to eBook Library</h1>
                <h3>Some Famous quotes about books and libraries</h3>
                <ul>
                    <li>"I have always imagined that Paradise will be a kind of a Library."</li>
                    <li>"Nothing is pleasanter than exploring a library."</li>
                    <li>"The only thing that you absolutely have to know, is the location of the library."</li>
                    <li>"When in doubt go to the library."</li>
                </ul>
            </div>
        </>

    )
};

export default Home;