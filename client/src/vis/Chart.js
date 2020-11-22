import React, { useRef, useEffect } from "react"
import echarts from "echarts"

function Chart({ options, style }) {
    const myChart = useRef(null)
    useEffect(() => {
        const chart = echarts.init(myChart.current)
        chart.setOption(options)
    }, [options]);

    return (
        <div style={style}>
            <div ref={myChart}
                 style={{
                     width: "100%",
                     height: "100%",
                 }}
            />
        </div>
    );
}

export default Chart;
