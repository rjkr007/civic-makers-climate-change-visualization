import React from "react";
import ACORNWeatherAnimation from "./ACORNWeatherAnimation";
import YearSlider from "../YearSlider";

class ACORNWeather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <>
            <div style={{ margin: "6em auto 0 auto" }}>
                <ACORNWeatherAnimation ref={el => this.minWeatherControl = el}
                                       minmax="min"/>
                <ACORNWeatherAnimation ref={el => this.maxWeatherControl = el}
                                       minmax="max"/>
            </div>
            <div style={{
                margin: "-5px auto 0 auto",
                width: (425*2)+'px',
                background: "#f0f0f0",
                padding: "10px 0"
            }}>
                <div style={{padding: "5px 40px 13px 40px", color: "#555"}}>
                    Diagram shows the average increase in maximum and minimum
                    temperatures compared to the first readings taken at each ACORN weather
                    station site. Temperatures are averaged over the last 5 years.
                </div>

                <YearSlider ref={el => this.yearSlider = el}
                            year={2019-90}
                            minYear={1920}
                            maxYear={2019}
                            onChange={year => {
                                this.minWeatherControl.setYear(year);
                                this.maxWeatherControl.setYear(year);
                            }} />

            </div>
        </>
    }

    componentDidMount() {
        this.__nextAnimationFrame();
    }

    __nextAnimationFrame() {
        if (!this.yearSlider) return;
        let year = this.yearSlider.getValue();

        if (year === 2019) {
            this.setState({ animateInProgress: false });
        } else {
            this.yearSlider.setValue(year + 10);
            setTimeout(this.__nextAnimationFrame.bind(this), 300); // (((year-1910)/10)**2)/2
        }
    }
}

export default ACORNWeather;
