import React from "react";
import { useParams, withRouter } from "react-router-dom";
import Nav from "../components/Nav";

export default function Ad(){

    const {id} = useParams();

    const [data, setData] = React.useState({});
    const [fetched, setFetched] = React.useState("false");

    const jwt = localStorage.getItem("jwt");
    console.log(jwt);

    function getAd(){
        fetch('http://localhost:8080/ad/' + id,{
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                console.log(data);
                document.getElementsByTagName("img")[0].src=data.images[0];
                document.getElementsByTagName("h3")[0].innerHTML=data.contact_info;
            });
    }

    React.useEffect(function(){
        if(jwt != ""){
            getAd();
            setFetched("true");
        }
    }, [jwt]);

    return  <div>
                <Nav />
                <div className="ad">
                    <div className="ad-grid-images">
                        <img></img>
                    </div>
                    <div className="ad-grid-user">
                        <h3></h3>
                    </div>
                </div>
            </div>
}