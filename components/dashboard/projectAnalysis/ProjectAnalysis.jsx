import React, { useId, useState } from "react";
import styles from "./../../../styles/dashboard/AddApplication.module.css"
import { format } from "date-fns";
import MaturityIndicator from "../recommendations/MaturityIndicator";
import Recommendations from "../recommendations/Recommendations";
import dynamic from 'next/dynamic';

const Select = dynamic(() => import('react-select'), { ssr: false });


export default function ProjectAnalysis({ projectList }) {
    const [active, setActive] = useState('dashboard');
    const getFormattedDate = (date) => {
        return format(date, "dd/MM/yyyy hh:mm a");
    }

    const timeOptions = [
        { value: 'Weekly', label: 'Weekly' },
        { value: 'Monthly', label: 'Monthly' },
    ];
    const [selectedOption, setSelectedOption] = useState(timeOptions[0])

    const handleChange = (selected) => {
        setSelectedOption(selected);
    };

    return (
        <div className={styles.dashboardContainer}>
            <div className="flex justify-between items-center flex-nowrap">
                <div className="text-2xl font-semibold">
                    Application Details Page
                </div>
                <div className={styles.addApplication}>
                    Re-analyze
                </div>
            </div>
            <div className="bg-white rounded-[24px] my-12 px-4 py-2">
                <div className="flex flex-wrap align-items justify-center gap-12">
                    <table className="">
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
                                        Version Details
                                    </label>
                                    <div className="text-[16px] font-medium mt-2">
                                        Ver 1.1.1.2
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="pr-5 py-5">
                                    <label className="text-[#ABA8B0] text-[16px]">
                                        Application Description
                                    </label>
                                    <div className="text-[16px] font-medium mt-2 max-w-[400px] text-justify">
                                        An Institute having different branches at different locations, want to control and maintain the accountant salary and students personal and payment details.
                                    </div>
                                </td>
                                <td className="pl-5 py-5">
                                    <label className="text-[#ABA8B0] text-[16px]">
                                        Last Updates on
                                    </label>
                                    <div className="text-[16px] font-medium mt-2">
                                        {getFormattedDate(new Date())}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <MaturityIndicator stage={1} />
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
            <div className="bg-white p-4 my-8">
                <div className="flex justify-between items-center flex-nowrap">
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
                    <ul className="p-4">
                        <li className="my-3 text-[#202020] text-[16px] leading-7 font-medium">
                            Carbon Emissions
                        </li>
                        <li className="my-3 text-[#202020] text-[32px] font-semibold leading-9">
                            {38.25}
                        </li>
                        <li className="my-3 text-[#47464A] text-[14px] leading-5 font-normal">
                            {'Kg CO₂'}
                        </li>
                        <li className="my-3 text-[#009512] font-medium text-[14px] leading-5">
                            +{6.28}%
                        </li>
                    </ul>
                    <ul className="p-4">
                        <li className="my-3 text-[#202020] text-[16px] leading-7 font-medium">
                            Cost
                        </li>
                        <li className="my-3 text-[#202020] text-[32px] font-semibold leading-9">
                            {3385.11}
                        </li>
                        <li className="my-3 text-[#47464A] text-[14px] leading-5 font-normal">
                            {'USD'}
                        </li>
                        <li className="my-3 text-[#009512] font-medium text-[14px] leading-5">
                            +{1.28}%
                        </li>
                    </ul>
                    <ul className="p-4">
                        <li className="my-3 text-[#202020] text-[16px] leading-7 font-medium">
                            Total Energy
                        </li>
                        <li className="my-3 text-[#202020] text-[32px] font-semibold leading-9">
                            {38.25}
                        </li>
                        <li className="my-3 text-[#47464A] text-[14px] leading-5 font-normal">
                            {'kWh'}
                        </li>
                        <li className="my-3 text-[#F75151] font-medium text-[14px] leading-5">
                            +{6.28}%
                        </li>
                    </ul>
                    <ul className="p-4">
                        <li className="my-3 text-[#202020] text-[16px] leading-7 font-medium">
                            Grid Factor
                        </li>
                        <li className="my-3 text-[#202020] text-[32px] font-semibold leading-9">
                            {271.00}
                        </li>
                        <li className="my-3 text-[#47464A] text-[14px] leading-5 font-normal">
                            {"gCO₂e/kWh"}
                        </li>
                        <li className="my-3 text-[#F75151] font-medium text-[14px] leading-5">
                            +{3.43}%
                        </li>
                    </ul>
                </div>
            </div>
            <Recommendations />
        </div>
    );
}