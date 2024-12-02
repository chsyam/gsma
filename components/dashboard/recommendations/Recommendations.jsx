import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, LinearProgress } from "@mui/material";
import MaturityIndicator from "./MaturityIndicator";
import { ChevronDown, Download, ExternalLink } from "lucide-react";
import { useState } from "react";

export default function Recommendations() {
    const [expandedPanels, setExpandedPanels] = useState({});
    const [toggleOperation, setToggleOperation] = useState("Expand");

    const analysisResult = {
        applicationName: 'Sample App',
        version: '0.0.1',
        results: [
            {
                areaName: 'Design Thinking/Requirement Gathering',
                implementedAreas: 1,
                totalAreas: 4,
                passedAreas: [
                    'Title of the succeeded Areas',
                    'Title of the succeeded Areas',
                ], failedAreas: [
                    'Title of the failed Areas',
                    'Title of the failed Areas',
                    'Title of the failed Areas',
                    'Title of the failed Areas',
                ]
            },
            {
                areaName: 'Development',
                implementedAreas: 5,
                totalAreas: 5,
                passedAreas: [
                    'Title of the succeeded Areas',
                    'Title of the succeeded Areas',
                ], failedAreas: [
                    'Title of the failed Areas',
                    'Title of the failed Areas',
                    'Title of the failed Areas',
                    'Title of the failed Areas',
                ]
            },
            {
                areaName: 'Testing',
                implementedAreas: 1,
                totalAreas: 4,
                passedAreas: [
                    'Title of the succeeded Areas',
                    'Title of the succeeded Areas',
                ], failedAreas: [
                    'Title of the failed Areas',
                    'Title of the failed Areas',
                    'Title of the failed Areas',
                    'Title of the failed Areas',
                ]
            },
            {
                areaName: 'Implementation /  Deployment',
                implementedAreas: 1,
                totalAreas: 7,
                passedAreas: [
                    'Title of the succeeded Areas',
                    'Title of the succeeded Areas',
                ], failedAreas: [
                    'Title of the failed Areas',
                    'Title of the failed Areas',
                    'Title of the failed Areas',
                    'Title of the failed Areas',
                ]
            },
            {
                areaName: 'Operations & Maintenance',
                implementedAreas: 1,
                totalAreas: 3,
                passedAreas: [
                    'Title of the succeeded Areas',
                    'Title of the succeeded Areas',
                ], failedAreas: [
                    'Title of the failed Areas',
                    'Title of the failed Areas',
                    'Title of the failed Areas',
                    'Title of the failed Areas',
                ]
            },
            {
                areaName: 'Monitoring & Diagnostics',
                implementedAreas: 1,
                totalAreas: 2,
                passedAreas: [
                    'Title of the succeeded Areas',
                    'Title of the succeeded Areas',
                ], failedAreas: [
                    'Title of the failed Areas',
                    'Title of the failed Areas',
                    'Title of the failed Areas',
                    'Title of the failed Areas',
                ]
            }
        ]
    }

    const getProgressColor = (implementedAreas, totalAreas) => {
        let percentage = Math.round((implementedAreas / totalAreas) * 100);
        if (totalAreas === implementedAreas) return 'success';
        if (percentage <= 65)
            return 'error';
        return 'warning';
    }

    const handleExpand = (panel) => {
        if (expandedPanels.hasOwnProperty(panel))
            setExpandedPanels({ ...expandedPanels, [panel]: !expandedPanels[panel] })
        else
            setExpandedPanels({ ...expandedPanels, [panel]: true })
    }

    const handleToggleExpandAll = () => {
        setToggleOperation(toggleOperation === "Expand" ? "Collapse" : "Expand");
        let temp = {};
        analysisResult.results.map((area, index) => {
            temp[index] = toggleOperation === "Expand";
        })
        setExpandedPanels(temp);
    }

    return (
        <div className="bg-white mt-8">
            <div className="flex justify-around items-center flex-nowrap gap-4">
                <div className="flex-grow">
                    <MaturityIndicator stage={2} />
                </div>
                <div className="p-4 my-4 mx-2">
                    <div className="flex justify-between align-center flex-nowrap mb-5">
                        <div>
                            <span className="text-sm text-gray-600">
                                Application Name:
                            </span>
                            <span className="px-2 font-semibold">
                                {analysisResult.applicationName}
                            </span><br />
                            <span className="text-sm text-gray-600">
                                Version:
                            </span>
                            <span className="px-2 font-semibold">
                                {analysisResult.version}
                            </span>
                        </div>
                        <Button
                            variant="outlined"
                            startIcon={<Download />}
                            sx={{
                                borderRadius: '4px',
                                textTransform: 'none',
                                borderColor: '#549B79',
                                color: '#549B79',
                                height: '40px'
                            }}
                        >
                            Reports
                        </Button>
                    </div>
                    <div className="font-semibold">Areas Implemented</div>
                    <div className="m-4 flex-grow flex justify-center items-center flex-wrap gap-4">
                        {
                            analysisResult.results.map((area, index) => (
                                <div key={index} className="p-2 flex-1 basis-[calc(40%-16px)]">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className={`w-5 h-5 ${area.implementedAreas === area.totalAreas ? 'bg-green-600' : 'bg-gray-300'} rounded-sm`}
                                        />
                                        <div
                                            className={`text-[14px] ${area.implementedAreas === area.totalAreas ? 'text-green-700 font-semibold' : 'text-black'}`}
                                        >
                                            {area.areaName}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 flex-nowrap my-2 mx-1">
                                        <LinearProgress
                                            variant="determinate"
                                            color={getProgressColor(area.implementedAreas, area.totalAreas)}
                                            sx={{
                                                height: '12px',
                                                flexGrow: 1,
                                                borderRadius: '10px',
                                                '& .MuiLinearProgress-bar': {
                                                    borderRadius: '10px',

                                                }, backgroundColor: '#ECECEC'
                                            }}
                                            value={Math.round((area.implementedAreas / area.totalAreas) * 100)}
                                        />
                                        <div className="text-sm tracking-widest font-semibold">
                                            {area.implementedAreas}/{area.totalAreas}
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <Divider />
            <div className="px-[5%] py-[4%]">
                <div className="bg-[#3E3E440D] p-6">
                    <div className="flex justify-between flex-nowrap items-center gap-8 px-4">
                        <div className="font-semibold my-4 text-xl">
                            Recommendations
                        </div>
                        <Button variant="outlined" color="black" sx={{ textTransform: 'none' }} onClick={() => handleToggleExpandAll()}>
                            {toggleOperation} All
                        </Button>
                    </div>
                    <div>
                        {
                            analysisResult.results.map((area, index) => {
                                return (
                                    <Accordion
                                        expanded={expandedPanels[index] ? true : false}
                                        key={index}
                                        onChange={() => handleExpand(index)}
                                        sx={{
                                            backgroundColor: expandedPanels[index] ? '#F8F8F80D' : '#3E3E440D',
                                            boxShadow: 'none',
                                            margin: '4px 0',
                                            borderTopLeftRadius: expandedPanels[index] ? '18px' : '4px',
                                            borderTopRightRadius: expandedPanels[index] ? '18px' : '4px',
                                            borderBottomLeftRadius: expandedPanels[index] ? '6px' : '4px',
                                            borderBottomRightRadius: expandedPanels[index] ? '6px' : '4px'
                                        }}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ChevronDown color="#000" />}
                                            aria-controls="panel1-content"
                                            id="panel1-header"
                                            sx={{ fontSize: '14px', fontWeight: '500', backgroundColor: expandedPanels[index] ? '#549B79' : '3E3E440D', borderRadius: '4px' }}
                                        >
                                            {area.areaName}
                                            <span className="px-2 tracking-widest font-semibold">({area.implementedAreas}/{area.totalAreas})</span>
                                        </AccordionSummary>
                                        <AccordionDetails sx={{ backgroundColor: '#F8F8F80D' }}>
                                            <div className="flex justify-center align-center gap-8 flex-wrap px-4 py-4">
                                                <div className="flex-grow">
                                                    <div className="font-semibold text-[16px]">
                                                        Sustainability Passed Areas
                                                    </div>
                                                    <div className="px-4">
                                                        {
                                                            area.passedAreas.length === 0 ? (
                                                                <div className="text-[14px] my-8 text-[#F35E4A] cursor-pointer">
                                                                    No Passed Areas
                                                                </div>
                                                            ) : (
                                                                area.passedAreas.map((item, index) => {
                                                                    return (
                                                                        <div key={index} className="flex justify-between flex-nowrap items-center gap-2 my-3 hover:underline underline-offset-4">
                                                                            <div className="text-[14px] text-[#549B79] cursor-pointer">
                                                                                {item}
                                                                            </div>
                                                                            <ExternalLink size={16}
                                                                                color="#549B79"
                                                                                style={{ cursor: 'pointer' }}
                                                                            />
                                                                        </div>
                                                                    );
                                                                })
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                <div className="flex-grow">
                                                    <div className="font-semibold text-[16px]">Failed Areas</div>
                                                    <div className="px-4">
                                                        {
                                                            area.failedAreas.length === 0 ? (
                                                                <div className="text-[14px] my-8 text-[#549B79] cursor-pointer">
                                                                    No Failed Areas
                                                                </div>
                                                            ) : (
                                                                area.failedAreas.map((item, index) => {
                                                                    return (
                                                                        <div key={index} className="flex justify-between flex-nowrap items-center gap-2 my-3 hover:underline underline-offset-4">
                                                                            <div className="text-[14px] text-red-600 cursor-pointer">
                                                                                {item}
                                                                            </div>
                                                                            <ExternalLink size={16}
                                                                                color="#F35E4A"
                                                                                style={{ cursor: 'pointer' }}
                                                                            />
                                                                        </div>
                                                                    );
                                                                })
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </AccordionDetails>
                                    </Accordion>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </div >
    );
}