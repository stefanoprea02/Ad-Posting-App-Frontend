import React from "react";
import Category from '../components/Category';
import Nav from "../components/Nav";
import MiniAd from "../components/MiniAd";

export default function Home(){

    const[data, setData] = React.useState({});
    const[adData, setAdData] = React.useState({});

    async function getCategories(){
        fetch('http://localhost:8080/categories')
        .then((response) => response.json())
        .then((data) => {
            setData(data);
        });
    }

    async function getAds(){
        fetch('http://localhost:8080/ads')
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setAdData(data);
        });
    }

    React.useEffect(function(){
        getCategories();
        getAds();
    },[]);

    let categories = [];
    if(Object.keys(data).length != 0){
        categories = data.map(obiect => {
        return <Category 
            description={obiect.description}
            id={obiect.id}
            key={obiect.id}
            image={obiect.image}
        />
        })
    }

    let ads = [];
    if(Object.keys(adData).length != 0){
        console.log(adData);
        ads = adData.map(obiect => {
            return <MiniAd 
                images={obiect.images}
                id={obiect.id}
                key={obiect.id}
                title={obiect.title}
                price={obiect.price}
            />
        });
    }

    return  <div>
                <Nav />
                <div style={{backgroundColor : "white", marginTop : "20px"}}>
                    <h2 className="h2-title">Main Categories:</h2>
                    <div style={{paddingBottom : "20px"}}>
                        <div className="categories">
                            {categories}
                        </div>
                    </div>
                </div>
                <h2 className="h2-title">Ads:</h2>
                <div className="ads">
                    {ads}
                </div>
            </div>
}