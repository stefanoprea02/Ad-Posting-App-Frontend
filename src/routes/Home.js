import React from "react";
import Category from '../components/Category';
import Nav from "../components/Nav";
import MiniAd from "../components/MiniAd";
import { useUser } from "../UserProvider";
import { getAds, getCategories } from "../Functions";
import SearchBar from "../components/SearchBar";

export default function Home(){

    const[categoryData, setCategoryData] = React.useState({});
    const[adData, setAdData] = React.useState({});
    
    const user = useUser();

    React.useEffect(() => {
        async function fetchData(){
            let cate = await getCategories();
            let ad = await getAds();
            setCategoryData(cate);
            setAdData(ad);
        }
        fetchData();
    },[]);

    let categories = [];
    if(categoryData && Object.keys(categoryData).length != 0){
        categories = categoryData.map(obiect => {
        return <Category 
            description={obiect.description}
            id={obiect.id}
            key={obiect.id}
            image={obiect.image}
        />
        })
    }

    let ads = [];
    if(adData && Object.keys(adData).length != 0){
        ads = adData.map(obiect => {
            return <MiniAd 
                images={obiect.images}
                id={obiect.id}
                key={obiect.id}
                title={obiect.title}
                price={obiect.price}
                location={obiect.location}
                date={obiect.date}
            />
        });
    }

    return  <div>
                <Nav />
                <SearchBar />
                <div style={{backgroundColor : "white", marginTop : "30px"}}>
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