import './PriceChart.css';
import React from 'react'
import Block from './Block';
import LineChart from './LineChart';
import * as rq from './requests'


//https://css-triscks.com/snippets/css/complete-guide-grid/

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
        if(res){
          let data = {...priceChartReference.current.state.dataTest}
          data.labels = res[0]
          data.datasets[0].data =  res[1]
          priceChartReference.current.setState({dataTest: data})
        }
       
      })
    }
    getQuoteData(tick){
      let blockRef = this.blockRef;
      
        return rq.getQuoteData(tick)
        .then(function (res){
          if(res.financialCurrency & res.longName){
            blockRef.current.setState(
            {headtitle: res.longName.concat(" - ").concat(tick),
                 value: res.financialCurrency.concat(" ").concat(res.regularMarketPrice),
                 })
          }
  
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