import React from "react";

export default function Category(props){
    return  <a className="category">
                <img src={`data:image/jpeg;base64,${props.image}`} className="category-img"></img>
                <span>{props.description}</span>
            </a>
}