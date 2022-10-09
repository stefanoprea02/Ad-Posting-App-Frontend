import React from "react";
import { useLocation } from "react-router-dom";
import MiniAd from "../components/MiniAd";
import Nav from "../components/Nav";
import SearchBar from "../components/SearchBar";
import SmallAdSearch from "../components/SmallAdSearch";
import { getAdsFiltered } from "../Functions";

export default function AdSearch(props){

    const [filteredAds, setFilteredAds] = React.useState({});
    let url = "http://localhost:8080/ads/filter/?";
    const location = useLocation();
    const {category} = location.state;
    const {username} = location.state;
    const {favorite} = location.state;
    const [data, setData] = React.useState({
        category: category,
        favorite: favorite,
        username: username
    })

    const childToParent = (x, y) => {
        const keys = Object.keys(data);
        for(const key of keys){
            data[key] = null;
        }
        setData(prevFormData => {
            return {
                ...prevFormData,
                [x]: y
            }
        })
    }

    React.useEffect(() => {
        if(url.charAt(url.length - 1) !== "?"){
            url = url + "&";
        }
        if(data.favorite === true){
            url = url + "favorite=true"
        }
        if(data.category != null){
            url = url + "category=" + data.category;
        }
        if(data.username != null){
            url = url + "username=" + data.username;
        }
        async function fetchData(){
            let ads = await getAdsFiltered(url);
            setFilteredAds(ads);
        }
        fetchData();
    }, [data]);

    let ads = [];
    if(filteredAds && Object.keys(filteredAds).length != 0){
        ads = filteredAds.map(obiect => {
            return <SmallAdSearch 
                images={obiect.images}
                id={obiect.id}
                key={obiect.id}
                title={obiect.title}
                price={obiect.price}
                location={obiect.location}
                date={obiect.date}
                state={obiect.state}
                negotiable={obiect.negotiable}
            />
        });
    }
    
    return  filteredAds ? <div>
                <Nav childToParent={childToParent}/>
                <SearchBar />
                <h2 style={{textAlign : "left", padding: "20px 0px 20px 0px", marginLeft: "15%"}}>We have found {Object.keys(filteredAds).length} ads for you.</h2>
                {ads}
            </div> : <div>Loading</div>
}