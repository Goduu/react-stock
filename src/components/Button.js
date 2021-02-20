import './Button.css';
import React from 'react'

class Button extends React.Component{

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        
    }

    handleClick(e) {
        console.log("in button click")
        this.props.onClick(e);
      }

    render() {
        if(this.props.type === "circle"){
            return (
                <div className={`button-circle ${this.props.color}`} onClick={this.handleClick}>
                    {this.props.content}
                </div>
            );
        } else{
            return (
                <div className={`button ${this.props.color}`} onClick={this.handleClick}>
                    {this.props.content}
                </div>
            );
            }
    }
}

export default Button;