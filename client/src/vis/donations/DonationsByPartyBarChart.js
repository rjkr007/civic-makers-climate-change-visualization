import Chart from "../Chart";
import donationsData from "./DonationsData";
import parseCSV from "csv-parse/lib/sync";
import bushfireData from "../bushfires/BushfireData";


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


const DonationsByPartyBarChart = () => {
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
            text: 'Donations by Fossil Fuel Companies'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
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
                    donations['2017-2018']['Liberal/National Party']['Coal'],
                    donations['2017-2018']['Labor Party']['Coal'],
                    //donations['2017-2018']['Palmer United Party']['Coal']
                ],
                label: seriesLabel
            },
            {
                name: 'Oil and Gas',
                type: 'bar',
                stack: true,
                label: seriesLabel,
                data: [
                    donations['2017-2018']['Liberal/National Party']['Oil and Gas'],
                    donations['2017-2018']['Labor Party']['Oil and Gas'],
                    //donations['2017-2018']['Palmer United Party']['Coal']
                ]
            },
            {
                name: 'Coal and Gas',
                type: 'bar',
                stack: true,
                label: seriesLabel,
                data: [
                    donations['2017-2018']['Liberal/National Party']['Coal and Gas'],
                    donations['2017-2018']['Labor Party']['Coal and Gas'],
                    //donations['2017-2018']['Palmer United Party']['Coal']
                ]
            }
        ]
    };
    return <Chart options={option}
                  style={{
                      width: "50vw",
                      height: "50vh",
                      margin: "100px auto 0 auto"
                  }} />;
}

export default DonationsByPartyBarChart;
