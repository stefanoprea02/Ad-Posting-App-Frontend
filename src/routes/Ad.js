import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useParams, withRouter } from "react-router-dom";
import Nav from "../components/Nav";
import SearchBar from "../components/SearchBar";
import {adFavorite, removeFavorite, checkFavorite, getAd, getUser} from "../Functions";


export default function Ad(){

    const {id} = useParams();

    const [ad, setAd] = React.useState({});
    const [user, setUser] = React.useState({});
    const [fetched, setFetched] = React.useState(false);
    const [favorite, setFavorite] = React.useState(false);

    React.useEffect(() => {
        async function fetchData(){
            if(ad && Object.keys(ad).length !== 0){
                let userData = await getUser(ad.username);
                setUser(userData);
                setFetched(true);
            }
        }
        fetchData();
    },[ad]);

    React.useEffect(() => {
        async function fetchData(){
            const ad = await getAd(id);
            const favorite = await checkFavorite(id);
            setAd(ad);
            setFavorite(favorite);
        }
        fetchData();
    }, []);

    let images = [];
    if(ad.images){
        for(let image of ad.images){
            if(image !== ""){
                if(image === ad.images[0]){
                    images.push(<div className="carousel-item active">
                                <img src={image} className="d-block w-100 ad-img" alt="..." />
                            </div>)
                }else{
                    images.push(<div className="carousel-item">
                                    <img src={image} className="d-block w-100 ad-img" alt="..." />
                                </div>)
                }
            }
        }
    }

    return  fetched ? <div>
                <Nav />
                <SearchBar />
                <div className="row justify-content-center ad">
                    <div className="col-md-6">
                        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                {images}
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                        <div className="details">
                            <div className="details-top">
                                <p style={{fontSize: "14px"}}>Posted at {ad.date}</p>
                                {favorite === false && <button onClick={async () => { await adFavorite(id); setFavorite(true);}} 
                                    className="faButton"><FontAwesomeIcon icon={farHeart} /></button>}
                                {favorite === true && <button onClick={async () => { await removeFavorite(id); setFavorite(false);}} 
                                    className="faButton"><FontAwesomeIcon icon={faHeart} /></button>}
                            </div>
                            <div className="details-title">
                                <p style={{fontSize: "26px"}}>{ad.title}</p>
                            </div>
                            <div className="details-price">
                                <p style={{fontWeight: "600", fontSize: "26px"}}>{ad.price}$ </p>
                                <p>Negotiable : {ad.negotiable.toString()}</p>
                            </div>
                            <div className="details-description" style={{marginTop: "20px"}}>
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
                            <p style={{textAlign: "center", marginTop: "15px", fontSize: "17px"}}><Link to="/ads/filter" state={{username: user.username}}>More from this seller</Link></p>
                        </div>
                        <div className="location">
                            <h4>Location</h4>
                            <h3>{ad.location}</h3>
                        </div>
                    </div>
                </div>
            </div> : <div></div>
}