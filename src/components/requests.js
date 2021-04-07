import axios from 'axios';
import useToken from './useToken';

const apiUrl = 'http://127.0.0.1:5000/api/';


export function get_analysts_info(){
    axios.get(apiUrl+'analyst_info/')
      .then(res => {
        let result = {}
        result['earnings_estimate'] = JSON.parse(res.data[0])
        result['revenue_estimate'] = JSON.parse(res.data[1])
        result['earnings_history'] = JSON.parse(res.data[2])
        result['EPS_trend'] = JSON.parse(res.data[3])
        result['EPS_revisions'] = JSON.parse(res.data[3])
        result['growth_estimates'] = JSON.parse(res.data[3])
        console.log(result)
        return result
      })
  }

export function get_live_price(tick){
  return new Promise((resolve, reject) => {
    const token = JSON.parse(sessionStorage.getItem('token'));
    axios.get(apiUrl+'price?token='+ token + '&tick=' + tick +'')
      .then(res => {
        console.log("PRICE",res.data.price.toFixed(2))
        resolve(res.data.price.toFixed(2))
      })
  });
}

export function login(credentials){
  const headers = {headers: {'Content-Type': 'application/json'}}
  const data = {
    data:  JSON.stringify(credentials)
  };
  return new Promise((resolve, reject) => {
    axios.post(apiUrl+'login', data,headers)
      .then(res => {
          console.log("LOGIN", res)
        resolve(res)
      })
  });
}

export function getQuoteData(tick){
  return new Promise((resolve, reject) => {
    axios.get(apiUrl+'quote_data?tick=' + tick)
      .then(res => {
        console.log("-----quote_data",res.data)
        resolve(res.data)
      })
  });
}

export function getData(tick){
  return new Promise((resolve, reject) => {
    axios.get(apiUrl+'data?tick='+ tick)
      .then(res => {
        let close_data = res.data.close
        let values = []
        let dates = []
        for(let date in close_data){
            if(date && close_data[date]){
            values.push(close_data[date].toFixed(2))
            dates.push(new Date(date*1).toLocaleDateString())}
        }
        resolve([dates, values])
      })
  });
}

export function getDividends(tick){
  console.log("TICK no request", tick)
  return new Promise((resolve, reject) => {
    axios.get(apiUrl+'dividends?tick='+tick)
      .then(res => {
        console.log(res)
        let dividend = res.data.dividend
        let values = []
        let dates = []
        for(let date in dividend){
            values.push(dividend[date].toFixed(2))
            dates.push(new Date(date*1).toLocaleDateString())
        }
        console.log(dates,values)
        resolve([dates, values])
      })
  });
}