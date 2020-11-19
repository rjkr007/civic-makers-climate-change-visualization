import React from "react";
import parseCSV from "csv-parse/lib/sync";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Circle, FeatureGroup, Popup } from 'react-leaflet';
import bushfireData from "./BushfireData";
import YearSlider from "../YearSlider";


class BushfireAnimation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: 2003,
            zoom: 3.75,
            animateInProgress: true
        };

        this.__yearRecords = this.__getDataFromCSV();
    }

    __nextAnimationFrame() {
        if (this.state.year === 2020) {
            this.setState({ animateInProgress: false });
        } else {
            this.setYear(this.state.year + 1);
            setTimeout(this.__nextAnimationFrame.bind(this), 500);
        }
    }

    /***************************************************
     * Data Processing
     ***************************************************/

    /**
     * Parse CSV Weather Data
     */
    __getDataFromCSV() {
        let out = {};

        for (let record of parseCSV(bushfireData, {
            columns: true,
            skip_empty_lines: true
        })) {
            let year = parseInt(record.date.split('/')[0]);
            let month = parseInt(record.date.split('/')[1]);
            if (month <= 6) year -= 1;
            year++;

            if (!(year in out)) out[year] = [];
            out[year].push(record);
        }
        return out;
    }

    /***************************************************
     * Template Rendering
     ***************************************************/

    render() {
        const ausCenter = [-28.3, 135.628836];
        const ausBounds = [
            [-5.825793, 104.924160],
            [-47.655947, 165.240103]
        ];

        return <>
            <MapContainer
                bounds={ausBounds}
                center={ausCenter}
                zoom={this.state.zoom}
                zoomSnap={0.1}
                style={{
                    height: "425px",
                    width: (425 * 2) + "px",
                    margin: "65px auto 0 auto"
                }}>
                <TileLayer
                    attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
                    url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                />
                <FeatureGroup>
                    <Popup>Popup in FeatureGroup</Popup>
                    { this.__getCircles() }
                </FeatureGroup>
                <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    boxShadow: '0px 0px 5px #888888',
                    background: "white",
                    padding: "5px",
                    zIndex: 500,
                    fontSize: "2em",
                    opacity: 0.8
                }}>
                    { this.state.year-1 } - { this.state.year }
                </div>
            </MapContainer>
            <div style={{
                margin: "-5px auto 0 auto",
                width: (425 * 2) + 'px',
                background: "#f0f0f0",
                padding: "10px 0",
                marginBottom: "100px"
            }}>
                <div style={{padding: "5px 40px 13px 40px", color: "#555"}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse sed lacus et nulla cursus iaculis.
                    Mauris ipsum massa, rhoncus a laoreet nec, efficitur at arcu.
                </div>

                <YearSlider ref={el => this.yearSlider = el}
                            year={2003}
                            minYear={2003}
                            maxYear={2020}
                            inBetweenYears={true}
                            onChange={year => {
                                this.setState({ year: year });
                            }}/>

            </div>
        </>;
    }

    /**
     * Convert parsed weather data for current year to Circle objects
     */
    __getCircles() {
        let out = [];
        let yearRecords = this.__yearRecords[this.state.year];

        for (let record of yearRecords) {
            // Max data
            let flareCoords = [record['lat'], record['long']];
            let color = 'red'; //`rgb(${record.temp_kelvin-273.15-180}, 0, 0)`;
            // (record.temp_kelvin-450)*100
            out.push(
                <Circle center={flareCoords}
                        radius={500}
                        pathOptions={{
                          color: color,
                          fillColor: color
                        }} />
            );
        }
        return out;
    }

    componentDidMount() {
        setTimeout(this.__nextAnimationFrame.bind(this), 1000);
    }

    /***************************************************
     * Set Year
     ***************************************************/

    setYear(year) {
        this.yearSlider.setValue(year);
    }
}

export default BushfireAnimation;
