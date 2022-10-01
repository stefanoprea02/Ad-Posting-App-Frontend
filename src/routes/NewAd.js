import React from "react";
import CategoryOption from "../components/CategoryOption";
import Nav from "../components/Nav";
import camera4 from "../images/camera4.jpg";

export default function NewAd(){

    const[formData, setFormData] = React.useState({
        title: "",
        categoryId: "",
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
        categoryId: [],
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
                console.log(data["error"]);
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
                console.log("DADA");
            }
          });

        const keys = Object.keys(errors);
        for(const key of keys){
            errors[key] = [];
        }
    }
    
    async function getCategories(){
        fetch('http://localhost:8080/categories')
        .then((response) => response.json())
        .then((data) => {
            setCategories(data);
        })
    }

    React.useEffect(function(){
        getCategories();
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

    return  <div>
                <Nav />
                <h2 style={{textAlign : "left", padding: "30px 0px 20px 0px", marginLeft: "10%"}}>Publish new ad</h2>

                <form action="http://localhost:8080/ad/new" method="POST" encType="multipart/form-data" id="form">
                    <input type="hidden" name="id" id="id"/>
                    <div className="panel">
                        <div className="title">
                            <label className="form-label">Ad Title</label>
                            <input type="text" className="form-control" name="title" id="title" style={{width : "60%"}} onChange={handleChange} value={formData.title}/>
                        </div>
                        <div className="categoryId">
                            <label>Category</label>
                            <select className="form-select" id="categoryId" name="categoryId" style={{width : "40%"}} onChange={handleChange} value={formData.categoryId}>
                                <option value="">-- Select Category --</option>
                                {categoriesOptions}
                            </select>
                        </div>
                    </div>

                    <div className="panel">
                        <div className="price">
                            <label>Price</label>
                            <input type="text" className="form-control" id="price" name="price" style={{width : "40%"}} onChange={handleChange} value={formData.price}/>
                        </div>
                        <div className="negotiable">
                            <label>Negotiable</label>
                            <select className="form-select" id="negotiable" name="negotiable" style={{width : "40%"}} onChange={handleChange} value={formData.negotiable}>
                                <option value="True">Yes</option>
                                <option value="False">No</option>
                            </select>
                        </div>
                        <div className="state">
                            <label>State</label>
                            <select className="form-select" id="state" name="state" style={{width : "40%"}} onChange={handleChange} value={formData.state}>
                                <option value="Used">Used</option>
                                <option value="New">New</option>
                            </select>
                        </div>
                    </div>

                    <div className="panel">
                        <label>Images</label>
                        <div style={{display : "flex", flexWrap : "wrap"}}>
                            <div className="addimage">
                                <img src={camera4} className="file-image" id="image1"/>
                                <input id="imageFile1" name="images" type="file" className="file file-input" onChange={event => handleChange(event, 1)}/>
                            </div>
                            <div className="addimage">
                                <img src={camera4} className="file-image" id="image2"/>
                                <input id="imageFile2" name="images" type="file" className="file file-input" onChange={event => handleChange(event, 2)}/>
                            </div>
                            <div className="addimage">
                                <img src={camera4} className="file-image" id="image3"/>
                                <input id="imageFile3" name="images" type="file" className="file file-input" onChange={event => handleChange(event, 3)}/>
                            </div>
                            <div className="addimage">
                                <img src={camera4} className="file-image" id="image4"/>
                                <input id="imageFile4" name="images" type="file" className="file file-input" onChange={event => handleChange(event, 4)}/>
                            </div>
                            <div className="addimage">
                                <img src={camera4} className="file-image" id="image5"/>
                                <input id="imageFile5" name="images" type="file" className="file file-input" onChange={event => handleChange(event, 5)}/>
                            </div>
                            <div className="addimage">
                                <img src={camera4} className="file-image" id="image6"/>
                                <input id="imageFile6" name="images" type="file" className="file file-input" onChange={event => handleChange(event, 6)}/>
                            </div>
                            <div className="addimage">
                                <img src={camera4} className="file-image" id="image7"/>
                                <input id="imageFile7" name="images" type="file" className="file file-input" onChange={event => handleChange(event, 7)}/>
                            </div>
                            <div className="addimage">
                                <img src={camera4} className="file-image" id="image8"/>
                                <input id="imageFile8" name="images" type="file" className="file file-input" onChange={event => handleChange(event, 8)}/>
                            </div>
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
                        <div className="location">
                            <label>Location</label>
                            <input type="text" className="form-control" id="location" name="location"
                                    style={{width : "40%"}} onChange={handleChange} value={formData.location}/>
                        </div>
                    </div>

                    <div className="panel">
                        <h2>Contact Info</h2>
                        <div className="contact_info">
                            <label>Contact Name</label>
                            <input type="text" className="form-control" id="contact_info" name="contact_info"
                                    style={{width : "40%"}} onChange={handleChange} value={formData.contact_info}/>
                        </div>
                        <div className="phone_number">
                            <label>Phone Number</label>
                            <input type="text" className="form-control" id="phone_number" name="phone_number"
                                style={{width : "40%"}} onChange={handleChange} value={formData.phone_number}/>
                        </div>
                    </div>

                    <div className="panel">
                        <input className="btn btn-primary" type="button" value="Submit" onClick={handleSubmit}></input>
                    </div>

                </form>
            </div>
}