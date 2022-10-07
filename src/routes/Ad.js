import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useParams, withRouter } from "react-router-dom";
import Nav from "../components/Nav";

export default function Ad(){

    const {id} = useParams();

    const [ad, setAd] = React.useState({});
    const [user, setUser] = React.useState({});
    const [fetched, setFetched] = React.useState(false);
    const [favorite, setFavorite] = React.useState(false);

    function adFavorite(){
        fetch("http://localhost:8080/adFavorite/" + id, {credentials: "include"})
        .then((response) => response.json())
        .then((data) => data);
        setFavorite(true)
    }

    function removeFavorite(){
        fetch("http://localhost:8080/removeFavorite/" + id, {credentials: "include"})
        .then((response) => response.json())
        .then((data) => data);
        setFavorite(false)
    }

    function checkFavorite(){
        fetch("http://localhost:8080/checkFavorite/" + id, {credentials: "include"})
        .then((response) => response.json())
        .then((data) => setFavorite(data));
    }

    function getAd(){
        fetch('http://localhost:8080/ad/' + id,{
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setAd(data);
            });
    }

    React.useEffect(function(){
        getAd();
        checkFavorite();
    }, []);

    React.useEffect(function(){
        if(Object.keys(ad).length !== 0){
            fetch('http://localhost:8080/user/' + ad.username,{
                credentials: 'include',
                method: 'GET'
            }).then((response) => response.json())
              .then((data) => {
                setUser(data);
                setFetched(true);
              })
        }
    },[ad]);

    return  fetched ? <div>
                <Nav />
                <div className="row justify-content-center ad">
                    <div className="col-md-6">
                        <div className="images">
                            <img className="ad-img" src={ad.images[0]}></img>
                        </div>
                        <div className="details">
                            <div className="details-top">
                                <p>Posted at {ad.date}</p>
                                {favorite === false && <button onClick={() => adFavorite()} className="faButton"><FontAwesomeIcon icon={farHeart} /></button>}
                                {favorite === true && <button onClick={() => removeFavorite()} className="faButton"><FontAwesomeIcon icon={faHeart} /></button>}
                            </div>
                            <div className="details-title">
                                <h3>{ad.title}</h3>
                            </div>
                            <div className="details-price">
                                <h4>{ad.price}$ </h4>
                                <p>Negotiable : {ad.negotiable.toString()}</p>
                            </div>
                            <div className="details-description">
                                <h3>Description</h3>
                                <p>{ad.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="userDetails">
                            <h3>{user.username}</h3>
                            <p>Registered on {user.date}</p>
                            <p>Last online on {user.lastOnline.split("T")[0]} at {user.lastOnline.split("T")[1].split(".")[0]}</p>
                            <p style={{textAlign: "center"}}><a>More from this seller</a></p>
                        </div>
                        <div className="location">
                            <h4>Location</h4>
                            <h3>{ad.location}</h3>
                        </div>
                    </div>
                </div>
            </div> : <div></div>
}