import axios, { CreateAxiosDefaults } from "axios"

export const baseURL = "http://81.200.147.55:8000"

const options:CreateAxiosDefaults = {
    baseURL:baseURL,
    // baseURL:"http://localhost:3030",
    headers:{
        'Content-Type': 'application/json',
    },
    // withCredentials:true
}

const axiosClassic = axios.create(options)

export {axiosClassic}