import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../UserProvider";

export default function Nav(props){

    const navigate = useNavigate();
    const user = useUser();

    function logout(){
        fetch("http://localhost:8080/api/auth/logout", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.jwt}`
            }
        });
        Cookies.set("jwt", null);
        user.setJwt(null);
        navigate("/login");
    }

    function linkClick(x, y){
        if(window.location.href == "http://localhost:3000/ads/filter")
            props.childToParent(x, y);
    }

    return <nav className="navbar navbar-light navbar-expand-lg">
                <div className="container-fluid" style={{display: "flex", justifyContent: "space-between"}}>
                    <a className="navbar-brand" href="http://localhost:3000">Home</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{flexGrow: "0"}}>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/ads/filter" state={{favorite: true}} className="nav-link" onClick={() => linkClick("favorite", true)}>Favorites</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" 
                                data-bs-toggle="dropdown" aria-expanded="false">
                                    {jwtDecode(user.jwt).sub}
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <Link to="/ads/filter" state={{username: jwtDecode(user.jwt).sub}} className="dropdown-item" onClick={() => linkClick("username", jwtDecode(user.jwt).sub)}>My Posts</Link>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><a className="dropdown-item" onClick={() => logout()}>Log out</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="http://localhost:3000/ad/new">New post</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
}