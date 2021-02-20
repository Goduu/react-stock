import './BlocksContainer.css';
import React from 'react'

class BlocksContainer extends React.Component{

    render() {
        return(
            <div className="blocks-container">
                <div className="blocks-bg">
                    <div className="blocks-content">
                        {this.props.content} 
                    </div>
                </div>
            </div>
        );
    }
}

export default BlocksContainer;