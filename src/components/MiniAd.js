import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import {adFavorite, removeFavorite, checkFavorite} from "../Functions";

export default function MiniAd(props){
    const [favorite, setFavorite] = React.useState(false);

    React.useEffect(() => {
        async function fetchData(){
            const favorite = await checkFavorite(props.id);
            setFavorite(favorite);
        }
        fetchData();
    }, []);

    return  <div className="ad-home">
                <Link to={'/ad/' + props.id} style={{ textDecoration: 'none' }} key={props.id}>
                    <img src={props.images[0]} className="ad-home-img"></img>
                </Link>
                <p>{props.title}</p>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <p style={{fontSize: "12px"}}>{props.location} - {`${props.date[0]}.${props.date[1]}.${props.date[2]}`}</p>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <p>{props.price}$</p>
                        {favorite === false && <button onClick={async () => { await adFavorite(props.id); setFavorite(true);}} 
                            className="faButton"><FontAwesomeIcon icon={farHeart} /></button>}
                        {favorite === true && <button onClick={async () => { await removeFavorite(props.id); setFavorite(false);}} 
                            className="faButton"><FontAwesomeIcon icon={faHeart} /></button>}
                    </div>
                </div>
            </div>
}