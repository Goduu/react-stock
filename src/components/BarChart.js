import React from 'react';
import {Bar} from 'react-chartjs-2';
import './BarChart.css';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Dividends',
      backgroundColor: 'rgba(187, 134, 252, 0.2)',
      borderColor: '#BB86FC',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(187, 134, 252, 0.4)',
      hoverBorderColor: 'rgba(187, 134, 252, 1)',
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

const options = {
  legend: {
    display: false
  },
  scales: {
    yAxes: [
        {  
          display: false,
          ticks: {
            suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
            // OR //
            beginAtZero: true   // minimum value will be 0.
        }
      },
    ],
    xAxes: [
      {
        display: false, // this will hide vertical lines
      },
    ],
  },
}

class BarChart extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {dataTest: data};
  }
  render() {
    const dataTest = this.state.dataTest;

    if(dataTest){
      return (
          <div 
          className="line-chart">
              <Bar data={dataTest}
                options={options}/>
          </div>
        );
    } else{
      return null
    }
  }
}

export default BarChart

