import React from 'react'
import Block from './Block';
import BarChart from './BarChart';
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

class DividendChart extends React.Component{
    constructor(props) {
        super(props);
        this.tick = props.tick;
        this.name = "Amazon"
        this.dividend = null
        this.setNewTick = this.setNewTick.bind(this);
        this.getDividendData = this.getDividendData.bind(this);
        this.getQuoteData = this.getQuoteData.bind(this);
        this.chartRef = React.createRef();
        this.blockRef = React.createRef();

    }

    componentDidUpdate(prevProps){
      this.setNewTick(this.state.tick)
      
    }

    getDividendData(tick){
      tick = tick ? tick : 'FRT'
      let chartRef = this.chartRef
      rq.getDividends(tick).then(function (res){
        let data = {...chartRef.current.state.dataTest}
        data.labels = res[0]
        data.datasets[0].data =  res[1]
        console.log("inserting data: ", data)
        chartRef.current.setState({dataTest: data})
        
      })
    }  

    getQuoteData(tick){
      let blockRef = this.blockRef;
      let dividend = this.dividend;
      rq.getQuoteData(tick).then(function (res){
        console.log("STATE", blockRef.current);
        dividend = res.trailingAnnualDividendRate;
        blockRef.current.setState(
          {headtitle: "Dividend",
             value: res.trailingAnnualDividendRate.toString().concat("% year"),
             })
        console.log("STATE", blockRef.current);

      })

    }
    setNewTick(tick){
      this.tick = tick
      console.log("setNewTick",tick)
      this.getDividendData(tick);
      this.getQuoteData(tick);

    }
      
      render() {
        return (
          <Block 
          headtitle={this.name.concat(" - ").concat(this.tick)}
          value={this.dividend}
          chart={<BarChart data={this.dataTest_} ref={this.chartRef}/>}
          ref={this.blockRef}
          ></Block>
   
        );
      }
    }
          

export default DividendChart;