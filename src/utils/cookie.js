import Cookies from "js-cookie"

export const setCookie = (key,value)=>{
    return Cookies.set(key,JSON.stringify(value))
}

export const getCookie = (key)=>{
    return JSON.parse(Cookies.get(key))
}
export const removeCookie = (key)=>{
    return Cookies.remove(key)
}
