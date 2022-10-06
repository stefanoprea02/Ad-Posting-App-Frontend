import React from "react";
import { Link } from "react-router-dom";

export default function MiniAd(props){
    return  <div className="ad-home">
                <Link to={'/ad/' + props.id} style={{ textDecoration: 'none' }} key={props.id}>
                    <img src={props.images[0]} className="ad-home-img"></img>
                </Link>
                <p>{props.title}</p>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <p style={{fontSize: "12px"}}>{props.location} - {props.date}</p>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <p>{props.price}$</p>
                        <p>Favorite</p>
                    </div>
                </div>
            </div>
}