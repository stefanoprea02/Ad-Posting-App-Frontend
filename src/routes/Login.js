import Cookies from "js-cookie";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../UserProvider";

export default function Login(){

    const user = useUser();

    const navigate = useNavigate();
    
    const[formData, setFormData] = React.useState({
        username: "",
        password: ""
    });

    const[error, setError] = React.useState("false");

    function handleChange(event){
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name] : event.target.value
            }
        });
    }

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
                setError("true");
            }
        })
          .then((data) => {
            user.setJwt(data);
            Cookies.set('jwt', data);
            navigate("/");
            return data;
          });
    }

    return  <div>
                <form action="http://localhost:8080/ad/new" method="POST" id="form">
                    <div>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="username" 
                            name="username" 
                            placeholder="username" 
                            onChange={handleChange} 
                            value={formData.price}
                        />
                    </div>
                    <div>
                        <input 
                            type="text" 
                            className="form-control has-error" 
                            id="password" 
                            name="password" 
                            placeholder="password" 
                            onChange={handleChange} 
                            value={formData.price}
                        />
                    </div>
                    <input className="btn btn-primary" type="button" value="Submit" onClick={() => handleSubmit()}></input>
                </form>
            </div>
}