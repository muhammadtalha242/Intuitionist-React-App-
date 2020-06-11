import CanvasJSReact from './canvasjs.react';
import data from "./Epp.json";
import FuelCategory from './fuelCategory'
import FuelType from './fuelType'
import Losses from './Losses'
import StackedChart from './stackedChart';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './chart.css';
var React = require('react');
var Component = React.Component;
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


var dataPoints =[];
class Chart extends Component {
	render() {	
		const options = {
			animationEnabled: true,
			theme: "light2",
			backgroundColor: '#202A3B',
			title: {
				text: "Energy Purchase Price",
				fontColor: "#F1BA13",
        		fontSize: 30,
			},
			axisY: {
				title: "Price in PKR",
				prefix: "PKR",
				titleFontColor: "white",
				labelFontColor: 'white',
				includeZero: false
			},
			axisX: {
				title: "Date",
				titleFontColor: "white",
				labelFontColor:'white',
				includeZero: false
			},
			data: [{
				color: '#1D91C0',
				type: "area",
				xValueFormatString: "MMM YYYY",
				// yValueFormatString: "",
				dataPoints: dataPoints
			}]
		}
		return (
			<div>
			<Grid container spacing={3} style={{backgroundColor:'#131924'}}>
				<Grid item xs={12} style={{margin:'2%'}}>
					<CanvasJSChart options = {options} 
						onRef={ref => this.chart = ref}
					/>
				</Grid>
				<Grid item xs={10} style={{marginLeft:'8%',marginBottom:'2%'}}>
					<StackedChart style={{width:'40%'}}/>
				</Grid>
				<Grid item xs={3} style={{marginLeft:'5%',marginBottom:'2%'}}>
					<FuelCategory/>
				</Grid>
				<Grid item xs={5} style={{marginBottom:'2%'}}>
					<FuelType/>
				</Grid>
				<Grid item xs={3}>
					<Losses/>
				</Grid>

			</Grid>
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


export default Chart