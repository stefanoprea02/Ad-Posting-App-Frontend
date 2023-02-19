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

export function categoryDescriptionToName(description){
    let result = description;
    while(result.includes("-")){
        result = result.replace("-", " ");
    }
    result = result.charAt(0).toUpperCase() + result.slice(1);
    return result;
}

export async function getAdsFiltered(url){
    try{
        return fetch(url, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then((data) => data);
    }
    catch(e){
        return e;
    }
}

export function getTime(time){
    return `${('0' + time[3]).slice(-2)}:${('0' + time[4]).slice(-2)}:${('0' + time[5]).slice(-2)}`;
}

export function getDate(time){
    return `${('0' + time[0]).slice(-2)}.${('0' + time[1]).slice(-2)}.${('0' + time[2]).slice(-2)}`;
}

export const judete = ["Bihor", "Arad", "Timiș", "Caraș-Severin", "Mehedinți", "Hunedoara", "Cluj", "Sălaj", "Satu-Mare", 
        "Maramureș", "Bistrița-Năsăud", "Suceava", "Botoșani", "Neamț", "Iași", "Mureș", "Vaslui", "Harghita", "Brașov", "Bacău", 
        "Alba", "Covasna", "Sibiu", "Vrancea", "Galați", "Vâlcea", "Dâmbovița", "Buzău", "Brăila", "Tulcea", "Gorj", "Dolj", "Olt", 
        "Argeș", "Teleorman", "Prahova", "Ilfov", "Ialomița", "Călărași", "Giurgiu", "Constanța", "București"];