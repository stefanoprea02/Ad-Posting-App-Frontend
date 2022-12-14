import React from "react";
import { Link } from "react-router-dom";
import { categoryDescriptionToName } from "../Functions";

export default function SearchBar(props){

    const[options, setOptions] = React.useState({
        ad: [],
        username: [],
        category: []
    });
    const map = {username: "username", category: "description", ad: "title"};
    const [searching ,setSearching] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");

    function linkClick(x, y){
        if(window.location.href === "http://localhost:3000/ads/filter")
            props.childToParent(x, y);
        else if(window.location.href.includes("http://localhost:3000/ad/")){
            window.location.replace("http://localhost:3000/ad/" + y);
        }
    }

    let searchResults = [];
    for(let key of Object.keys(options)){
        if(options[key].length != 0){
            searchResults.push(options[key].map(obiect => {
                if(key === "ad")
                    return  <Link to={`/ad/${obiect[1]}`} className="search-result" key={obiect} onClick={() => linkClick([key], obiect[1])}>
                            <p>{categoryDescriptionToName(obiect[0])}</p>
                            <p>{key}</p>
                        </Link>
                else
                    return  <Link to="/ads/filter" state={{[key]: obiect}} className="search-result" key={obiect} onClick={() => linkClick([key], obiect)}>
                                <p>{categoryDescriptionToName(obiect)}</p>
                                <p>{key}</p>
                            </Link>
            }))
        }
    }

    window.addEventListener('click', (event) => {
        setSearching(false);
    });

    function handleChange(event){
        setSearching(true);
        setInputValue(event.target.value);
    }

    React.useEffect(function(){
        if(inputValue != ""){
            setOptions({
                ad: [],
                username: [],
                category: []
            })

            Object.keys(options).forEach(options_key => {
                fetch("http://localhost:8080/search/" + options_key + "/" + inputValue, {credentials: "include"})
                .then((response) => response.json())
                .then((data) => Object.keys(data).forEach(data_key => {setOptions(prevFormData => {
                    let username2;
                    if(options_key === "ad"){
                        username2 = [data[data_key][map[options_key]], data[data_key]["id"]];
                    }else{
                        username2 = data[data_key][map[options_key]];
                    }
                    return {
                        ...prevFormData,
                        [options_key]: [...prevFormData[options_key], username2]
                    }
                })}));
            });
        }
    }, [inputValue]);

    return  <div>
                <form className="search-bar">
                    <input type="text" className="search-bar-input" name="searchText" id="searchText" placeholder="What are you looking for ?"
                        value={inputValue.value} onChange={handleChange} />
                    <Link to="/ads/filter" state={{searchText: inputValue}} className="search-bar-submit" onClick={() => linkClick("searchText", inputValue)}>Submit</Link>
                </form>
                <div className="search-results">
                    {searching == true && searchResults}
                </div>
            </div>
}