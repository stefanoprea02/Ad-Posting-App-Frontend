import React from "react";
import { useLocation } from "react-router-dom";
import CategoryOption from "../components/CategoryOption";
import MiniAd from "../components/MiniAd";
import Nav from "../components/Nav";
import SearchBar from "../components/SearchBar";
import SmallAdSearch from "../components/SmallAdSearch";
import TextInput from "../components/TextInput";
import { getAdsFiltered, getCategories } from "../Functions";

export default function AdSearch(props){

    const [filteredAds, setFilteredAds] = React.useState({});
    let url = "http://localhost:8080/ads/filter/?";
    const location = useLocation();
    const {category} = location.state;
    const {username} = location.state;
    const {favorite} = location.state;
    const {searchText} = location.state;
    const [data, setData] = React.useState({
        category: category,
        favorite: favorite,
        username: username,
        searchText: searchText,
        negotiable : "",
        state: "",
        minPrice: "",
        maxPrice: "",
        sort: ""
    })
    const[categories, setCategories] = React.useState();

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

    function handleChange(event){
        setData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    React.useEffect(() => {
        if(data.favorite != null && data.favorite != ""){
            url = url + "favorite=" + data.favorite + "&";
        }
        if(data.category != null && data.category != ""){
            url = url + "category=" + data.category + "&";
        }
        if(data.username != null){
            url = url + "username=" + data.username + "&";
        }
        if(data.searchText != null){
            url = url + "searchText=" + data.searchText + "&";
        }
        if(data.negotiable != ""){
            url = url + "negotiable=" + data.negotiable + "&";
        }
        if(data.minPrice != ""){
            url = url + "minPrice=" + data.minPrice + "&";
        }
        if(data.maxPrice != ""){
            url = url + "maxPrice=" + data.maxPrice + "&";
        }
        if(data.state != ""){
            url = url + "state=" + data.state + "&";
        }
        if(url.charAt(url.length - 1) == "&"){
            url.slice(0, -1);
        }
        async function fetchData(){
            console.log(url);
            let ads = await getAdsFiltered(url);
            setFilteredAds(ads);
        }
        fetchData();
    }, [data]);

    React.useEffect(() => {
        async function fetchData(){
            let cate = await getCategories();
            setCategories(cate);
        }
        fetchData();
    },[]);

    let ads = [];
    if(filteredAds && Object.keys(filteredAds).length != 0){
        if(data.sort === "ascending"){
            let a = filteredAds.sort((a, b) => parseInt(a.price) - parseInt(b.price));
            console.log(a);
            console.log(filteredAds);
            if(filteredAds !== a) {
                console.log("da");
                setFilteredAds(a);
            }
        }
        else if(data.sort === "descending"){
            let a = filteredAds.sort((a, b) => parseInt(b.price) - parseInt(a.price));
            if(filteredAds != a) setFilteredAds(a);
        }
        ads = filteredAds.map(obiect => {
            return <SmallAdSearch 
                images={obiect.images}
                id={obiect.id}
                key={obiect.price}
                title={obiect.title}
                price={obiect.price}
                location={obiect.location}
                date={obiect.date}
                state={obiect.state}
                negotiable={obiect.negotiable}
            />
        });
    }

    let categoriesOptions = [];
    if(categories != null && Object.keys(categories).length != 0){
        categoriesOptions = categories.map(obiect => {
        return <CategoryOption 
            description={obiect.description}
            id={obiect.id}
            key={obiect.id}
            />
        })
    }
    
    return  filteredAds ? <div>
                <Nav childToParent={childToParent}/>
                <SearchBar childToParent={childToParent} />
                <div className="filters">
                    <div className="row">
                        <div className="categoryName col-md-3">
                            <label>Category</label>
                            <select className="form-select" id="category" name="category" style={{width: "100%"}}
                                value={data.category} onChange={handleChange}>
                                <option value="">-- Category --</option>
                                {categoriesOptions}
                            </select>
                        </div>
                        <div className="negotiable col-md-3">
                            <label>Negotiable</label>
                            <select className="form-select" id="negotiable" name="negotiable" style={{width: "100%"}}
                                value={data.negotiable} onChange={handleChange}>
                                <option value="">-- Negotiable --</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        <div className="state col-md-3">
                            <label>State</label>
                            <select className="form-select" id="state" name="state" style={{width: "100%"}}
                                value={data.state} onChange={handleChange}>
                                <option value="">-- State --</option>
                                <option value="Used">Used</option>
                                <option value="New">New</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="state col-md-3">
                            <label>Favorite</label>
                            <select className="form-select" id="favorite" name="favorite" style={{width: "100%"}}
                                value={data.favorite} onChange={handleChange}>
                                <option value="">-- Favorite --</option>
                                <option value={true}>True</option>
                                <option value={false}>False</option>
                            </select>
                        </div>
                        <div className="sort col-md-3">
                            <label>Sort By</label>
                            <select className="form-select" id="sort" name="sort" style={{width: "100%"}}
                                value={data.sort} onChange={handleChange}>
                                <option value="">-- Sorting --</option>
                                <option value="ascending">Price ascending</option>
                                <option value="descending">Price descending</option>
                            </select>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between"}} className="sort col-md-3">
                            <TextInput title="minPrice" value={data.minPrice} handleChange={handleChange} width={"48%"} />
                            <TextInput title="maxPrice" value={data.maxPrice} handleChange={handleChange} width={"48%"} />
                        </div>
                    </div>
                </div>
                <h2 style={{textAlign : "left", padding: "20px 0px 20px 0px", marginLeft: "15%"}}>We have found {Object.keys(filteredAds).length} ads for you.</h2>
                <div style={{marginBottom: "100px"}}>{ads}</div>
            </div> : <div>Loading</div>
}