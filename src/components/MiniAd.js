import React from "react";

export default function MiniAd(props){
    return  <div className="ad-home">
                <img src={props.images[0]}></img>
                <p>{props.title}</p>
                <p>{props.price}</p>
            </div>
}