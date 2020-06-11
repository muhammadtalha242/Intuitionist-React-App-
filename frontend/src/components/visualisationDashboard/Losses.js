
import CanvasJSReact from './canvasjs.react';
import data from "./losses.json";

var React = require('react');
var Component = React.Component;
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


var dataPoints =[];
class Losses extends Component {
    render() {	
		const options = {
            theme: "light2",
			animationEnabled: true,
			backgroundColor: '#202A3B',
			title: {
				text: "Losses Per Year",
				fontColor: "#F1BA13",
				fontSize: 20,
				fontFamily: "Roboto,sans-serif",
				fontWeight: "bold"
			},
			axisY: {
				title: "loss",
				prefix: "PKR",
				includeZero: false,
				titleFontColor: "white",
				labelFontColor: 'white',
			},
			axisX: {
				title: "Date (Year)",
				includeZero: false,
				titleFontColor: "white",
				labelFontColor: 'white',
			},
			data: [{
				type: "line",
				xValueFormatString: "YYYY",
				// yValueFormatString: "",
				dataPoints: dataPoints
			}]
		}
		return (
		<div>
				<CanvasJSChart options = {options} 
					onRef={ref => this.chart = ref}
				/>
		</div>
		);
	}
	
	componentDidMount(){
		var chart = this.chart;
		const newData= data.map((d)=>{
			dataPoints.push({
				x: new Date(d.x),
				y: parseFloat(d.y)
					});
		})
		chart.render();
	}
}


export default Losses