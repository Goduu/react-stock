import './Button.css';
import React from 'react'
import * as rq from './requests'

class User extends React.Component{

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        
        console.log('user data',rq.get_user_data('test@me.com'));
        
        
    }

    handleClick(e) {
        console.log("in button click")
        this.props.onClick(e);
      }

    render() {
        return (
            <div className={`button-circle ${this.props.color}`} onClick={this.handleClick}>
                {/* <div >
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
                </div> */}
            </div>
        );
    }
}

export default User;