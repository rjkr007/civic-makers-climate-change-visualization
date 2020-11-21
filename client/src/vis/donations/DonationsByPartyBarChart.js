import React from "react";
import parseCSV from "csv-parse/lib/sync";

import Chart from "../Chart";
import YearSlider from "../YearSlider";

import donationsData from "./DonationsData";


class DonationsByPartyBarChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { year: 2013 };
        this.__donationsByParty = this.__getDonationsByParty();
    }

    /***************************************************
     * Data Processing
     ***************************************************/

    /**
     * Parse the CSV donations data
     *
     * @returns {{}}
     * @private
     */
    __getDonationsByParty() {
        let out = {};

        // A bit of validation, to make
        // sure we're using all the data
        const allowedParties = new Set([
            'Liberal/National Party', 'Labor Party',
            'Palmer United Party', 'KAP', 'One Nation'
        ]);
        const allowedFossilFuelTypes = new Set([
            'Coal', 'Oil and Gas', 'Coal and Gas',
            'All', 'Gas', 'CSG'
        ]);

        for (let record of parseCSV(donationsData, {
            columns: true,
            skip_empty_lines: true
        })) {
            let yearRange = record['Period'],
                partyGroup = record['Party Group'],
                fossilFuelType = record['Fossil Fuel Type'],
                value = parseInt(record['Value'].replace(/,/g, ''));

            if (!allowedParties.has(partyGroup)) {
                throw "unknown party: " + partyGroup
            } else if (!allowedFossilFuelTypes.has(fossilFuelType)) {
                throw "unknown fossil fuel type: " + fossilFuelType
            }

            if (!(yearRange in out)) {
                out[yearRange] = {};
            }
            if (!(partyGroup in out[yearRange])) {
                out[yearRange][partyGroup] = {};
            }
            if (!(fossilFuelType in out[yearRange][partyGroup])) {
                out[yearRange][partyGroup][fossilFuelType] = 0;
            }
            out[yearRange][partyGroup][fossilFuelType] += value;
        }
        return out;
    }

    /***************************************************
     * Template Rendering
     ***************************************************/

    /**
     * The icons associated with each political party's
     * links to the file in the "/client/public/imgs/" folder
     *
     * @type {{OneNation: string, ALP: string, UAP: string, KAP: string, LNP: string}}
     */
    PARTY_ICONS = {
        'ALP': process.env.PUBLIC_URL + '/img/alp.png',
        'LNP': process.env.PUBLIC_URL + '/img/lnp.png',
        'UAP': process.env.PUBLIC_URL + '/img/uap.png',
        'KAP': process.env.PUBLIC_URL + '/img/kap.png',
        'OneNation': process.env.PUBLIC_URL + '/img/one_nation.png'
    }

    render() {
        const year = this.state.year,
              yearString = `${year - 1}-${year}`,
              [max, yAxisData, series] = this.__getSeries(yearString);
        this.__max = max;

        const option = {
            title: {
                text: 'Donations by Fossil Fuel Companies ' + yearString
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: (params) => {
                    let that = this;
                    return (
                        `<div>Party ${params[0].axisValueLabel}</div>` +
                        params.map(param => {
                            let value = that.__formatAUDollar(param);
                            return (
                                `<div style="text-align: left; border-bottom: 1px solid ${param.color}; border-left: 8px solid ${param.color}; padding-left: 3px;">` +
                                `<span style="padding: 0; display: inline; margin: 0">` +
                                `${param.seriesName}&nbsp;&nbsp;` +
                                `<span style="float: right; padding: 0; display: inline; margin: 0">` +
                                `${value}` +
                                `</span>` +
                                `</span>` +
                                `</div>`
                            );
                        }).join('')
                    );
                }
            },
            legend: { top: 50 },
            grid: { top: 90, bottom: 40, left: 140, right: 50 },
            toolbox: { show: false, feature: {} },
            xAxis: {
                type: 'value',
                name: '$AUD',
                axisLabel: {
                    formatter: '${value}'
                }
            },
            yAxis: {
                type: 'category',
                inverse: true,
                data: yAxisData,
                axisLabel: {
                    formatter: function (value) {
                        return `{${value}| }\n{value|${value.replace('OneNation', 'One Nation')}}`;
                    },
                    margin: 20,
                    rich: {
                        value: {
                            lineHeight: 20,
                            align: 'right'
                        },
                        ALP: this.__getYAxisImageItem('ALP'),
                        LNP: this.__getYAxisImageItem('LNP'),
                        UAP: this.__getYAxisImageItem('UAP'),
                        KAP: this.__getYAxisImageItem('KAP'),
                        OneNation: this.__getYAxisImageItem('OneNation')
                    }
                }
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
                    year={2013}
                    minYear={2013}
                    maxYear={2018}
                    inBetweenYears={true}
                    onChange={year => {
                        this.setState({ year: year });
                    }}
                />
            </div>
        </>;
    }

    /**
     * Get the party image configuration for the Y axis
     *
     * @param key
     * @returns {{backgroundColor: {image: *}, align: string, height: number}}
     * @private
     */
    __getYAxisImageItem(key) {
        return {
            height: 40,
            align: 'right',
            backgroundColor: {
                image: this.PARTY_ICONS[key]
            }
        }
    }

    /**
     * Get the series data for eCharts
     *
     * @param yearString
     * @returns {(number|[])[]}
     * @private
     */
    __getSeries(yearString) {
        var keys = ['Oil and Gas', 'Coal', 'Coal and Gas', 'All', 'Gas', 'CSG'];
        let r = [],
            yAxisData = new Set(),
            max = 0,
            donations = this.__donationsByParty,
            parties = [
                ['Liberal/National Party', 'LNP'],
                ['Labor Party', 'ALP'],
                ['Palmer United Party', 'UAP'],
                ['One Nation', 'OneNation'],
                ['KAP', 'KAP']
            ];

        for (let key of keys.slice(0)) {
            let found = false;
            for (let [partyKey, partyMapping] of parties) {
                if ((donations[yearString][partyKey] || {})[key]) {
                    yAxisData.add(partyMapping)
                    found = true;
                }
            }
            if (!found) {
                keys = keys.filter(i => {
                    return i !== key
                })
            }
        }
        let yAxisOut = [];
        for (let [partyKey, partyMapping] of parties) {
            if (yAxisData.has(partyMapping)) yAxisOut.push(partyMapping)
        }

        for (let key of keys) {
            let data = [];
            for (let [partyKey, partyMapping] of parties) {
                if (yAxisData.has(partyMapping)) {
                    data.push((donations[yearString][partyKey] || {})[key] || null);
                }
            }

            r.push({
                name: key,
                type: 'bar',
                stack: true,
                data: data,
                label: {
                    normal: {
                        show: true,
                        textBorderColor: '#333',
                        textBorderWidth: 2,
                        formatter: (value) => {
                            if (value.value < this.__max/15.0) {
                                // Only display the number if there's enough space!
                                return '';
                            }
                            return this.__formatAUDollar(value);
                        }
                    }
                }
            });

            let i_max = 0;
            for (let x of r[r.length-1]['data']) {
                i_max += x||0;
            }
            if (i_max > max) max = i_max
        }

        return [max, yAxisOut, r];
    }

    /**
     * Format an eCharts value object as Australian currency
     *
     * @param value an object with a 'value' key
     * @returns {string}
     * @private
     */
    __formatAUDollar(value) {
        return value.value ? value.value.toLocaleString('en-AU', {
            style: 'currency', currency: 'AUD'
        }).split('.')[0] : '-';
    }

    /***************************************************
     * Initial Animation
     ***************************************************/

    componentDidMount() {
        // Animate once only!
        setTimeout(this.__nextAnimationFrame.bind(this), 1000);
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

        if (year !== 2018) {
            this.yearSlider.setValue(year+1)
            setTimeout(this.__nextAnimationFrame.bind(this), 1000);
        }
    }
}

export default DonationsByPartyBarChart;
