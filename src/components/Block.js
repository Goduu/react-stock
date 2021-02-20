import './Block.css';
import React from 'react'


//https://css-triscks.com/snippets/css/complete-guide-grid/
  
class Block extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          headtitle: this.props.headtitle,
          value: this.props.value,
          subtitle: this.props.subtitle,
          chart: this.props.chart,
          footleft: this.props.footleft,
          footright:this.props.footright
        };
    }
      
      render() {
        return (
        <div className="bgrid">
            <div className="a">{this.state.headtitle}</div>
            <div className="b">{this.state.value}</div>
            <div className="c">{this.state.subtitle}</div>
            <div className="f">{this.state.chart}</div>
            <div className="d">{this.state.footright}</div>
            <div className="e">{this.state.footleft}</div>
          </div>
        );
      }
    }
          

export default Block;