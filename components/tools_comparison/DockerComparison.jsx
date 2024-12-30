import { Highcharts } from 'highcharts';
import { Box, Divider, Modal } from "@mui/material";
import Docker_SVG from "../icons/tools_svg/docker";
import styles from "./ToolsComparison.module.css";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import HighchartsReact from "highcharts-react-official";

export default function DockerComaparison({ dockerDetails, popupData, setPopupData, setOpen }) {
    const getEnergyUsageClass = (value) => {
        switch (value) {
            case "High":
                return styles.danger;
            case "Low":
                return styles.success;
            default:
                return "";
        }
    }

    const handleToolClick = (tool) => {
        setPopupData({ ...tool });
        setOpen(true);
    }

    useEffect(() => {
        console.log(popupData);
    }, [popupData])

    return (
        <div className="flex justify-left gap-5 flex-wrap items-center mt-6">
            {
                dockerDetails?.map((tool, ind) => {
                    return (
                        <div onClick={() => handleToolClick(tool)} key={ind} className="bg-white min-w-[300px] rounded-md py-6 px-6 shadow-lg cursor-pointer">
                            <div className={styles.title}>
                                <Docker_SVG />{tool?.title}
                            </div>
                            <div className={styles.energyUsage}>
                                <div>Energy Usage</div>
                                <div className={getEnergyUsageClass(tool["basicMetrics"]["Energy Usage"]?.value)}
                                >
                                    {tool["basicMetrics"]["Energy Usage"]?.value}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}