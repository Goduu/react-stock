import './Login.css';
import React,{ useState }  from 'react'
import Button from './Button';
import * as rq from './requests'



function loginUser(credentials) {
    return new Promise((resolve, reject) => {
        rq.login(credentials)
        .then(res => {
            console.log(res.data.token)
            resolve(res)
        })
    });
    
   }

export default function Login({ setToken }){
  
        const [email, setEmail] = useState();
        const [password, setPassword] = useState();

        const handleSubmit = async e => {
            console.log('handleSubmit', email, password)
            e.preventDefault();
            loginUser({
              email,
              password
            }).then(token => setToken(token));
            
            console.log("finish")
          }
        return (
            <div className="login-wrapper">
                <div >
                    <label>
                        E-mail:
                        <input type="email" name="email" onChange={e => setEmail(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input type="password" name="password" onChange={e => setPassword(e.target.value)}/>
                    </label>
                    <Button color="green" content="Submit" onClick={e => handleSubmit(e)}></Button>
                </div>
            </div>
        );
        
    
}

// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
//   };