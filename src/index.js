import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var url = 'https://api.openweathermap.org/data/2.5/weather?q=';
var key = '&appid=8c3a9b5cd702121d65eb503fc92a6c65';

class WeatherForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
	this.handleToggle = this.handleToggle.bind(this);
        this.sendQuery = this.sendQuery.bind(this);
	this.state = ({city: '', state: '', country: '', report: false, fah: false});
        this.getWeather = this.getWeather.bind(this);
    }

    handleChange(event) {
        const changed = event.target.id;

        this.setState({[changed]: event.target.value});
    }

    handleToggle(event) {
	var unit = document.getElementById('fUnit');
	if (unit.checked)
	    this.setState({fah: true});
	else 
	    this.setState({fah: false});
    }

    async sendQuery(event) {
         event.preventDefault();

	 var units = '';
	 if (this.state.fah) {
	     units = '&units=imperial';
	 } else {
	     units = '&units=metric';
	 }
         
	 var query = url + this.state.city + units + key;
	 const response = await fetch(query);
	 const data = await response.json();
	 console.log(data);

	 var wantedInfo = [data.name + ' ,' + data.sys.country,
             data.weather[0].main,
             data.weather[0].description,
             data.main.temp];

	 this.setState({report: true, data: wantedInfo});
    }

   getWeather() {
       if (this.state.report)
       {
           return <WeatherReport data={this.state.data} unit={this.state.fah}/>
       }
   }

    render() {
        return (
	<div id='app'>
	    <h1 id='header'>What's the Weather?</h1>
	    <div id='locationForm'>
                <form onSubmit={this.sendQuery}>
                    <input id='city' className='inputField' type='text' onChange={this.handleChange} 
		        placeholder='Enter city' required></input>
		    <input id='state' className='inputField' type='text'  onChange={this.handleChange} 
		        placeholder='Enter state code (optional)'></input>
                    <input id='country' className='inputField' type='text'  onChange={this.handleChange} 
		        placeholder='Enter country code (optional)'></input>
	            <input id='fUnit' type='radio' name='unit' value='0' onClick={this.handleToggle}></input>
                          <label>'°F'</label><br></br>
                    <input id='cUnit' type='radio' name='unit' value='0' onClick={this.handleToggle}></input>
                          <label>'°C'</label>
                    <input type='submit' id='submitButton' value='Get Report' style={{marginLeft: 30 + 'px'}}></input>
                </form>
		{ this.getWeather() }
            </div>
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

    displayTemp(temp) {
        if (this.props.unit)
	    return <h1>{temp + ' °F'}</h1>
        else
	    return <h1>{temp + ' °C'}</h1>
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
		{this.displayTemp(data[3])}
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
