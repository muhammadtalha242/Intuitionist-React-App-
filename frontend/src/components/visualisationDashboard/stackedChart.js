import CanvasJSReact from './canvasjs.react';
var React = require('react');

var Component = React.Component;
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


var dataPoints =[];
class StackedChart extends Component {
    constructor() {
		super();
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
	}
	toggleDataSeries(e){
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}
	render() {
		const options = {
			  theme: "light2",
			  animationEnabled: true,
              exportEnabled: true,
              backgroundColor: '#202A3B',
			  title: {
                text: "Energy usage for Air Conditioning",
                fontColor: "#F1BA13",
			  },
			  axisY: {
                title: "Energy (in terawatt hours)",
                titleFontColor: "white",
                labelFontColor: 'white',
              },
              axisX: {
                title: "Date",
                titleFontColor: "white",
                labelFontColor: 'white',
			  },
			  toolTip: {
				shared: true
			  },
			  legend: {
				verticalAlign: "center",
				horizontalAlign: "right",
                reversed: true,
                fontColor: "white",
				cursor: "pointer",
				itemclick: this.toggleDataSeries
			  },
			  data: [
				{
					type: "stackedColumn",
                    name: "Hydel",
                    color: 'orange',
					showInLegend: true,
					xValueFormatString: "YYYY",
					dataPoints: [
						{x: new Date("2020-12-01"), y: 271802.13604899996},
						{x: new Date("2020-01-01"), y: 79094.686434},
						{x: new Date("2020-02-01"), y: 270634.56295799994},
                        {x: new Date("2020-03-01"), y: 451615.47926299996},
                        {x: new Date("2020-04-01"), y: 897943.1608679999},
                        {x: new Date("2020-05-01"), y: 1141320.6402869998},
                        {x: new Date("2020-06-01"), y: 1122460.469761},
                        {x: new Date("2020-07-01"), y: 961996.565729},
                        {x: new Date("2020-08-01"), y: 1018971.0493740002},
                        {x: new Date("2020-09-01"), y: 748553.6317629998},
                        {x: new Date("2020-10-01"), y: 469071.76418399985},
                        {x: new Date("2020-11-01"), y: 505773.54654999997},
					]
				},
				{
					type: "stackedColumn",
					name: "Import (Iran)",
					showInLegend: true,
					xValueFormatString: "YYYY",
					dataPoints: [
                        {x: new Date("2020-12-01"), y: 213675},
						{x: new Date("2020-01-01"), y:219780},
						{x: new Date("2020-02-01"), y: 207570},
                        {x: new Date("2020-03-01"), y: 244200},
                        {x: new Date("2020-04-01"), y: 286935},
                        {x: new Date("2020-05-01"), y: 317460},
                        {x: new Date("2020-06-01"), y: 323565},
                        {x: new Date("2020-07-01"), y: 262515},
                        {x: new Date("2020-08-01"), y: 299145},
                        {x: new Date("2020-09-01"), y: 280830},
                        {x: new Date("2020-10-01"), y:274725},
                        {x: new Date("2020-11-01"), y: 231990},
					]
				},
				{
					type: "stackedColumn",
					name: "Renewable",
					showInLegend: true,
					xValueFormatString: "YYYY",
					dataPoints: [
						{x: new Date("2020-12-01"), y: 0},
						{x: new Date("2020-01-01"), y: 0},
						{x: new Date("2020-02-01"), y: 0},
                        {x: new Date("2020-03-01"), y: 0},
                        {x: new Date("2020-04-01"), y: 0},
                        {x: new Date("2020-05-01"), y: 0},
                        {x: new Date("2020-06-01"), y: 0},
                        {x: new Date("2020-07-01"), y: 0},
                        {x: new Date("2020-08-01"), y: 0},
                        {x: new Date("2020-09-01"), y: 0},
                        {x: new Date("2020-10-01"), y: 0},
                        {x: new Date("2020-11-01"), y: 0},
				]
				},
				{
					type: "stackedColumn",
					name: "Thermal",
					showInLegend: true,
					xValueFormatString: "YYYY",
					dataPoints: [
						{x: new Date("2020-12-01"), y: 3699691.204391986},
						{x: new Date("2020-01-01"), y: 4658238.132079996},
						{x: new Date("2020-02-01"), y: 3145368.537222993},
                        {x: new Date("2020-03-01"), y: 2709760.776086997},
                        {x: new Date("2020-04-01"), y: 3337201.024887998},
                        {x: new Date("2020-05-01"), y: 5023214.340192},
                        {x: new Date("2020-06-01"), y: 5161261.38105099},
                        {x: new Date("2020-07-01"), y: 4731226.040194},
                        {x: new Date("2020-08-01"), y: 5310085.220869996},
                        {x: new Date("2020-09-01"), y: 4740046.808297},
                        {x: new Date("2020-10-01"), y: 4461175.581732996},
                        {x: new Date("2020-11-01"), y: 2889764.980934996},
					]
				}
				
			]
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
}



export default StackedChart