import axios, { CreateAxiosDefaults } from "axios"

const options:CreateAxiosDefaults = {
    baseURL:"http://81.200.147.55:8000",
    // baseURL:"http://localhost:3030",
    headers:{
        'Content-Type': 'application/json',
    },
    // withCredentials:true
}

const axiosClassic = axios.create(options)

export {axiosClassic}