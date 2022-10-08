import React from "react";

export default function TextInput(props){
    let labelText = props.title.charAt(0).toUpperCase() + props.title.slice(1);
    if(labelText.includes("_")){
        labelText = labelText.replace("_", " ");
        if(labelText === "Contact info"){
            labelText = "Contact name";
        }
    }
    return  <div className={props.title}>
                <label className="form-label">{labelText}</label>
                <input type="text" className="form-control" name={props.title} id={props.title} style={{width : props.width}} 
                    onChange={props.handleChange} value={props.value}/>
            </div>
}