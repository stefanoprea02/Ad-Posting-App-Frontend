import React from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export default function Login(){
    const [type, setType] = React.useState("login");

    function handleButton(source){
        let login = document.getElementById("login");
        let register = document.getElementById("register");

        if(source === "login"){
            if(register != null && register.classList.contains("button-selected")){
                register.classList.remove("button-selected");
                register.classList.add("button-notselected");
                login.classList.remove("button-notselected");
                login.classList.add("button-selected");
                setType("login");
            }
        }else{
            if(login != null && login.classList.contains("button-selected")){
                login.classList.remove("button-selected");
                login.classList.add("button-notselected");
                register.classList.remove("button-notselected");
                register.classList.add("button-selected");
                setType("register");
            }
        }
    }

    return  <div className="login-panel">
                <div className="buttons">
                    <button id="login" type="button" className="button button-selected button-left" 
                        onClick={() => handleButton("login")}>Login</button>
                    <button id="register" type="button" className="button button-notselected button-right" 
                        onClick={() => handleButton("register")}>Register</button>
                </div>
                {type === "login" && 
                    <div>
                        <LoginForm />
                    </div>
                }
                {type === "register" && 
                    <div>
                        <RegisterForm />
                    </div>
                }
            </div>
}