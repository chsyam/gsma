import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import loadingStles from "./../../../styles/Loading.module.css";

export default function ChartStatistics({ energyUsageChartData, carbonFootprintChartData, energyStatsLoading }) {
    const energyUsageChartOptions = {
        chart: {
            type: 'areaspline',
            height: 400
        },
        title: {
            text: "Energy Consumption Trend",
            align: 'left',
            style: {
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '24px',
                fontWeight: '600',
            }
        },
        credits: {
            enabled: false
        },
        accessibility: {
            announceNewData: {
                enabled: true
            }
        },
        xAxis: {
            type: 'category',
            labels: {
                enabled: true,
            }
        },
        yAxis: {
            title: {
                text: 'Energy Usage (kWh)'
            },
            labels: {
                enabled: true,
            }
        },
        legend: {
            enabled: true,
        },
        series: [
            {
                name: 'Energy Consumption',
                data: energyUsageChartData
            }
        ],
        plotOptions: {
            areaspline: {
                color: '#4CAF50',
                fillColor: {
                    linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                    stops: [
                        [0, '#4CAF50'],
                        [1, '#32CD3200']
                    ]
                },
                threshold: null,
                marker: {
                    lineWidth: 1,
                    lineColor: null,
                    fillColor: 'white'
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:16px;font-family:Montserrat, sans-serif">{point.key}</span><br/>',
            pointFormat: '<span style="color:{series.color};font-family:Montserrat, sans-serif">{series.name}</span>: <b>{point.y}</b><br/>',
            valueSuffix: '<span style="font-family:Montserrat, sans-serif"> kWh</span>'
        },
    }

    const carbonFootprintChartOptions = {
        chart: {
            type: 'column',
            height: 400
        },
        title: {
            text: "Carbon Footprint Analysis",
            align: 'left',
            style: {
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '24px',
                fontWeight: '600',
            }
        },
        credits: {
            enabled: false
        },
        accessibility: {
            announceNewData: {
                enabled: true
            }
        },
        xAxis: {
            type: 'category',
            labels: {
                enabled: true,
            }
        },
        yAxis: {
            title: {
                text: 'Carbon Emissions (Kg CO₂)'
            },
            labels: {
                enabled: true,
            }
        },
        legend: {
            enabled: true,
        },
        series: [
            {
                name: 'Energy Consumption',
                data: carbonFootprintChartData
            }
        ],
        plotOptions: {
            column: {
                color: '#4CAF50'
            },
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: false,
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:16px;font-family:Montserrat, sans-serif">{point.key}</span><br/>',
            pointFormat: '<span style="color:{series.color};font-family:Montserrat, sans-serif">{series.name}</span>: <b>{point.y}</b><br/>',
            valueSuffix: '<span style="font-family:Montserrat, sans-serif"> kWh</span>'
        },
    }

    return (
        <div className="py-6 mb-8 flex gap-4">
            <div className="flex-grow max-w-[50%] p-2 rounded-md bg-white">
                {
                    energyStatsLoading ? (
                        <div className="flex justify-center flex-nowrap tracking-wide my-[20%]">
                            <div className={loadingStles.loader} />
                            fetching Energy stats....
                        </div>
                    ) : (
                        <HighchartsReact highcharts={Highcharts} options={energyUsageChartOptions} />
                    )
                }
            </div>
            <div className="flex-grow max-w-[50%] p-2 rounded-md bg-white">
                {
                    energyStatsLoading ? (
                        <div className="flex justify-center flex-nowrap tracking-wide my-[20%]">
                            <div className={loadingStles.loader} />
                            fetching Energy stats....
                        </div>
                    ) : (
                        <HighchartsReact highcharts={Highcharts} options={carbonFootprintChartOptions} />
                    )
                }
            </div>
        </div>
    );
}