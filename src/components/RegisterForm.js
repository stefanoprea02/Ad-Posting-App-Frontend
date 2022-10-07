import Cookies from "js-cookie";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserProvider";

export default function RegisterForm(){

    const [formData, setFormData] = React.useState({
        username: "",
        email: "",
        password: ""
    });

    const [errors, setErrors] = React.useState({
        username: [],
        email: [],
        password: []
    });
    const [submited, setSubmited] = React.useState(false);
    const user = useUser();
    const navigate = useNavigate();

    function handleChange(event){
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name] : event.target.value
            }
        });
    }

    function handleSubmit(){
        fetch("http://localhost:8080/api/auth/checkUsername/" + formData.username)
        .then((response) => {
            if(response.status === 204) return "valid";
            else return "invalid";
        })
        .then((data) => {
            if(data === "valid"){
                const formData2 = new FormData(document.getElementById("form"));
                fetch("http://localhost:8080/api/auth/register",{
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json'
                    },
                    body: formData2
                }).then((response) => response.json())
                  .then((data) => {
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
                        setSubmited(true);
                    }else{
                        user.setJwt(data.token);
                        Cookies.set('jwt', data.token);
                        navigate("/");
                        return data;
                    }
                  });
            }else{
                setErrors(prevFormData => {
                    return{
                        ...prevFormData,
                        username: ["Username already in use"]
                    }
                })
                setSubmited(true);
            }
        });
        const keys = Object.keys(errors);
        for(const key of keys){
            errors[key] = [];
        }
    }

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

    return  <form method="POST" id="form" className="login-form">
                <div className="username">
                    <input type="text" className="form-control" id="username" name="username" placeholder="username" 
                        onChange={handleChange} value={formData.username}
                    />
                </div>
                <div className="email">
                    <input type="text" className="form-control has-error" id="email" name="email" placeholder="email" 
                        onChange={handleChange} value={formData.email}
                    />
                </div>
                <div className="password">
                    <input type="text" className="form-control has-error" id="password" name="password" placeholder="password" 
                        onChange={handleChange} value={formData.password}
                    />
                </div>
                <input className="btn btn-primary" type="button" value="Submit" onClick={() => {handleSubmit()}}></input>
            </form>
}