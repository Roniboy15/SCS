import axios from "axios"
import { TOKEN_KEY } from "../constant/constant";

export const API_URL = "http://localhost:3010";

export const apiGet = async(_url) => {
        try {
            let resp = await axios.get(_url, {
                headers: {
                    "x-api-key": localStorage[TOKEN_KEY],
                    'Content-Type': "application/json"
                }
            })
            return resp;
        } catch (err) {
            throw err;
        }
 }
export const apiPost = async(_url, _method, _body) => {
    try {
        let resp = await axios({
            url: _url,
            method: _method,
            data: _body,
        })
        return resp;
    } catch (err) {
        throw err;
    }
}

export const apiPut = async(_url, _body = {}) => {
    try {
        let resp = await axios({
            url: _url,
            method: 'PUT',
            data: JSON.stringify(_body),
            headers: {
                "x-api-key": localStorage[TOKEN_KEY],
                'Content-Type': "application/json"
            }
        })
        return resp;
    } catch (err) {
        throw err;
    }
}
export const apiDelete = async(_url, _body = {}) => {
    try {
        let resp = await axios({
            url: _url,
            method: 'DELETE',
            data: JSON.stringify(_body),
            headers: {
                "x-api-key": localStorage[TOKEN_KEY],
                'Content-Type': "application/json"
            }
        })
        return resp;
    } catch (err) {
        throw err;
    }
}