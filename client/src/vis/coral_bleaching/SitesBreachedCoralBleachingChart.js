import React from "react";
import Chart from "../Chart";
import echarts from "echarts";


class SitesBreachedCoralBleachingChart extends React.Component {
    DATA = [
        [1998, 1], [1999, 0], [2000, 0], [2001, 2], [2002, 0], [2003, 3],
        [2004, 0], [2005, 1], [2006, 0], [2007, 0], [2008, 1], [2009, 1],
        [2010, 3], [2011, 2], [2012, 1], [2013, 0], [2014, 4], [2015, 4],
        [2016, 6], [2017, 2], [2018, 1], [2019, 5]
    ]
    TOTAL_MONITORING_SITES = 11

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        var option = {
            title: {
                text: 'Proportion of observed Barrier Reef sites ' +
                      'which breached bleaching thresholds 1998-2020',
            },
            xAxis: {
                data: this.DATA.map(i => {return i[0]}),
                axisLabel: {
                },
                axisTick: { show: false },
                axisLine: { show: false },
                z: 10
            },
            yAxis: {
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { }
            },
            dataZoom: [ { type: 'inside' } ],
            series: [
                {
                    type: 'bar',
                    stack: true,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#c23531'},
                                {offset: 0.5, color: '#c23531'},
                                {offset: 1, color: '#c23531'}
                            ]
                        )
                    },
                    data: this.DATA.map(i => {return i[1]})
                },
                {
                    type: 'bar',
                    stack: true,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#83bff6'},
                                {offset: 0.5, color: '#83bff6'},
                                {offset: 1, color: '#83bff6'}
                            ]
                        )
                    },
                    data: this.DATA.map(i => {return this.TOTAL_MONITORING_SITES-i[1]})
                }
            ]
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
            </div>
        </>;
    }
}

export default SitesBreachedCoralBleachingChart;
