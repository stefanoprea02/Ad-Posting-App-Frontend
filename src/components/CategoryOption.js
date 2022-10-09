import React from "react";
import { categoryDescriptionToName } from "../Functions";

export default function CategoryOption(props){
    return  <option value={props.description}>{categoryDescriptionToName(props.description)}</option>
}