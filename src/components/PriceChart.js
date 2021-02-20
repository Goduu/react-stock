import './PriceChart.css';
import React from 'react'
import Block from './Block';
import LineChart from './LineChart';
import * as rq from './requests'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


//https://css-triscks.com/snippets/css/complete-guide-grid/
  
let dataTest_ = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

class PriceChart extends React.Component{
    constructor(props) {
        super(props);
        this.tick = props.tick;
        this.name = "Amazon"
        this.price = 0
        this.setNewTick = this.setNewTick.bind(this);
        this.getPriceData = this.getPriceData.bind(this);
        this.getQuoteData = this.getQuoteData.bind(this);
        this.priceChartReference = React.createRef();
        this.blockRef = React.createRef();

    }

    componentDidUpdate(prevProps){
      this.setNewTick(this.state.tick)
      
    }

    getPriceData(tick){
      
      let priceChartReference = this.priceChartReference
      rq.getData(tick).then(function (res){
        let data = {...priceChartReference.current.state.dataTest}
        data.labels = res[0]
        data.datasets[0].data =  res[1]
        priceChartReference.current.setState({dataTest: data})
       
      })
    }
    getQuoteData(tick){
      let blockRef = this.blockRef;
      rq.getQuoteData(tick).then(function (res){
        console.log("STATE", blockRef.current);
        blockRef.current.setState(
          {headtitle: res.longName.concat(" - ").concat(tick),
             value: res.financialCurrency.concat(" ").concat(res.regularMarketPrice),
             })
        console.log("STATE", blockRef.current);

      })

    }
    setNewTick(tick){
      this.tick = tick
      console.log("setNewTick",tick)
      this.getPriceData(tick);
      this.getQuoteData(tick);

    }
      
      render() {
        return (
          <Block 
          headtitle={this.name.concat(" - ").concat(this.tick)}
          value={this.price}
          subtitle="Price"
          chart={<LineChart data={this.dataTest_} ref={this.priceChartReference}/>}
          ref={this.blockRef}
          ></Block>
   
        );
      }
    }
          

export default PriceChart;