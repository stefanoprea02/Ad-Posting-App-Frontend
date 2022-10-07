import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

export default function MiniAd(props){
    const [favorite, setFavorite] = React.useState(false);

    function adFavorite(){
        fetch("http://localhost:8080/adFavorite/" + props.id, {credentials: "include"})
        .then((response) => response.json())
        .then((data) => data);
        setFavorite(true)
    }

    function removeFavorite(){
        fetch("http://localhost:8080/removeFavorite/" + props.id, {credentials: "include"})
        .then((response) => response.json())
        .then((data) => data);
        setFavorite(false)
    }

    function checkFavorite(){
        fetch("http://localhost:8080/checkFavorite/" + props.id, {credentials: "include"})
        .then((response) => response.json())
        .then((data) => setFavorite(data));
    }

    React.useEffect(function(){
        checkFavorite();
    }, [])

    return  <div className="ad-home">
                <Link to={'/ad/' + props.id} style={{ textDecoration: 'none' }} key={props.id}>
                    <img src={props.images[0]} className="ad-home-img"></img>
                </Link>
                <p>{props.title}</p>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <p style={{fontSize: "12px"}}>{props.location} - {props.date}</p>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <p>{props.price}$</p>
                        {favorite === false && <button onClick={() => adFavorite()} className="faButton"><FontAwesomeIcon icon={farHeart} /></button>}
                        {favorite === true && <button onClick={() => removeFavorite()} className="faButton"><FontAwesomeIcon icon={faHeart} /></button>}
                    </div>
                </div>
            </div>
}