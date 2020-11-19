import React from "react";
import parseCSV from "csv-parse/lib/sync";

import Chart from "../Chart";
import YearSlider from "../YearSlider";

import donationsData from "./DonationsData";


const getDonationsByParty = () => {
    let out = {};

    for (let record of parseCSV(donationsData, {
        columns: true,
        skip_empty_lines: true
    })) {
        let yearRange = record.Period,
            partyGroup = record['Party Group'],
            fossilFuelType = record['Fossil Fuel Type'],
            value = parseInt(record.Value.replace(/,/g, ''));

        if (!(yearRange in out)) out[yearRange] = {};
        if (!(partyGroup in out[yearRange])) out[yearRange][partyGroup] = {};
        if (!(fossilFuelType in out[yearRange][partyGroup])) out[yearRange][partyGroup][fossilFuelType] = 0;

        out[yearRange][partyGroup][fossilFuelType] += value;
    }
    return out;
}


class DonationsByPartyBarChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { year: 2013 };
    }

    render() {
        const year = this.state.year;
        const yearString = `${year - 1}-${year}`
        const donations = getDonationsByParty();

        const partyIcons = {
            'ALP': process.env.PUBLIC_URL + '/img/alp.jpg',
            'LNP': process.env.PUBLIC_URL + '/img/lnp.jpeg',
            'UAP': process.env.PUBLIC_URL + '/img/uap.png'
        };
        const seriesLabel = {
            normal: {
                show: true,
                textBorderColor: '#333',
                textBorderWidth: 2
            }
        }

        const option = {
            title: {
                text: 'Donations by Fossil Fuel Companies ' + yearString
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel: {
                    formatter: '${value}'
                }
            },
            legend: {
                data: ['City Alpha', 'City Beta', 'City Gamma']
            },
            grid: {
                left: 100
            },
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'value',
                name: 'Dollars (AUD)',
                axisLabel: {
                    formatter: '${value}'
                }
            },
            yAxis: {
                type: 'category',
                inverse: true,
                data: ['ALP', 'LNP', 'UAP'],
                axisLabel: {
                    formatter: function (value) {
                        return '{' + value + '| }\n{value|' + value + '}';
                    },
                    margin: 20,
                    rich: {
                        value: {
                            lineHeight: 30,
                            align: 'center'
                        },
                        ALP: {
                            height: 40,
                            align: 'center',
                            backgroundColor: {
                                image: partyIcons.ALP
                            }
                        },
                        LNP: {
                            height: 40,
                            align: 'center',
                            backgroundColor: {
                                image: partyIcons.LNP
                            }
                        },
                        UAP: {
                            height: 40,
                            align: 'center',
                            backgroundColor: {
                                image: partyIcons.UAP
                            }
                        }
                    }
                }
            },
            series: [
                {
                    name: 'Coal',
                    type: 'bar',
                    stack: true,
                    data: [
                        donations[yearString]['Liberal/National Party']['Coal'],
                        donations[yearString]['Labor Party']['Coal'],
                        (donations[yearString]['Palmer United Party'] || {})['Coal'] || null
                    ],
                    label: seriesLabel
                },
                {
                    name: 'Oil and Gas',
                    type: 'bar',
                    stack: true,
                    label: seriesLabel,
                    data: [
                        donations[yearString]['Liberal/National Party']['Oil and Gas'],
                        donations[yearString]['Labor Party']['Oil and Gas'],
                        (donations[yearString]['Palmer United Party'] || {})['Oil and Gas'] || null
                    ]
                },
                {
                    name: 'Coal and Gas',
                    type: 'bar',
                    stack: true,
                    label: seriesLabel,
                    data: [
                        donations[yearString]['Liberal/National Party']['Coal and Gas'],
                        donations[yearString]['Labor Party']['Coal and Gas'],
                        (donations[yearString]['Palmer United Party'] || {})['Coal and Gas'] || null
                    ]
                }
            ]
        };

        return <>
            <Chart options={option}
                   style={{
                       width: (425 * 2) + 'px',
                       height: "40vh",
                       margin: "100px auto 0 auto",
                       border: "1px solid #f0f0f0",
                       boxSizing: "border-box",
                       padding: "10px"
                   }}/>
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
                            year={2013}
                            minYear={2013}
                            maxYear={2018}
                            inBetweenYears={true}
                            onChange={year => {
                                this.setState({ year: year });
                            }}/>

            </div>
        </>;
    }

    componentDidMount() {
        // Animate once only!
        setTimeout(this.__nextAnimationFrame.bind(this), 500);
    }

    __nextAnimationFrame() {
        if (!this.yearSlider) return;
        let year = this.yearSlider.getValue()

        if (year !== 2018) {
            this.yearSlider.setValue(year+1)
            setTimeout(this.__nextAnimationFrame.bind(this), 500);
        }
    }
}

export default DonationsByPartyBarChart;
