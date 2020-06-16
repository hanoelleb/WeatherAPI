import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var url = 'https://api.openweathermap.org/data/2.5/weather?q=';
var key = '&appid=8c3a9b5cd702121d65eb503fc92a6c65';

class WeatherForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.sendQuery = this.sendQuery.bind(this);
	this.state = ({city: '', state: '', country: '', report: false});
        this.getWeather = this.getWeather.bind(this);
    }

    handleChange(event) {
        const changed = event.target.id;

        this.setState({[changed]: event.target.value});
    }

    async sendQuery(event) {
         event.preventDefault();

	 const response = await fetch(url + this.state.city + key);
	 const data = await response.json();
	 console.log(data);

	 var wantedInfo = [data.name + ' ,' + data.sys.country,
             data.weather[0].main,
             data.weather[0].description,
             data.main.temp];

	 //console.log('report for ' + data.name + ' ,' + data.sys.country);
         //console.log('weather: ' + data.weather[0].main);
         //console.log('desc: ' + data.weather[0].description);
         //console.log('temp: ' + data.main.temp);

	 this.setState({report: true, data: wantedInfo});
    }

   getWeather() {
       if (this.state.report)
       {
           return <WeatherReport data={this.state.data}/>
       }
   }

    render() {
        return (
	    <div>
                <form onSubmit={this.sendQuery}>
                    <input id='city' type='text' onChange={this.handleChange} placeholder='Enter city' required></input>
		    <input id='state' type='text'  onChange={this.handleChange} placeholder='Enter state code (optional)'></input>
                    <input id='country' type='text'  onChange={this.handleChange} placeholder='Enter country code (optional)'></input>
		    <input type='submit' value='Get Report'></input>
                </form>
		{ this.getWeather() }
            </div>
	)
    };
}

class WeatherReport extends React.Component {

    constructor(props) {
         super(props);
	 this.state = ({scale: 0});
         this.displayData = this.displayData.bind(this);
    }

    displayData() {
        const data = this.props.data;
	console.log('report for ' + data[0]);
        console.log('weather: ' + data[1]);
        console.log('desc: ' + data[2]);
	console.log('temp: ' + data[3]);

        return (
            <div>
                <h1>{data[0]}</h1>
                <h1>{data[3]}</h1>
		<h2>{data[1]}</h2>
                <h3>{data[2]}</h3>
            </div>
	)
    }

    render() {
	//const data = this.props.data;
        return (
	    <div>
	        {this.displayData()}
            </div>
	)
    }
}

ReactDOM.render(
    <WeatherForm />,
    document.getElementById('root')
);
