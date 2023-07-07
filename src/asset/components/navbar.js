import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../image/Logo Vibe.png';
import './navbar.css'
import person from '../image/person.svg'
import { Link } from 'react-router-dom';
import up from '../image/up.svg';

const Navbar = () => {
    const [style, setStyle] = useState("expand_logo");
    const [navbarWidth, setNavbarWidth] = useState('50px');
    const [id, setId] = useState(localStorage.getItem('id'));
    const [name, setName] = useState(localStorage.getItem('userName'));
    const [onLoginStyle, setOnLoginStyle] = useState({
        display: id ? 'flex' : 'none'
    });
    const [notLoginStyle, setNotLoginStyle] = useState({
        display: id ? 'none' : 'flex'
    });

    useEffect(() => {
        setId(localStorage.getItem('id'));
        setName(localStorage.getItem('userName'));
        setOnLoginStyle({ display: id ? 'flex' : 'none' });
        setNotLoginStyle({ display: id ? 'none' : 'flex' });
    }, []);

    const logout = () => {
        console.log("logout");
        localStorage.clear();
        setId("");
        setOnLoginStyle({ display: id ? 'flex' : 'none' });
        setNotLoginStyle({ display: id ? 'none' : 'flex' });
    }
    const collapseClick=()=>{
        if(navbarWidth=='260px')
            setNavbarWidth('50px');
        else
        setNavbarWidth('260px');
    }

    return (
        <div>
            <nav className='navItem' style={{ height: navbarWidth }}>
            <img src={up} onClick={collapseClick} alt="collapse Button" className='collapseBtn' />
                <div className='nav_bar'>
                    <img src={logo} style={{ height: '40px' }} alt='brandlogo' className='brandlogo' />
                    <div className='content'>
                        <ul className='nav_content'>
                            <li className='nav_item'>
                                <Link to="" className='item'>
                                    Home
                                </Link>
                            </li>
                            <li className='nav_item'>
                                <Link to="donate" className='item'>
                                    Donate book
                                </Link>
                            </li>
                            <li className='nav_item'>
                                <Link to="search" className='item'>
                                    Find Book
                                </Link>
                            </li>
                            <li className='nav_item'>
                                <Link to="contribution" className='item'>
                                    Your Contribution
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='userData'>
                    <div className='notlogin' style={notLoginStyle}>
                        <Link to="login">
                            <button type="button" className="loginBnt button">
                                Log in
                            </button>
                        </Link>
                        <Link to="register">
                            <button type="button" className="registerBnt button">
                                Register
                            </button>
                        </Link>
                    </div>
                    <div className='onLogin' style={onLoginStyle}>
                        <p>{name}</p>

                        <img src={person} alt="vibe Library" className="logo-img" />

                        <button type="button" className="button" onClick={logout}>
                            Log out
                        </button>
                    </div>

                </div>
            </nav>
        </div>
    )
};

export default Navbar;