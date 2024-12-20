import React, { useEffect, useState } from "react";
import styles from "./../../../styles/dashboard/AddApplication.module.css"
import { format } from "date-fns";
import MaturityIndicator from "../recommendations/MaturityIndicator";
import Recommendations from "../recommendations/Recommendations";
import dynamic from 'next/dynamic';
import { Download, Triangle } from "lucide-react";
import { Button, Divider } from "@mui/material";
import CountUp from "react-countup";
import TriangleSVG from "../../icons/TriangleSVG";
import HighchartsReact from "highcharts-react-official";
import Highcharts, { chart } from "highcharts";
import ChartStatistics from "./ChatStatistics";

const Select = dynamic(() => import('react-select'), { ssr: false });

export default function ProjectAnalysis({ maturityLevel, implementedAreas, unImplementedAreas, energyStats }) {
    const [active, setActive] = useState('dashboard');
    const getFormattedDate = (date) => {
        // return format(date, "dd/MM/yyyy hh:mm a");
        return "time"
    }

    const timeOptions = [
        { value: 'Week', label: 'Weekly' },
        { value: 'Month', label: 'Monthly' },
        { value: 'Three Months', label: 'Quarterly' },
    ];
    const [selectedOption, setSelectedOption] = useState(timeOptions[0])

    const handleChange = (selected) => {
        setSelectedOption(selected);
    };

    const [stats, setStats] = useState({});
    const [energyUsageChartData, setEnergyUsageChartData] = useState([]);
    const [carbonFootprintChartData, setCarbonFootprintChartData] = useState([]);

    useEffect(() => {
        let temp = {
            'carbon_emissions': {
                label: 'Carbon Emissions',
                amount: 0,
                units: 'Kg CO₂',
                previousAmount: 0,
            },
            'total_cost': {
                label: 'Cost',
                amount: 0,
                units: 'USD',
                previousAmount: 0,
            },
            'energy_usage': {
                label: 'Total Energy',
                amount: 0,
                units: 'kWh',
                previousAmount: 0,
            },
            'grid_factor': {
                label: 'Grid Factor',
                amount: 0,
                units: 'gCO₂e/kWh',
                previousAmount: 0,
            }
        };

        let energyUsageChartTempData = {
            '1 week': [],
            '1 month': [],
            '3 months': []
        };
        let carbonFootprintChartTempData = {
            '1 week': [],
            '1 month': [],
            '3 months': []
        };
        energyStats?.map((stat, index) => {
            if (stat.period_name === `This ${selectedOption.value}`) {
                temp['energy_usage'].amount = stat['energy_usage'];
                temp['carbon_emissions'].amount = stat['carbon_emissions'];
                temp['total_cost'].amount = stat['total_cost'];
                temp['grid_factor'].amount = stat['grid_factor'];
            }
            if (stat.period_name === `Previous ${selectedOption.value}`) {
                temp['energy_usage'].previousAmount = stat['energy_usage'];
                temp['carbon_emissions'].previousAmount = stat['carbon_emissions'];
                temp['total_cost'].previousAmount = stat['total_cost'];
                temp['grid_factor'].previousAmount = stat['grid_factor'];
            }
            if (stat.report_type === 'weekly') {
                energyUsageChartTempData[stat.timeframe].push([stat.period_name, stat['energy_usage']]);
                carbonFootprintChartTempData[stat.timeframe].push([stat.period_name, stat['carbon_emissions']]);
            }
        })
        setStats(temp);
        if (selectedOption.value === 'Week') {
            setCarbonFootprintChartData(carbonFootprintChartTempData['1 week'])
            setEnergyUsageChartData(energyUsageChartTempData['1 week']);
        }
        else if (selectedOption.value === 'Month') {
            setCarbonFootprintChartData(carbonFootprintChartTempData['1 month'])
            setEnergyUsageChartData(energyUsageChartTempData['1 month']);
        }
        else {
            setCarbonFootprintChartData(carbonFootprintChartTempData['3 months'])
            setEnergyUsageChartData(energyUsageChartTempData['3 months']);
        }
    }, [energyStats, selectedOption.value])

    return (
        <div className={styles.dashboardContainer}>
            <div className="flex justify-between items-center flex-nowrap">
                <div className="text-2xl font-semibold">
                    Application Details Page
                </div>
                <div className="flex gap-6">
                    <Button
                        variant="outlined"
                        startIcon={<Download />}
                        sx={{
                            borderRadius: '8px',
                            textTransform: 'none',
                            borderColor: '#549B79',
                            color: '#549B79',
                            height: '40px'
                        }}
                    >
                        Reports
                    </Button>
                    <div className={styles.addApplication}>
                        Re-analyze
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-[20px] my-12 px-4 py-2">
                <div className="flex flex-wrap align-items justify-center gap-12">
                    <table>
                        <tbody>
                            <tr>
                                <td className="pr-5 py-5">
                                    <label className="text-[#ABA8B0] text-[16px]">
                                        Application Name
                                    </label>
                                    <div className="text-[16px] font-medium mt-2">
                                        HDFC Salary Automation Tool
                                    </div>
                                </td>
                                <td className="pl-5 py-5">
                                    <label className="text-[#ABA8B0] text-[16px]">
                                        Analyzed on
                                    </label>
                                    <div className="text-[16px] font-medium mt-2">
                                        {getFormattedDate(new Date())}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} className="pr-5 py-5">
                                    <label className="text-[#ABA8B0] text-[16px]">
                                        Application Description
                                    </label>
                                    <div className="text-[16px] font-medium mt-2 max-w-[500px] text-justify">
                                        An Institute having different branches at different locations, want to control and maintain the accountant salary and students personal and payment details.
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <MaturityIndicator stage={maturityLevel} />
                    </div>
                </div>
            </div>
            <div className={styles.menuContainer}>
                <ol className="flex gap-10 justify-left flex-nowrap">
                    <li
                        onClick={() => setActive("dashboard")}
                        className={`cursor-pointer ${active === 'dashboard' && 'font-bold'}`}
                    >
                        Current Version
                        {
                            active === 'dashboard' &&
                            <div className={styles.active}></div>
                        }
                    </li>
                    <li
                        onClick={() => setActive("reports")}
                        className={`cursor-pointer ${active === 'reports' && 'font-bold'}`}
                    >
                        History
                        {
                            active === 'reports' &&
                            <div className={styles.active}></div>
                        }
                    </li>
                </ol>
            </div>
            <div className="bg-white py-6 mt-8">
                <div className="flex justify-between items-center flex-nowrap px-6">
                    <div>
                        <div className="text-[18px] font-semibold leading-7">
                            Energy & Emissions Analytics
                        </div>
                        <div className="text-[14px] font-normal	leading-7 text-[#84818A]">
                            {"Date Range from 10/23/2024 - 10/29/2024"}
                        </div>
                    </div>
                    <Select
                        options={timeOptions}
                        value={selectedOption}
                        onChange={handleChange}
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                fontSize: '14px',
                                border: '2px solid #007D6E',
                                color: '#007D6E'
                            }),
                        }}
                    />
                </div>
                <div className="flex justify-around gap-8 items-center flex-wrap my-12 min-w-[300px]">
                    {
                        Object.keys(stats).map((item, index) => {
                            return (
                                <ul key={index} className="p-4">
                                    <li className="my-3 text-[#202020] text-[16px] leading-7 font-medium">
                                        {stats[item]?.label}
                                    </li>
                                    <li className="my-3 text-[#202020] text-[32px] font-semibold leading-9">
                                        <CountUp start={0} end={stats[item]?.amount} decimal="." decimals={2} duration={1} />
                                    </li>
                                    <li className="my-3 text-[#47464A] text-[14px] leading-5 font-normal">
                                        {stats[item]?.units}
                                    </li>
                                    <li className={`flex items-center gap-2 my-3 font-semibold text-[16px] leading-5 ${stats[item]?.previousAmount >= stats[item]?.amount ? 'text-[#008000]' : 'text-[#FF0000]'}`}>
                                        {stats[item]?.previousAmount >= stats[item]?.amount ?
                                            <TriangleSVG color={'green'} />
                                            :
                                            <TriangleSVG color={'red'} />
                                        }
                                        <CountUp start={0} end={Math.abs(((stats[item]?.amount - stats[item]?.previousAmount) / stats[item].previousAmount) * 100)} decimal="." decimals={2} duration={1} />%
                                    </li>
                                </ul>
                            )
                        })
                    }
                </div>
            </div>
            <ChartStatistics
                energyUsageChartData={energyUsageChartData}
                carbonFootprintChartData={carbonFootprintChartData}
            />
            <Recommendations
                implementedAreas={implementedAreas}
                unImplementedAreas={unImplementedAreas}
            />
        </div>
    );
}