import './Tag.css';
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Tag extends React.Component{

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        console.log("in tag close click")
      }

    render() {
        return (
            <div className={`tag ${this.props.color}`} onClick={this.handleClick}>
                <FontAwesomeIcon icon="times" color="#121212" className="tag-icon"/> 
                <span style={{margin: '4px'}}>{this.props.text}</span>
            </div>
        );
        }
}

export default Tag;