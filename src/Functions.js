export async function adFavorite(id){
    try{
        return await fetch("http://localhost:8080/adFavorite/" + id, {credentials: "include"})
        .then((response) => response.json())
        .then((data) => data);
    }
    catch(e){
        return e;
    }
}

export async function removeFavorite(id){
    try{
        return await fetch("http://localhost:8080/removeFavorite/" + id, {credentials: "include"})
        .then((response) => response.json())
        .then((data) => data);
    }
    catch(e){
        return e;
    }
}

export async function checkFavorite(id){
    try{
        return await fetch("http://localhost:8080/checkFavorite/" + id, {credentials: "include"})
        .then((response) => response.json())
        .then((data) => data);
    }
    catch(e){
        return e;
    }
}

export async function getAd(id){
    try{
        return await fetch('http://localhost:8080/ad/' + id,{
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((data) => data);
    }
    catch(e){
        return e;
    }
}

export async function getUser(username){
    try{
        return fetch('http://localhost:8080/user/' + username,{
            credentials: 'include',
            method: 'GET'
        })
        .then((response) => response.json())
        .then((data) => data);
    }
    catch(e){
        return e;
    }
}

export async function getCategories(){
    try{
        return await fetch('http://localhost:8080/categories',{
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((data) => data);
    }
    catch(e){
        return e;
    }
}

export async function getAds(){
    try{
        return fetch('http://localhost:8080/ads',{
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((data) => data);
    }
    catch(e){
        return e;
    }
}