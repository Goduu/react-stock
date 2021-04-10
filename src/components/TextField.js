import React from 'react';
import './TextField.css';
import Button from './Button';

class TextField extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: ''
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      // alert('Search for stock: ' + this.state.value);
      event.preventDefault();
      this.props.submitTick(this.state.value)
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit} style={{display:'flex'}}>
          <label>
            <input type="text" className='text-field' value={this.state.value} onChange={this.handleChange} />
          </label>
          <Button color="magenta" content="Submit" onClick={this.handleSubmit}></Button>
        </form>
      );
    }
  }

export default TextField;