import React, { useEffect, useState } from "react";
import styles from "./../../../styles/dashboard/AddApplication.module.css"
import { format } from "date-fns";
import MaturityIndicator from "../recommendations/MaturityIndicator";
import Recommendations from "../recommendations/Recommendations";
import dynamic from 'next/dynamic';
import { Download } from "lucide-react";
import { Button } from "@mui/material";
import CountUp from "react-countup";
import TriangleSVG from "../../icons/TriangleSVG";
import ChartStatistics from "./ChatStatistics";
import { getMaturityLevel } from "../../../pages/api/applications/getMaturityLevel";
import loadingStles from "./../../../styles/Loading.module.css";
import { getEnergyStats } from "../../../pages/api/applications/getEnergyStats";
import { getImplementedAreas } from "../../../pages/api/applications/getImplementedAreas";
import { getUnImplementedAreas } from "../../../pages/api/applications/getUnImplementedAreas";
import { getProjectDetails } from "../../../pages/api/applications/getProjectDetails";

const Select = dynamic(() => import('react-select'), { ssr: false });

const timeOptions = [
    { value: 'Week', label: 'Weekly' },
    { value: 'Month', label: 'Monthly' },
    { value: 'Three Months', label: 'Quarterly' },
];

export default function ProjectAnalysis({ project_name }) {
    const [active, setActive] = useState('dashboard');
    const [stats, setStats] = useState({});
    const [energyUsageChartData, setEnergyUsageChartData] = useState([]);
    const [carbonFootprintChartData, setCarbonFootprintChartData] = useState([]);
    const [selectedOption, setSelectedOption] = useState(timeOptions[0])

    const [energyStats, setEnergyStats] = useState([]);
    const [energyStatsLoading, setEnergyStatsLoading] = useState(true);

    const [maturityLevel, setMaturityLevel] = useState(0);
    const [maturityLevelLoading, setMaturityLevelLoading] = useState(true);

    const [implementedAreas, setImplementedAreas] = useState([]);
    const [unImplementedAreas, setUnImplementedAreas] = useState([]);
    const [areasLoading, setAreasLoading] = useState(true);

    const [projectDetails, setProjectDetails] = useState([]);
    const [projectDetailsLoading, setProjectDetailsLoading] = useState(true);

    const getFormattedDate = (date) => {
        return format(date, "dd/MM/yyyy hh:mm a");
    }

    const handleChange = (selected) => {
        setSelectedOption(selected);
    };

    useEffect(() => {
        async function fetchMaturityLevel() {
            setMaturityLevelLoading(true);
            const level = await getMaturityLevel(project_name);
            if (!level) {
                console.log("Error while fetching maturity level");
                setMaturityLevel(-1);
            } else {
                setMaturityLevel(level);
            }
            setMaturityLevelLoading(false);
        }

        async function fetchEnergyStats() {
            setEnergyStatsLoading(true);
            const stats = await getEnergyStats(project_name);
            if (!stats) {
                console.log("Error while fetching maturity level");
                setEnergyStats([]);
            } else {
                setEnergyStats(stats);
            }
            setEnergyStatsLoading(false);
        }

        async function fetchRecommendations() {
            setAreasLoading(true);
            const tempImplemented = await getImplementedAreas(project_name);
            const tempUnImplemented = await getUnImplementedAreas(project_name);
            !tempImplemented ? setImplementedAreas([]) : setImplementedAreas(tempImplemented);
            !tempUnImplemented ? setUnImplementedAreas([]) : setUnImplementedAreas(tempUnImplemented);
            setAreasLoading(false);
        }

        async function fetchProjectDetails() {
            setProjectDetailsLoading(true);
            const projectInfo = await getProjectDetails(project_name);
            if (!projectInfo || projectInfo?.length === 0) {
                setProjectDetails([])
            } else {
                setProjectDetails(projectInfo[0])
            }
            setProjectDetailsLoading(false);
        }
        fetchMaturityLevel();
        fetchEnergyStats();
        fetchRecommendations();
        fetchProjectDetails()
    }, [])

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
                <div className="flex flex-wrap items-center justify-around gap-12">
                    {
                        projectDetailsLoading ? (
                            <div className="flex flex-nowrap tracking-wide my-12">
                                <div className={loadingStles.loader} />
                                fetching project details....
                            </div>
                        ) : (
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="pr-5 py-5">
                                            <label className="text-[#ABA8B0] text-[16px]">
                                                Application Name
                                            </label>
                                            <div className="text-[16px] font-medium mt-2">
                                                {project_name ? project_name : "-"}
                                            </div>
                                        </td>
                                        <td className="pl-5 py-5">
                                            <label className="text-[#ABA8B0] text-[16px]">
                                                Analyzed on
                                            </label>
                                            <div className="text-[16px] font-medium mt-2">
                                                {projectDetails["last_analyzed_on"] ? getFormattedDate(projectDetails["last_analyzed_on"]) : "-"}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2} className="pr-5 py-5">
                                            <label className="text-[#ABA8B0] text-[16px]">
                                                Application Description
                                            </label>
                                            <div className="text-[16px] font-medium mt-2 max-w-[500px] text-justify">
                                                {projectDetails?.application_description || "-"}
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        )
                    }
                    <div>
                        {
                            maturityLevelLoading ? (
                                <div className="flex flex-nowrap tracking-wide my-12">
                                    <div className={loadingStles.loader} />
                                    fetching Maturity Level....
                                </div>
                            ) : (
                                <MaturityIndicator stage={maturityLevel} />
                            )
                        }
                    </div>
                </div>
            </div>
            <div className={styles.menuContainer}>
                <ol className="flex gap-10 justify-left flex-nowrap">
                    <li
                        onClick={() => setActive("dashboard")}
                        className={`cursor-pointer ${active === 'dashboard' && 'font-bold'}`}
                    >
                        Reports
                        {
                            active === 'dashboard' &&
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
                {
                    energyStatsLoading ? (
                        <div className="flex justify-center items-center flex-nowrap tracking-wide my-12">
                            <div className={loadingStles.loader} />
                            fetching Energy stats....
                        </div>
                    ) : (
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
                    )
                }
            </div>
            <ChartStatistics
                energyUsageChartData={energyUsageChartData}
                carbonFootprintChartData={carbonFootprintChartData}
                energyStatsLoading={energyStatsLoading}
            />
            <Recommendations
                implementedAreas={implementedAreas}
                unImplementedAreas={unImplementedAreas}
                areasLoading={areasLoading}
            />
        </div >
    );
}