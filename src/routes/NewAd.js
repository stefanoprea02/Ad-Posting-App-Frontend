import jwtDecode from "jwt-decode";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import CategoryOption from "../components/CategoryOption";
import Nav from "../components/Nav";
import TextInput from "../components/TextInput";
import { getCategories, judete } from "../Functions";
import camera4 from "../images/camera4.jpg";
import { useUser } from "../UserProvider";

export default function NewAd(){

    const[formData, setFormData] = React.useState({
        title: "",
        categoryName: "",
        price: "",
        negotiable: "Yes",
        state: "Used",
        description: "",
        location: "",
        contact_info: "",
        phone_number: "",
        images: ["","","","","","","",""]
    });

    const[errors, setErrors] = React.useState({
        title: [],
        categoryName: [],
        price: [],
        description: [],
        state: [],
        negotiable: [],
        location: [],
        contact_info: [],
        phone_number: []
    });

    const[submited, setSubmited] = React.useState(false);
    const[categories, setCategories] = React.useState({});
    const navigate = useNavigate();
    const user = useUser();

    function readFileDataAsBase64(f) {
        const file = f;
    
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
    
            reader.onload = (event) => {
                resolve(event.target.result);
            };
    
            reader.onerror = (err) => {
                reject(err);
            };
    
            reader.readAsDataURL(file);
        });
    }

    function handleChange(event, param){
        setFormData(prevFormData => {
            if(event.target.files && event.target.files[0]){
                let img = document.getElementById("image" + param);
                img.src = URL.createObjectURL(event.target.files[0]);
            }
            if(param){
                let a = ["", "", "", "", "", "", "", ""];
                for(let i = 0; i < formData.images.length;i ++){
                    if(i === param - 1){
                        readFileDataAsBase64(event.target.files[0]).then((result) => {a[i] = result});
                    }else{
                        a[i] = formData.images[i];
                    }
                }
                return{
                    ...prevFormData,
                    [event.target.name]: a
                }
            }
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    async function handleSubmit(){
        for(let i = 1; i <= 8; i++){
            const img = document.getElementById("imageFile" + i);
            if(formData.images[i-1] != null){
                img.type = "text";
                img.value = formData.images[i-1];
            }
        }

        const formData2 = new FormData(document.getElementById("form"));

        const response = await fetch('http://localhost:8080/ad/new', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData2
        }).then((response) => response.json())
          .then((data) => {
            setSubmited(true);
            setFormData((prevFormData) => {
                return {
                    ...prevFormData,
                    images: ["","","","","","","",""]
                }
            })
            if("error" in data){
                let keys = Object.keys(data["error"]);
                for(const key of keys){
                    let message = data["error"][key];
                    setErrors((prevFormData) => {
                        return {
                            ...prevFormData,
                            [key]: message
                        }
                    });
                }
                for(let i = 1; i <= 8; i++){
                    const img = document.getElementById("imageFile" + i);
                    if(formData.images[i-1] != null){
                        img.type = "file";
                    }
                }
                const pictures = document.getElementsByTagName("img");
                for(const picture of pictures){
                    picture.src = camera4;
                }
            }else{
                navigate(`/ad/${data["succes"]["id"]}`);
            }
          });

        const keys = Object.keys(errors);
        for(const key of keys){
            errors[key] = [];
        }
    }

    React.useEffect(() => {
        async function fetchData(){
            let cate = await getCategories();
            setCategories(cate);
        }
        fetchData();
    },[]);


    React.useEffect(function(){
        if(submited == true){
            let keys = Object.keys(errors);
            for(const key of keys){
                if(errors[key].length > 0){
                    if(!document.getElementById(key).classList.contains("is-invalid")){
                        let divWithError = document.getElementsByClassName(key)[0];
                        divWithError.classList.add("has-error");
                        let input = document.getElementById(key);
                        input.classList.add("is-invalid");
                        let errorMessageDiv = document.createElement("span");
                        errorMessageDiv.classList.add("invalid-feedback");
                        for(const message of errors[key]){
                            let errorMessage = document.createElement("p");
                            errorMessage.innerHTML = message;
                            errorMessageDiv.appendChild(errorMessage);
                        }
                        divWithError.appendChild(errorMessageDiv);
                    }  
                }else{
                    let input = document.getElementById(key);
                    if(input.classList.contains("is-invalid")){
                        input.classList.remove("is-invalid");
                    }
                    input.classList.add("is-valid");
                }
            }
        }
    },[errors]);

    let categoriesOptions = [];
    if(Object.keys(categories).length != 0){
        categoriesOptions = categories.map(obiect => {
        return <CategoryOption 
            description={obiect.description}
            id={obiect.id}
            key={obiect.id}
        />
        })
    }

    let images = [];
    for(let i = 1; i <= 8; i++){
        images[i] = <div className="addimage" key={i}>
                        <img src={camera4} className="file-image" id={"image" + i}/>
                        <input id={"imageFile" + i} name="images" type="file" className="file file-input" 
                            onChange={event => handleChange(event, i)}/>
                    </div>
    }

    let locations = [];
    for(let judet of judete.sort()){
        locations.push(<option value={judet}>{judet}</option>);
    }

    return  <div>
                <Nav />
                <h2 style={{textAlign : "left", padding: "30px 0px 20px 0px", marginLeft: "10%"}}>Publish new ad</h2>

                <form action="http://localhost:8080/ad/new" method="POST" encType="multipart/form-data" id="form" className="form" style={{marginBottom: "30px"}}>
                    <input type="hidden" id="username" name="username" value={jwtDecode(user.jwt).sub} />
                    <div className="panel">
                        <TextInput title="title" value={formData.title} handleChange={handleChange} width={"60%"}/>
                        <div className="categoryName">
                            <label>Category</label>
                            <select className="form-select" id="categoryName" name="categoryName" style={{width : "40%"}} 
                                onChange={handleChange} value={formData.categoryName}>
                                <option value="">-- Select Category --</option>
                                {categoriesOptions}
                            </select>
                        </div>
                    </div>

                    <div className="panel">
                        <TextInput title="price" value={formData.price} handleChange={handleChange} width={"40%"}/>
                        <div className="negotiable">
                            <label>Negotiable</label>
                            <select className="form-select" id="negotiable" name="negotiable" style={{width : "40%"}} 
                                onChange={handleChange} value={formData.negotiable}>
                                <option value="True">Yes</option>
                                <option value="False">No</option>
                            </select>
                        </div>
                        <div className="state">
                            <label>State</label>
                            <select className="form-select" id="state" name="state" style={{width : "40%"}} 
                                onChange={handleChange} value={formData.state}>
                                <option value="Used">Used</option>
                                <option value="New">New</option>
                            </select>
                        </div>
                    </div>

                    <div className="panel">
                        <label>Images</label>
                        <div style={{display : "flex", flexWrap : "wrap"}}>
                            {images}
                        </div>
                    </div>

                    <div className="panel">
                        <div className="description">
                            <label>Description</label>
                            <textarea type="text" className="form-control" id="description" name="description"
                                    rows="10" style={{width : "60%"}} onChange={handleChange} value={formData.description}></textarea>
                        </div>
                    </div>

                    <div className="panel">
                        <label>Location</label>
                        <select className="form-select" id="location" name="location" style={{width : "40%"}} 
                            onChange={handleChange} value={formData.state}>
                            {locations}
                        </select>
                    </div>

                    <div className="panel">
                        <h2>Contact Info</h2>
                        <TextInput title="contact_info" value={formData.contact_info} handleChange={handleChange} width={"40%"}/>
                        <TextInput title="phone_number" value={formData.phone_number} handleChange={handleChange} width={"40%"}/>
                    </div>

                    <div className="panel">
                        <input className="btn btn-primary" type="button" value="Submit" onClick={() => handleSubmit()}></input>
                    </div>

                </form>
            </div>
}