import React from 'react';
export default class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = { city: "", temp: ""};
    }

    showPosition(position) {
        const long = position.coords.longitude;
        const lat = position.coords.latitude;
        const weatherD = this.loadXMLDoc(long, lat).then((weatherData) => {
        const farenheit = Math.round(((weatherData.main.temp - 273.15) * 1.8) + 32); 
        // console.log(farenheit); 
        this.setState({ city: weatherData.name, temp: farenheit });
        });
        // debugger
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(this.showPosition.bind(this));
        
    }

    loadXMLDoc(long, lat) {
        return new Promise(function (resolve, reject) {
            let xmlhttp = new XMLHttpRequest();

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
                    if (xmlhttp.status == 200) {
                        // console.log("hi");
                        resolve(JSON.parse(xmlhttp.responseText));
                    }
                    else if (xmlhttp.status == 400) {
                        reject(Error('There was an error 400'));
                    }
                    else {
                        reject(Error('something else other than 200 was returned'));
                    }
                }
            };

            xmlhttp.open("GET", `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=`, true); //put api key after app id
            xmlhttp.send();
        });
    }

    render() {
        return (
            <div className="weather-div">
                <h1>Weather</h1>
                <h2>{this.state.city}</h2>
                <h3>{this.state.temp}</h3>
            </div>
        );
    }
}