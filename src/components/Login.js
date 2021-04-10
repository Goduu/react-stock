import './Login.css';
import React,{ useState }  from 'react'
import Button from './Button';
import * as rq from './requests'
import Dialog from './Dialog';



function loginUser(credentials) {
    return new Promise((resolve, reject) => {
        rq.login(credentials)
        .then(res => {
            resolve(res)
        })
    });
    
}


export default function Login({ setToken }){
  
        const [email, setEmail] = useState();
        const [password, setPassword] = useState();
        let showDialog = false;
        let dialogRef = React.createRef();

        const handleSubmit = async e => {
            e.preventDefault();
            loginUser({
              email,
              password
            }).then(token => {
                setToken(token.data.token);})
                .catch( function (error) {
                    console.log(error.response);
                  })
            
          }
          function toggleDialog(error){
            dialogRef.current.setState({
                active: !showDialog,
                text: error
            }) //({active: !showDialog})
            showDialog = !showDialog;
        }
        return (
            <div className="login-wrapper">
                <Dialog text="E-mail or password is wrong."
                 active={showDialog}
                 onClose={toggleDialog}
                 ref={dialogRef}></Dialog>
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