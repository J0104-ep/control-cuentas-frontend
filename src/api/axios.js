import axios from "axios";


const api = axios.create({

    baseURL:"https://control-cuentas-api.onrender.com"

});


export default api;