import React from "react";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { adFavorite, checkFavorite, removeFavorite } from "../Functions";
import { Link } from "react-router-dom";

export default function SmallAdSearch(props){
    const [favorite, setFavorite] = React.useState(false);

    React.useEffect(() => {
        async function fetchData(){
            const favorite = await checkFavorite(props.id);
            setFavorite(favorite);
        }
        fetchData();
    }, []);

    return  <div className="small-ad-search">
                <Link to={'/ad/' + props.id} style={{ textDecoration: 'none' }} key={props.id}>
                    <img src={props.images[0]} className="ad-home-img"></img>
                </Link>
                <div className="small-ad-search-right-side">
                    <div className="small-ad-search-top-side">
                        <p>{props.title}</p>
                        <p>{props.price}$</p>
                    </div>
                    <div className="small-ad-search-middle">
                        <p>{props.state}</p>
                        {props.negotiable === true && <p>Price is negotiable</p>}
                    </div>
                    <div className="small-ad-search-bottom-side">
                        <p style={{fontSize: "12px"}}>{props.location} - {props.date}</p>
                        {favorite === false && <button onClick={async () => { await adFavorite(props.id); setFavorite(true);}} 
                            className="faButton"><FontAwesomeIcon icon={farHeart} /></button>}
                        {favorite === true && <button onClick={async () => { await removeFavorite(props.id); setFavorite(false);}} 
                            className="faButton"><FontAwesomeIcon icon={faHeart} /></button>}
                    </div>
                </div>
            </div>
}