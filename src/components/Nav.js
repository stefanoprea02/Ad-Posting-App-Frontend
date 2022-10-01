import React from "react";

export default function Nav(){
    return <nav className="navbar navbar-light navbar-expand-lg">
                <div className="container-fluid" style={{display: "flex", justifyContent: "space-between"}}>
                    <a className="navbar-brand" href="http://localhost:3000">Home</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{flexGrow: "0"}}>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link">Messages</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link">Favorites</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown link
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li><a className="dropdown-item" href="#">Posts</a></li>
                                    <li><a className="dropdown-item" href="#">Messages</a></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><a className="dropdown-item" href="#">Log out</a></li>
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