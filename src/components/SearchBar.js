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

    function handleSubmit(){}

    function linkClick(x, y){
        if(window.location.href == "http://localhost:3000/ads/filter")
            props.childToParent(x, y);
    }

    let searchResults = [];
    for(let key of Object.keys(options)){
        if(options[key].length != 0){
            searchResults.push(options[key].map(obiect => {
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
        setOptions({
            ad: [],
            username: [],
            category: []
        })

        const formData = new FormData(document.getElementsByTagName("form")[0]);

        Object.keys(options).forEach(options_key => {
            fetch("http://localhost:8080/search/" + options_key, {
            credentials: "include",
            headers: {
                'Accept': 'application/json'
            },
            method: "POST",
            body: formData
            })
            .then((response) => response.json())
            .then((data) => Object.keys(data).forEach(data_key => {setOptions(prevFormData => {
                let username2 = data[data_key][map[options_key]];
                return {
                    ...prevFormData,
                    [options_key]: [...prevFormData[options_key], username2]
                }
            })}));
        });
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