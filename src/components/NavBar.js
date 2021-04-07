import './NavBar.css';
import React from 'react'
import {Link} from "react-router-dom";
class NavBar extends React.Component{


    render() {
        return (
            <div className="navbac-container">
                <ul className="navbar">
                    <li className="nb-list-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="nb-list-item">
                        <Link to="/showroom">ShowRoom</Link>
                    </li>
                    <li className="nb-list-item"> 
                        <Link to="/about">About</Link>
                    </li>
                    <li className="nb-list-item"> 
                        <Link to="/login">Login</Link>
                    </li>
                    
                </ul>
            </div>
        );
            
    }
}

export default NavBar;