import axios from 'axios';
// import history from './index';
import useToken from './components/useToken';

axios.defaults.baseURL = 'http://localhost:5000/api'

axios.interceptors.request.use(req => {
    
    const token = JSON.parse(sessionStorage.getItem('token'));
 
    // console.log("alcapaha req", req);
    if(token){
        req.headers.Authorization = 'Bearer ' + token;
    }
    return req;
});

function SetTokenHelper(value){
    // const token = sessionStorage.getItem('token');
    const {setToken} = useToken();

    console.log('SetTokenHelper');
    // sessionStorage.setItem('token', value);
    setToken(value);
}

axios.interceptors.response.use(
    response => {
    
    return response
},  error => {

    const token = localStorage.getItem('token');
    console.log('token in error', token)
    
    const response = error.response;
    if(response){
        if(response.status === 403 || response.status === 401){
            console.log('DEU ERRO', response)
            alert("[ "+response.status+ " - "+ response.statusText + "] "+response.data.message);
            SetTokenHelper(null);
            window.location.reload(false);
        }
    
        console.log('status, data,config', response,error)

    }
    // console.log("error 401", error)

    // if(status === 401){
    //     console.log("error 401", history)
    // }
    return Promise.reject(error);
  });