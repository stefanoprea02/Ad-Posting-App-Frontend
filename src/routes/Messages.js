import React from "react";
import Nav from "../components/Nav";
import { useUser } from "../UserProvider";
import jwtDecode from "jwt-decode";
import { useLocation } from "react-router-dom";
import { getTime } from "../Functions";

export default function Messages(){
    const [formData, setFormData] = React.useState("");
    const location = useLocation();
    const [listening, setListening] = React.useState(false);
    const [messageData, setMessageData] = React.useState({});
    const [userData, setUserData] = React.useState(new Set());
    const [currentConv, setCurrentConv] = React.useState("");
    const user = useUser();
    const {conversation} = location.state ? location.state : "";
    let eventSource = undefined;
    
    function handleChange(event){
        setFormData(event.target.value);
    }

    function changeConv(conv){
        if(messageData[conv] !== undefined){
            let convMessages = document.getElementById(conv);
            convMessages.style.display = "column-reverse";
        }
        if(currentConv != conv)
            setCurrentConv(conv);
    }

    React.useEffect(() => {
        if(conversation != undefined){
            setUserData(prevUserData => new Set([...prevUserData, conversation]));
        }
        if(!listening){ 
            eventSource = new EventSource("http://localhost:8080/messages?receiver=" + jwtDecode(user.jwt).sub, {withCredentials: true});
            /*
            eventSource.onopen = (event) => {
                if(event.data !== undefined){
                    console.log(JSON.parse(event.data));
                    setMessageData(old => [...old, JSON.parse(event.data)]);
                }
            }
            */
            eventSource.onmessage = (event) => {
                if(event.data !== undefined){
                    let data = JSON.parse(event.data);
                    if(data.sender != jwtDecode(user.jwt).sub){
                        setUserData(prevUserData => new Set([...prevUserData, data.sender]));
                    }else{
                        setUserData(prevUserData => new Set([...prevUserData, data.receiver]));
                    }
                    setMessageData(old => {
                        if(data.sender == jwtDecode(user.jwt).sub){
                            if(old[data.receiver] !== undefined){
                                return {
                                    ...old,
                                    [data.receiver]: [...old[data.receiver], data]
                                }
                            }else{
                                return {
                                    ...old,
                                    [data.receiver]: [data]
                                }
                            }
                        }else{
                            if(old[data.sender] !== undefined){
                                return {
                                    ...old,
                                    [data.sender]: [...old[data.sender], data]
                                }
                            }else{
                                return {
                                    ...old,
                                    [data.sender]: [data]
                                }
                            }
                        }
                    });
                }
            }

            eventSource.onerror = (event) => {
                if(event.target.readyState == EventSource.CLOSED){
                    console.log("eventsource closet (" + event.target.readyState + ")")
                }
                eventSource.close();
            }

            setListening(true);
        }

        return () => {
            eventSource.close();
            console.log("eventsource closed");
        }
    }, []);

    async function handleSubmit(){
        let submitValue = {
            id: "",
            content: formData,
            receiver: currentConv,
            sender: jwtDecode(user.jwt).sub
        }
        setFormData("");
        const response = await fetch('http://localhost:8080/messages', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submitValue)
        });
    }

    let messages = [];
    if(messageData && Object.keys(messageData).length != 0){
        messages = Object.keys(messageData).map(sender => {
            let messagesBySender = [];
            let a = messageData[sender].sort((a, b) => {
                var firstDate = new Date(a.date[0], a.date[1], a.date[2], a.date[3], a.date[4], a.date[5]);
                var secondDate = new Date(b.date[0], b.date[1], b.date[2], b.date[3], b.date[4], b.date[5]);
                return firstDate.getTime() - secondDate.getTime();
            });
            
            for(let i = messageData[sender].length - 1; i >= 0; i--){
                if(messageData[sender][i]["sender"] == jwtDecode(user.jwt).sub){
                    messagesBySender.push(
                        <div key={messageData[sender][i]["id"]} className="message-sent">
                            <p>{messageData[sender][i]["content"]}</p>
                            <p style={{fontSize:"12px"}}>{getTime(messageData[sender][i]["date"])}</p>
                        </div>
                    )
                }else{
                    messagesBySender.push(
                        <div key={messageData[sender][i]["id"]} className="message-received">
                            <p>{messageData[sender][i]["content"]}</p>
                            <p style={{fontSize:"12px"}}>{getTime(messageData[sender][i]["date"])}</p>
                        </div>
                    )
                }
            }
            if(sender == currentConv){
                return <div key={`${sender}m`} id={sender}>
                    {messagesBySender}
                </div>
            }else{
                return <div key={`${sender}m`} style={{display: "none"}} id={sender}>
                    {messagesBySender}
                </div>
            }
        })
    }
    
    let conversations = [];
    userData.forEach(element => {
        conversations.push(
            <div key={element} className="conversation" onClick={() => changeConv(element)}>
                <div className="conversation-top">
                    <p className="conversation-top-name">{element}</p>
                    {messageData[element] && <p className="conversation-top-time">{getTime(messageData[element][messageData[element].length - 1].date)}</p>}
                </div>
                {messageData[element] && <p className="conversation-bottom">{messageData[element][messageData[element].length - 1].content}</p>}
                <hr></hr>
            </div>
        )
    });

    return (
        <div className="chatPage">
            <Nav />
            <div className="chat">
                <div className="conversations">
                    {conversations}
                </div>
                <div className="messages">
                    <div>
                        {messages}
                    </div>
                    <form id="formmm" onSubmit={e => {e.preventDefault(); handleSubmit();}}>
                        <input className="form-control" type="text" name="content" id="content" onChange={handleChange} value={formData}
                            style={{marginBottom: "0px", borderRight: "none"}}/>
                        <input className="btn" type="button" value="Submit" onClick={() => handleSubmit()}
                            style={{backgroundColor: "rgb(242, 244, 245)", border: "1px solid #ced4da", fontSize: "18px"}}></input>
                    </form>
                </div>
            </div>
        </div>
  );
}