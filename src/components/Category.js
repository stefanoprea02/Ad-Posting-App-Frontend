import React from "react";
import { Link } from "react-router-dom";
import { categoryDescriptionToName } from "../Functions";

export default function Category(props){
    return  <Link className="category" to={`/ads/filter`} state={{category: props.description}}>
                <img src={`data:image/jpeg;base64,${props.image}`} className="category-img"></img>
                <span>{categoryDescriptionToName(props.description)}</span>
            </Link>
}