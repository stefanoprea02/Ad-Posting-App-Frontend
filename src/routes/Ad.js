import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart, faTrashAlt, faChevronRight, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jwtDecode from "jwt-decode";
import React from "react";
import { Link, useNavigate, useParams, withRouter } from "react-router-dom";
import Nav from "../components/Nav";
import SearchBar from "../components/SearchBar";
import {adFavorite, removeFavorite, checkFavorite, getAd, getUser, getTime, getDate} from "../Functions";
import { useUser } from "../UserProvider";


export default function Ad(){

    const {id} = useParams();
    const navigate = useNavigate();
    const userContext = useUser();

    const [ad, setAd] = React.useState({});
    const [user, setUser] = React.useState({});
    const [fetched, setFetched] = React.useState(false);
    const [favorite, setFavorite] = React.useState(false);
    const [adBelongsToUser, setAdBelongsToUser] = React.useState(false);

    function deleteAd(){
        console.log(ad.id);
        fetch("http://localhost:8080/ads/delete/?adId=" + ad.id, {credentials: "include"})
        .then((response) => response.json())
        .then((data) => console.log(data));
        window.location.replace("http://localhost:3000");
    }

    React.useEffect(() => {
        async function fetchData(){
            if(ad && Object.keys(ad).length !== 0){
                let userData = await getUser(ad.username);
                setUser(userData);
                setFetched(true);
                if(ad.username === jwtDecode(userContext.jwt).sub){
                    setAdBelongsToUser(true);
                }
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
                    images.push(<div className="carousel-item active" key={images.length}>
                                <img src={image} className="d-block w-100 ad-img" alt="..." />
                            </div>)
                }else{
                    images.push(<div className="carousel-item" key={images.length}>
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
                                <p style={{fontSize: "14px"}}>Posted at {getDate(ad.date)}</p>
                                {favorite === false && 
                                    <div style={{display: "flex", alignItems: "start"}}>
                                        {adBelongsToUser && <button onClick={() => deleteAd()} className="faButton">
                                            <FontAwesomeIcon icon={faTrashAlt} className="icon" />
                                        </button>}
                                        {adBelongsToUser && <Link to="/ad/new" state={{ad: ad}} className="faButton">
                                            <FontAwesomeIcon icon={faEdit} className="icon" />
                                        </Link>}
                                        <button onClick={async () => { await adFavorite(id); setFavorite(true);}} className="faButton">
                                            <FontAwesomeIcon icon={farHeart} />
                                        </button>
                                    </div>
                                }
                                {favorite === true && 
                                    <div style={{display: "flex", alignItems: "start"}}>
                                        {adBelongsToUser && <button onClick={() => deleteAd()} className="faButton">
                                            <FontAwesomeIcon icon={faTrashAlt} className="icon" />
                                        </button>}
                                        {adBelongsToUser && <Link to="/ad/new" state={{ad: ad}} className="faButton">
                                            <FontAwesomeIcon icon={faEdit} className="icon" />
                                        </Link>}
                                        <button onClick={async () => { await removeFavorite(id); setFavorite(false);}} className="faButton">
                                            <FontAwesomeIcon icon={faHeart} />
                                        </button>
                                    </div>
                                }
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
                                <p className="display-linebreak">{ad.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="userDetails">
                            <h3>{user.username}</h3>
                            <p>Registered on {getDate(user.date)}</p>
                            <p>Last online on {getDate(user.lastOnline)} at {getTime(user.lastOnline)}</p>
                            <p>Phone number : {ad.phone_number}</p>
                            <p>Contact name : {ad.contact_info}</p>
                            <p style={{textAlign: "center", marginTop: "15px", fontSize: "17px"}}>
                                <Link to="/ads/filter" state={{username: user.username}}>More from this seller <FontAwesomeIcon icon={faChevronRight} style={{fontSize: "14px"}}/>
                                </Link>
                            </p>
                            {!adBelongsToUser &&
                            <p style={{textAlign: "center", marginTop: "10px", fontSize: "17px"}}>
                                <Link to="/messages" state={{conversation: user.username}}>Send a message <FontAwesomeIcon icon={faChevronRight} style={{fontSize: "14px"}}/>
                                </Link>
                            </p>}
                        </div>
                        <div className="location">
                            <h4>Location</h4>
                            <h3>{ad.location}</h3>
                        </div>
                    </div>
                </div>
            </div> : <div></div>
}