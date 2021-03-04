import './StocksDashboard.css';
import React from 'react'
import * as rq from './requests'
import TextField from './TextField';
import PriceChart from './PriceChart';
import DividendChart from './DividendChart';

class StocksDashboard extends React.Component{

    constructor(props) {
        super(props);
        this.handleSubmitTick = this.handleSubmitTick.bind(this);
        this.state = {tick: ''}
        this.chartLineReference = React.createRef();
        this.charBartReference = React.createRef(); 
        this.priceChartRef = React.createRef();
        this.dividendChartRef = React.createRef();
        
    }

    handleSubmitTick(tick){
        this.setState({tick: tick})
        this.priceChartRef.current.setState({tick: tick})
        this.dividendChartRef.current.setState({tick: tick})
        console.log("Tick handleSubmit", this.tick)
        // this.priceChartRef.current.getPriceData(tick);
        // this.dividendChartRef.current.getDividendData(tick);
        rq.get_live_price(tick).then(res =>{
         this.price = res
        })
      }

    render() {
            return (
                <div className="stock-dashboard">
                    Stock: <TextField submitTick={this.handleSubmitTick}/>
                    <div style={{display:'flex'}}>
                        <PriceChart tick={this.tick} ref={this.priceChartRef}/>
                        <DividendChart tick={this.tick} ref={this.dividendChartRef}/>
                    </div>
                </div>
            );
            
    }
}

export default StocksDashboard;