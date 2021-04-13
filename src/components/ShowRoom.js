import React from 'react';
import '../App.css';
import Button from './Button';
import Dialog from './Dialog';
import Tag from './Tag';
import BlocksContainer from './BlocksContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as rq from './requests'
import LineChart from './LineChart';
import BarChart from './BarChart';
import TextField from './TextField';
import PriceChart from './PriceChart';
import DividendChart from './DividendChart';
import Login from './Login';


let data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};


class ShowRoom extends React.Component{

  constructor(props) {
    super(props);
    this.state = {showDialog: props.active};
    this.testOnClick = this.testOnClick.bind(this);
    this.toggleDialog = this.toggleDialog.bind(this);
    this.getLineChartData = this.getLineChartData.bind(this);
    this.getBarChartData = this.getBarChartData.bind(this);
    this.handleSubmitTick = this.handleSubmitTick.bind(this);
    this.setToken = this.setToken.bind(this);
    this.getEarnsHistory = this.getEarnsHistory.bind(this);
    this.chartLineReference = React.createRef();
    this.charBartReference = React.createRef();
    this.priceChartRef = React.createRef();
    this.dividendChartRef = React.createRef();
    this.price = 0
    this.tick = 'FRT'
    
  }
  // chartReference = {};

  // componentDidMount() {
  //   console.log(this.chartReference); // returns a Chart.js instance reference
  // }
  

  testOnClick(){
    console.log("Button Clicked")
   }

  toggleDialog(){
    this.setState(state => ({
        showDialog: !state.showDialog
      }));
   }
  getLineChartData(tick){
    tick = tick ? tick : 'FRT'
    let chartLineReference = this.chartLineReference
    rq.getData(tick).then(function (res){
      let data = {...chartLineReference.current.state.data}
      data.labels = res[0]
      data.datasets[0].data =  res[1]
      chartLineReference.current.setState({data: data})
     
    })
    
   }

   getEarnsHistory(){
    let tick = 'FRT'
    // // rq.getEarningsHistory(tick).then(function (res){
      
     
    // })
    
   }
  getBarChartData(tick){
    tick = tick ? tick : 'FRT'
    let charBartReference = this.charBartReference
    rq.getDividends(tick).then(function (res){
      console.log("charBartReference", charBartReference)
      let data = {...charBartReference.current.state.data}
      data.labels = res[0]
      data.datasets[0].data =  res[1]
      console.log("inserting data: ", data)
      charBartReference.current.setState({data: data})
     
    })
    console.log("state fin", charBartReference)
    
   }
   handleSubmitTick(tick){
     this.tick = tick;
     this.priceChartRef.current.setState({tick: tick})
     this.dividendChartRef.current.setState({tick: tick})
     console.log("Tick handleSubmit", this.tick)
     this.getLineChartData(tick);
     this.getBarChartData(tick);
     rq.get_live_price(tick).then(res =>{
      this.price = res
     })
   }

  setToken(userToken) {
    console.log("user tok", userToken)
  }
  
   
   render(){
    let icon = <FontAwesomeIcon icon="check" color="#121212" title="check"/> 
    let icon2 = <FontAwesomeIcon icon="plus" color="#121212" title="check"/> 

        return (
            <div className="App">
            <header className="App-header">
                <h1>ShowRoom</h1>
                <p>Buttons</p>
                <Login setToken={this.setToken}/>
                <Button color="green" content="Earns" onClick={this.getEarnsHistory}></Button>
                <Button color="green" content="Login" onClick={rq.login}></Button>
                <Button color="green" content="Button Green" onClick={this.testOnClick}></Button>
                <Button color="magenta" content="Button Magenta" onClick={this.testOnClick}/>
                <Button color="magenta" content={icon} type="circle" onClick={this.testOnClick}/>
                <Button color="magenta" content={icon2} type="circle" onClick={this.testOnClick}/>
                <p> Dialog Box</p>
                <Button color="green" content="Open Dialog" onClick={this.toggleDialog}/>
                <Dialog text="Dialog Text hereLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut"
                 active={this.state.showDialog}
                 onClose={this.toggleDialog}></Dialog>
                 <p>Tags</p>
                 <div style={{display:'flex', padding: '3px'}}>
                    <Tag text="Tag"></Tag>
                    <Tag text="Tag" color="magenta"></Tag>
                </div>
                <p>Icons</p>
                <div style={{display:'flex', padding: '3px'}} >
                    <FontAwesomeIcon icon="check" color="white" title="check"/> 
                    <FontAwesomeIcon icon="plus" color="white" title="plus"/> 
                    <FontAwesomeIcon icon="cog" color="white" title="cog"/> 
                    <FontAwesomeIcon icon="cogs" color="white" title="cogs"/> 
                    <FontAwesomeIcon icon="user" color="white" title="user"/> 
                    <FontAwesomeIcon icon="user-cog" color="white" title="user-cog"/> 
                    <FontAwesomeIcon icon="angle-double-down" color="white" title="angle-double-down"/> 
                    <FontAwesomeIcon icon="angle-up" color="white" title="angle-up"/> 
                    <FontAwesomeIcon icon="caret-right" color="white" title="caret-right"/> 
                    <FontAwesomeIcon icon="check-circle" color="white" title="check-circle"/> 
                    <FontAwesomeIcon icon="coins" color="white" title="coins"/> 
                    <FontAwesomeIcon icon="wallet" color="white" title="wallet"/> 
                    <FontAwesomeIcon icon="times-circle" color="white" title="times-circle"/> 
                    <FontAwesomeIcon icon="times" color="white" title="times"/> 
                </div>
                <p>Chart</p>
                <BlocksContainer content={ <div> {this.price} 
                <LineChart data={data} ref={this.chartLineReference} />
                </div>
                }
                ></BlocksContainer>
                <Button color="green" content="Get Stock Prices" onClick={this.getLineChartData}></Button>
                
                <BlocksContainer content={<div >
                  
                <BarChart ref={this.charBartReference} />
                </div>
                }
                ></BlocksContainer>
                <Button color="green" content="Get Dividends" onClick={this.getBarChartData}></Button>
                .
                .
                <TextField submitTick={this.handleSubmitTick}/>
                <div style={{display:'flex'}}>
                  <PriceChart tick={this.tick} ref={this.priceChartRef}/>
                  <DividendChart tick={this.tick} ref={this.dividendChartRef}/>
                </div>
            ....
            </header>
            </div>
        );
   }
}

export default ShowRoom;