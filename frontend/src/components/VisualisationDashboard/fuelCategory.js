
import CanvasJSReact from './canvasjs.react';
var React = require('react');
var Component = React.Component;
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


var dataPoints =[];
class FuelCategory extends Component {
    render() {	
		const options = {
			animationEnabled: true,
			backgroundColor: '#202A3B',
			title: {
                text: "Powerplants per fuel type",
                fontColor: "#F1BA13",
                fontSize: 20,
				fontWeight: "bold",
				fontFamily: "Roboto,sans-serif"
			},
			// subtitles: [{
			// 	text: "71% Positive",
			// 	verticalAlign: "center",
			// 	fontSize: 24,
			// 	dockInsidePlotArea: true,
			// 	color: "white",
			// }],
			legend: {
				fontColor: "white",
			},
			data: [{
				type: "doughnut",
				showInLegend: true,
				indexLabel: "{name}: {y}",
				yValueFormatString: "####'%'",
				indexLabelFontColor: "white",
				indexLabelFontSize: 12,
				dataPoints: [
					{
					  y: "59",
					  name: "Hydel"
					},
					{
					  y: "1",
					  name: "Import (IRAN)"
					},
					{
					  y: "40",
					  name: "Renewable"
					},
					{
					  y: "161",
					  name: "Thermal"
					}]
        }]}
        
		return (
		<div>
			<CanvasJSChart options = {options}
				
			/>
		</div>
		);
    }}



export default FuelCategory