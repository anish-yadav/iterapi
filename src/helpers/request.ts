import Axios, { Method } from "axios";

const instance = Axios.create({ withCredentials: true });

type Param =  {
    cookies? : string[];
    url: string;
    method: Method;
    data: any
}

export const makeRequest = async ({ cookies, url, method, data }:Param) => {

    try {
        const response = await instance({
            url,
            method,
            data,
            headers : { 
                "Content-Type": "application/json",
                "Cookies" : cookies ? cookies[0] : ''
            }
        })
        return response
    } catch(e) {
        throw e
    }
}