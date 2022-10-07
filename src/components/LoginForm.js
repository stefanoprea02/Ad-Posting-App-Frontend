import Cookies from "js-cookie";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../UserProvider";

export default function LoginForm(){

    const user = useUser();
    const navigate = useNavigate();
    const [error, setError] = React.useState("false");
    const [submited, setSubmited] = React.useState(false);

    function handleSubmit(){
        const formData2 = new FormData(document.getElementById("form"));

        const response = fetch("http://localhost:8080/api/auth/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: formData2
        }).then((response) => {
            if(response.ok){
                return response.text();
            }
            else{
                return "error";
            }
        })
          .then((data) => {
            if(data === "error"){
                setSubmited(true);
                setError("true");
            }else{
                user.setJwt(data);
                Cookies.set('jwt', data);
                navigate("/");
                return data;
            }
          });
    }

    React.useEffect(function(){
        if(submited == true){
            for(let key of ["username", "password"]){
                let divWithError = document.getElementsByClassName(key)[0];
                divWithError.classList.add("has-error");
                let input = document.getElementById(key);
                input.classList.add("is-invalid");
                let errorMessageDiv = document.createElement("span");
                errorMessageDiv.classList.add("invalid-feedback");
                let errorMessage = document.createElement("p");
                errorMessage.innerHTML = "Username or password not valid";
                errorMessageDiv.appendChild(errorMessage);
                divWithError.appendChild(errorMessageDiv);
            }
            
        }
    }, [error]);

    return   <form method="POST" id="form" className="login-form">
                <div className="username">
                    <input type="text" className="form-control" id="username" name="username" placeholder="username" />
                </div>
                <div className="password">
                    <input type="text" className="form-control has-error" id="password" name="password" placeholder="password" />
                </div>
                <input className="btn btn-primary" type="button" value="Submit" onClick={() => handleSubmit()}></input>
            </form>
}