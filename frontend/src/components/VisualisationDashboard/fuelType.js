
import data from './fuel_type.json'
import CanvasJSReact from './canvasjs.react';
var React = require('react');
var Component = React.Component;
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var React = require('react');
var Component = React.Component;

var dataPoints =[];
class FuelType extends Component {
    render() {
		const options = {
            animationEnabled: true,
			exportEnabled: true,
			backgroundColor: '#202A3B',
			theme: "light2",
			title:{
                text: "Power Plants Per Fuel Category",
				fontSize: '20',
				fontColor: "#F1BA13",
				fontFamily: "Roboto,sans-serif",
				fontWeight: "bold"
			},
			axisX: {
				title: "Fuel Category",
				reversed: true,
				titleFontColor: "white",
				labelFontColor: 'white',
			},
			axisY: {
				title: "Number of Power Plants",
				labelFormatter: this.addSymbols,
				titleFontColor: "white",
				labelFontColor: 'white',
			},
			data: [{
				type: "bar",
                dataPoints: dataPoints,
               
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				 onRef={ref => this.chart = ref} 
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
    }
    
    componentDidMount(){
        var chart = this.chart;
		const newData= data.map((d)=>{
			dataPoints.push({
				y: parseInt(d.x),
				label: d.y
					});
        })
        console.log(dataPoints)
		
		chart.render();}
	
	addSymbols(e){
		var suffixes = ["", "K", "M", "B"];
		var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
		if(order > suffixes.length - 1)
			order = suffixes.length - 1;
		var suffix = suffixes[order];
		return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
	}
}
    



export default FuelType