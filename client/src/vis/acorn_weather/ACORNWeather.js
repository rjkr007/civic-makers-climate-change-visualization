import React from "react";
import ACORNWeatherAnimation from "./ACORNWeatherAnimation";
import YearSlider from "./YearSlider";

class ACORNWeather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <>
            <div style={{ margin: "0 auto" }}>
                <ACORNWeatherAnimation ref={el => this.minWeatherControl = el}
                                       minmax="min"/>
                <ACORNWeatherAnimation ref={el => this.maxWeatherControl = el}
                                       minmax="max"/>
            </div>
            <div style={{
                margin: "-5px auto 0 auto",
                width: (425*2)+'px',
                background: "#eee",
                padding: "10px 0"
            }}>
                <YearSlider year={1910}
                            minYear={1910}
                            maxYear={2019}
                            onChange={year => {
                                this.minWeatherControl.setYear(year);
                                this.maxWeatherControl.setYear(year);
                            }} />
            </div>
        </>
    }
}

export default ACORNWeather;
