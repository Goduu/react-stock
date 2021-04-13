
import React from 'react';
import {Line} from 'react-chartjs-2';

const data = {
  
  datasets: [{
      type:'line',
      label: 'EPS Actual',
      fill: false,
      lineTension: 0.1,
      borderColor: '#BB86FC',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: '#BB86FC',
      gridLines: null,
      pointBackgroundColor: '#BB86FC',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
      yAxisID: 'y-axis-1'
    },{
      label: 'EPS Estimate',
      fill: false,
      lineTension: 0.1,
      borderColor: '#FFDD8C',
      borderCapStyle: 'butt',
      borderDash: [4,4],
      // borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: '#FFDD8C',
      gridLines: null,
      pointBackgroundColor: '#FFDD8C',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [0.5, NaN, 0.84, 0.11, 0.36, 1.55, 0.98],
      yAxisID: 'y-axis-1',
      // segment: {
      //   borderColor: ctx => skipped(ctx, 'rgb(0,0,0,0.2)') || down(ctx, 'rgb(192,75,75)'),
      //   borderDash: ctx => skipped(ctx, [6, 6]),
      // }
    },{
      label: 'Price',
      fill: false,
      lineTension: 0.1,
      borderColor: '#8CFFA3',
      borderCapStyle: 'butt',
      borderDash: [],
      // borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: '#8CFFA3',
      gridLines: null,
      pointBackgroundColor: '#8CFFA3',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [0.5, NaN, 0.84, 0.11, 0.36, 1.55, 0.98],
      yAxisID: 'y-axis-2',
      // segment: {
      //   borderColor: ctx => skipped(ctx, 'rgb(0,0,0,0.2)') || down(ctx, 'rgb(192,75,75)'),
      //   borderDash: ctx => skipped(ctx, [6, 6]),
      // }
    }
  ]
};

const skipped = (ctx, value) => ctx.p0.skip || ctx.p1.skip ? value : undefined;
const down = (ctx, value) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;

const options = {
  responsive: true,
  legend: {
    display: false
  },
  tooltips: {
    mode: 'label'
  },
  elements: {
    line: {
      fill: false
    }
  },
  scales: {
    xAxes: [
      {
        display: false,
        gridLines: {
          display: false
        },
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    
      },
      {
        display: false,
        gridLines: {
          display: false
        },
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    
      }
    ],
    yAxes: [
      {
        type: 'linear',
        display: false,
        position: 'left',
        id: 'y-axis-1',
        gridLines: {
          display: false
        },
        labels: {
          show: false
        },
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
      {
        type: 'linear',
        display: false,
        position: 'right',
        id: 'y-axis-2',
        gridLines: {
          display: false
        },
        labels: {
          show: false
        },
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      }
    ]
  }
};


class MultipleLineChart extends React.Component { 

  constructor(props) {
    super(props);
    this.state = {data: data, options: options};
  }

  render() {
    return (
      <div 
          className="line-chart">
        <Line
          data={this.state.data}
          options={options}
        />
      </div>
    );
  }
}

export default MultipleLineChart