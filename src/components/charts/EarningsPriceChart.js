import '../PriceChart.css';
import React from 'react'
import Block from '../Block';
import MultipleLineChart from './MultipleLineChart';
import * as rq from '../requests'


//https://css-triscks.com/snippets/css/complete-guide-grid/

class EarningsPriceChart extends React.Component{
    constructor(props) {
        super(props);
        this.tick = props.tick;
        this.name = "Amazon"
        this.price = 0
        this.setNewTick = this.setNewTick.bind(this);
        this.getData = this.getData.bind(this);
        this.earningsPriceChartReference = React.createRef();
        this.blockRef = React.createRef();

    }

    componentDidUpdate(prevProps){
      this.setNewTick(this.state.tick)
      
    }

    getData(tick){
      let earningsPriceChartReference = this.earningsPriceChartReference
      console.log("ref", earningsPriceChartReference)
      rq.getEarningsHistory(tick).then(function (res){
        console.log("GET BEFOR ", earningsPriceChartReference.current.state.data)
        if(res){
          let data = {...earningsPriceChartReference.current.state.data}
          let options = {...earningsPriceChartReference.current.state.options}
          options.scales.xAxes[0].labels = res['date']
          data.datasets[0].data =  res['epsactual']
          data.datasets[1].data =  res['epsestimate']
          earningsPriceChartReference.current.setState({data: data, options: options})
          console.log("GET DATA ", data)
          rq.getData(tick).then(function (res){
            if(res){
              let data = {...earningsPriceChartReference.current.state.data}
              let options = {...earningsPriceChartReference.current.state.options}
              options.scales.xAxes[1].labels = res[0]
              data.datasets[2].data =  res[1]
              earningsPriceChartReference.current.setState({data: data})
            }
           
          })
        }
       
      })
    }
    
    setNewTick(tick){
      this.tick = tick
      console.log("setNewTick",tick)
      this.getData(tick);

    }
      
      render() {
        return (
          <Block 
          headtitle="EPS x Price"
          value={this.price}
          chart={<MultipleLineChart data={this.data} ref={this.earningsPriceChartReference}/>}
          ref={this.blockRef}
          ></Block>
   
        );
      }
    }
          

export default EarningsPriceChart;