import React from "react";
import parseCSV from "csv-parse/lib/sync"
import 'leaflet/dist/leaflet.css';
import {
    MapContainer,
    TileLayer,
    LayerGroup,
    CircleMarker,
    FeatureGroup,
    Popup,
    Polygon,
    Marker,
    Tooltip,
    GeoJSON
} from 'react-leaflet'

//import weatherData from "./weatherdata.csv";
import weatherMetaData from "./weatherdata.json";
import weatherStationGeoJSON from "./australia_weather_stations.json";
import weatherData from "./ACORNWeatherData";


class ACORNWeatherAnimation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: 1950,
            zoom: 3,
            animateInProgress: true
        };
        this.props = props;
        this.minmax = props['minmax'];

        this.key = 0;
        [this.__yearRecords, this.__yearBaselines] = this.__getDataFromCSV();
        this.__geoJSON = JSON.parse(JSON.stringify(weatherStationGeoJSON));
    }

    /***************************************************
     * Data Processing
     ***************************************************/

    /**
     * Parse CSV Weather Data
     */
    __getDataFromCSV() {
        let out = {},
            baselines = {};

        for (let yearRecord of parseCSV(weatherData, {
            columns: true,
            skip_empty_lines: true
        })) {
            out[yearRecord.date] = yearRecord;
            delete yearRecord.date;

            for (let k in yearRecord) {
                if (!baselines[k]) {
                    baselines[k] = yearRecord[k];
                }
            }
        }
        return [out, baselines];
    }

    /***************************************************
     * Template Rendering
     ***************************************************/

    render() {
        const ausCenter = [-28.5, 135];
        const ausBounds = [
            [-5.825793, 104.924160],
            [-47.655947, 165.240103]
        ];

        return (
            <MapContainer
                bounds={ausBounds}
                center={ausCenter}
                zoom={this.state.zoom}
                zoomSnap={0.1}
                style={{ height: "260px", width: "425px", display: "inline-block" }}
                attributionControl={false}
            >
                <FeatureGroup>
                    <Popup>Popup in FeatureGroup</Popup>
                    { this.__getGeoJSON() }
                </FeatureGroup>
                <div style={{
                    position: 'absolute',
                    top: '7px',
                    left: '7px',
                    boxShadow: '0px 0px 5px #888888',
                    background: "white",
                    padding: "3px 10px",
                    zIndex: 500,
                    fontSize: "2em",
                    opacity: 0.8
                }}>
                    {this.minmax}: { this.__avg >= 0 ? (`+${this.__avg}`) : this.__avg }°C
                </div>
            </MapContainer>
        );
    }

    /**
     * Convert parsed weather data for current year to Circle objects
     */
    __getGeoJSON() {
        let yearRecord = this.__yearRecords[this.state.year];
        let total = 0,
            numItems = 0;

        for (let feature of this.__geoJSON['features']) {
            let key = `${feature['properties']['stnum']}_${this.minmax}`;
            let yearBaseline = this.__yearBaselines[key]
            let diffFromBaseline = yearRecord[key] - yearBaseline;
            feature['properties']['diffFromBaseline'] = diffFromBaseline;

            if (! yearRecord[key]) continue;

            if (diffFromBaseline) {
                total += diffFromBaseline;
                numItems += 1;
            }
        }
        if (numItems) this.__avg = parseInt((total / numItems) * 10.0)/10.0;
        else this.__avg = 0;

        function getColor(d) {
            return d > 1.4 ? '#800026' :
                   d > 1.2  ? '#BD0026' :
                   d > 1.0  ? '#E31A1C' :
                   d > 0.8  ? '#FC4E2A' :
                   d > 0.6   ? '#FD8D3C' :
                   d > 0.4   ? '#ffd69c' :
                   d > 0.2   ? '#fff1ce' :
                   d >= 0.0  ? '#ffffff' :
                   d > -0.2 ? '#e6f2ff' :
                   d > -0.4  ? '#c5e7ff' :
                   d > -0.6  ? '#9dd5ff' :
                   d > -0.8  ? '#62b1ec' :
                   d > -1.0   ? '#2378be' :
                   d > -1.2   ? '#07487e' :
                   d > -1.4   ? '#002440' :
                                '#00101d'
                   ;
        }

        function style(feature) {
            return {
                fillColor: getColor(feature.properties.diffFromBaseline),
                weight: 0.5,
                opacity: 1,
                color: 'white',
                fillOpacity: 1
            };
        }

        return <GeoJSON key={this.key++}
                        data={this.__geoJSON}
                        style={style} />;
    }

    /***************************************************
     * Set Year
     ***************************************************/

    setYear(year) {
        this.setState({ year: year });
    }
}

export default ACORNWeatherAnimation;
