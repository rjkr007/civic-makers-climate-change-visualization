import React from "react";
import parseCSV from "csv-parse/lib/sync";

import Chart from "../Chart";
import YearSlider from "../YearSlider";

import averageTempsData from "./sitesAverageTempsData";
import averageTempsMetadata from "./sitesAverageTempsMetadata";


class SitesAverageTempsChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { year: 1999 };
        this.__averageTempsByStation = this.__getAverageTempsByStation();
    }

    /***************************************************
     * Data Processing
     ***************************************************/

    /**
     * Parse the CSV average temperature data
     *
     * @returns {{}}
     * @private
     */
    __getAverageTempsByStation() {
        let out = {};

        for (let record of parseCSV(averageTempsData, {
            columns: true, skip_empty_lines: true
        })) {
            let date = record['date'],
                year = parseInt(date.split('-')[0]),
                month = parseInt(date.split('-')[1]),
                degc = parseFloat(record['degc']),
                station = record['station'];

            if (month >= 6) {
                year += 1;
            }

            if (!(station in out)) {
                out[station] = {};
            }
            if (!(year in out[station])) {
                out[station][year] = [];
            }
            out[station][year].push([date, degc]);
        }
        return out;
    }

    /***************************************************
     * Template Rendering
     ***************************************************/

    render() {
        const year = this.state.year,
              yearString = `${year - 1}-${year}`,
              series = this.__getSeries(yearString);

        const option = {
            title: {
                text: 'Great Barrier Reef Temperatures ' + yearString
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: { top: 50 },
            grid: { top: 90, bottom: 40, left: 140, right: 50 },
            toolbox: { show: false, feature: {} },
            xAxis: {
                type: 'time', // CHECK ME!
                name: 'date',
                axisLabel: {}
            },
            yAxis: {
                min: 22,
                max: 33,
                type: 'value',
                axisLabel: {}
            },
            series: series
        };

        return <>
            <Chart
                options={option}
                style={{
                    width: (425 * 2) + 'px',
                    height: "400px",
                    margin: "100px auto 0 auto",
                    border: "1px solid #f0f0f0",
                    boxSizing: "border-box",
                    padding: "10px"
                }}
            />
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

                <YearSlider
                    ref={el => this.yearSlider = el}
                    year={1999}
                    minYear={1999}
                    maxYear={2020}
                    inBetweenYears={true}
                    onChange={year => {
                        this.setState({ year: year });
                    }}
                />
            </div>
        </>;
    }

    /**
     * Get the series data for eCharts
     *
     * @param yearString
     * @returns {(number|[])[]}
     * @private
     */
    __getSeries(yearString) {
        let r = [];
        for (let stationName in this.__averageTempsByStation) {
            r.push({
                name: stationName,
                type: 'line',
                data: this.__averageTempsByStation[stationName][this.state.year]
            });
        }
        return r;
    }

    /***************************************************
     * Initial Animation
     ***************************************************/

    componentDidMount() {
        // Animate once only!
        setTimeout(this.__nextAnimationFrame.bind(this), 500);
    }

    /**
     * Walk through each year, to show how much
     * donations have changed throughout the years
     *
     * @private
     */
    __nextAnimationFrame() {
        if (!this.yearSlider) return;
        let year = this.yearSlider.getValue()

        if (year !== 2020) {
            this.yearSlider.setValue(year+1)
            setTimeout(this.__nextAnimationFrame.bind(this), 500);
        }
    }
}

export default SitesAverageTempsChart;
