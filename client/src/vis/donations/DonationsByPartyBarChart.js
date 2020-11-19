import React from "react";
import parseCSV from "csv-parse/lib/sync";

import Chart from "../Chart";
import YearSlider from "../YearSlider";

import donationsData from "./DonationsData";


const getDonationsByParty = () => {
    let out = {};

    const allowedParties = new Set(['Liberal/National Party', 'Labor Party', 'Palmer United Party', 'KAP', 'One Nation']);
    const allowedFossilFuelTypes = new Set(['Coal', 'Oil and Gas', 'Coal and Gas', 'All', 'Gas', 'CSG']);

    for (let record of parseCSV(donationsData, {
        columns: true,
        skip_empty_lines: true
    })) {
        let yearRange = record.Period,
            partyGroup = record['Party Group'],
            fossilFuelType = record['Fossil Fuel Type'],
            value = parseInt(record.Value.replace(/,/g, ''));

        if (!allowedParties.has(partyGroup)) throw "unknown party: "+partyGroup
        if (!allowedFossilFuelTypes.has(fossilFuelType)) throw "unknown fossil fuel type: "+fossilFuelType

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
            'UAP': process.env.PUBLIC_URL + '/img/uap.png',
            'KAP': process.env.PUBLIC_URL + '/img/kap.png',
            'OneNation': process.env.PUBLIC_URL + '/img/one_nation.png'
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
                top: 50
            },
            grid: {
                top: 90,
                bottom: 40,
                left: 120,
                right: 100
            },
            toolbox: {
                show: false,
                feature: {
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
                data: ['LNP', 'ALP', 'UAP', 'OneNation', 'KAP'],
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
                        ALP: {
                            height: 30,
                            align: 'right',
                            backgroundColor: {
                                image: partyIcons.ALP
                            }
                        },
                        LNP: {
                            height: 30,
                            align: 'right',
                            backgroundColor: {
                                image: partyIcons.LNP
                            }
                        },
                        UAP: {
                            height: 30,
                            align: 'right',
                            backgroundColor: {
                                image: partyIcons.UAP
                            }
                        },
                        KAP: {
                            height: 30,
                            align: 'right',
                            backgroundColor: {
                                image: partyIcons.KAP
                            }
                        },
                        OneNation: {
                            height: 30,
                            align: 'right',
                            backgroundColor: {
                                image: partyIcons.OneNation
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
                        (donations[yearString]['Palmer United Party'] || {})['Coal'] || null,
                        (donations[yearString]['One Nation'] || {})['Coal'] || null,
                        (donations[yearString]['KAP'] || {})['Coal'] || null,
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
                        (donations[yearString]['Palmer United Party'] || {})['Oil and Gas'] || null,
                        (donations[yearString]['One Nation'] || {})['Oil and Gas'] || null,
                        (donations[yearString]['KAP'] || {})['Oil and Gas'] || null,
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
                        (donations[yearString]['Palmer United Party'] || {})['Coal and Gas'] || null,
                        (donations[yearString]['One Nation'] || {})['Coal and Gas'] || null,
                        (donations[yearString]['KAP'] || {})['Coal and Gas'] || null,
                    ]
                },
                {
                    name: 'All',
                    type: 'bar',
                    stack: true,
                    data: [
                        donations[yearString]['Liberal/National Party']['All'],
                        donations[yearString]['Labor Party']['All'],
                        (donations[yearString]['Palmer United Party'] || {})['All'] || null,
                        (donations[yearString]['One Nation'] || {})['All'] || null,
                        (donations[yearString]['KAP'] || {})['All'] || null,
                    ],
                    label: seriesLabel
                },
                {
                    name: 'Gas',
                    type: 'bar',
                    stack: true,
                    label: seriesLabel,
                    data: [
                        donations[yearString]['Liberal/National Party']['Gas'],
                        donations[yearString]['Labor Party']['Gas'],
                        (donations[yearString]['Palmer United Party'] || {})['Gas'] || null,
                        (donations[yearString]['One Nation'] || {})['Gas'] || null,
                        (donations[yearString]['KAP'] || {})['Gas'] || null,
                    ]
                },
                {
                    name: 'CSG',
                    type: 'bar',
                    stack: true,
                    label: seriesLabel,
                    data: [
                        donations[yearString]['Liberal/National Party']['CSG'],
                        donations[yearString]['Labor Party']['CSG'],
                        (donations[yearString]['Palmer United Party'] || {})['CSG'] || null,
                        (donations[yearString]['One Nation'] || {})['CSG'] || null,
                        (donations[yearString]['KAP'] || {})['CSG'] || null,
                    ]
                },
            ]
        };

        return <>
            <Chart options={option}
                   style={{
                       width: (425 * 2) + 'px',
                       height: "450px",
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
