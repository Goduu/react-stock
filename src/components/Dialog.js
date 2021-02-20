import './Dialog.css';
import Button from './Button'
import React from 'react'

class Dialog extends React.Component{

    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.props.onClose();
    }

    render() {
        if(!this.props.active){
            return null
        } else {
            return (        
                <div className="dialog-wrapper">
                    <div className="header">
                        Dialog header!
                    </div>
                    <div className="body"  >
                        {this.props.text} 
                    </div>
                    <div className="footer">
                        <Button content='Ok' color='magenta' onClick={this.handleClose}></Button>
                    </div>
                </div>
                
            );
        }
        }
}

export default Dialog;