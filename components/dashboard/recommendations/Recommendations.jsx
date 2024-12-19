import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, LinearProgress } from "@mui/material";
import { ChevronDown, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

export default function Recommendations({ implementedAreas, unImplementedAreas }) {
    const [expandedPanels, setExpandedPanels] = useState({});
    const [toggleOperation, setToggleOperation] = useState("Expand");
    const [analysisResult, setAnalysisReport] = useState({})

    useEffect(() => {
        let tempImplemented = {};
        implementedAreas?.map((item, index) => {
            if (tempImplemented[item.area]) {
                tempImplemented[item.area] = {
                    ...tempImplemented[item.area],
                    implementedAreas: tempImplemented[item.area].implementedAreas + 1,
                    totalAreas: tempImplemented[item.area].totalAreas + 1,
                    passedAreas: [...tempImplemented[item.area].passedAreas, item.action_description]
                }

            } else {
                tempImplemented[item.area] = {
                    areaName: item.area,
                    implementedAreas: 1,
                    totalAreas: 1,
                    passedAreas: [item.action_description],
                    failedAreas: [],
                }
            }
        })

        unImplementedAreas?.map((item, index) => {
            if (tempImplemented[item.area]) {
                tempImplemented[item.area] = {
                    ...tempImplemented[item.area],
                    totalAreas: tempImplemented[item.area].totalAreas + 1,
                    failedAreas: [...tempImplemented[item.area].failedAreas, item.action_description]
                }
            } else {
                tempImplemented[item.area] = {
                    areaName: item.area,
                    implementedAreas: 0,
                    totalAreas: 1,
                    passedAreas: [],
                    failedAreas: [item.action_description],
                }
            }
        })
        setAnalysisReport(tempImplemented)
    }, [implementedAreas, unImplementedAreas])

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
        Object.keys(analysisResult).map((key, index) => {
            temp[index] = toggleOperation === "Expand";
        })
        setExpandedPanels(temp);
    }

    return (
        <div className="bg-white mt-8">
            <div className="flex justify-around items-center flex-nowrap gap-4">
                <div className="p-4 my-4 mx-2  w-[90%]">
                    <div className="font-semibold">Areas Implemented</div>
                    <div className="m-4 flex-grow flex justify-center items-center flex-wrap gap-4">
                        {
                            Object.keys(analysisResult).map((area, index) => (
                                <div key={index} className="p-2 flex-1 basis-[calc(40%-16px)]">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className={`w-5 h-5 ${analysisResult[area].implementedAreas === analysisResult[area].totalAreas ? 'bg-green-600' : 'bg-[#E7E7E7]'} rounded-sm`}
                                        />
                                        <div
                                            className={`text-[14px] ${analysisResult[area].implementedAreas === analysisResult[area].totalAreas ? 'text-green-700 font-semibold' : 'text-black font-medium'}`}
                                        >
                                            {analysisResult[area].areaName}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 flex-nowrap my-2 mx-1">
                                        <LinearProgress
                                            variant="determinate"
                                            color={getProgressColor(analysisResult[area].implementedAreas, analysisResult[area].totalAreas)}
                                            sx={{
                                                height: '12px',
                                                flexGrow: 1,
                                                borderRadius: '10px',
                                                '& .MuiLinearProgress-bar': {
                                                    borderRadius: '10px',

                                                }, backgroundColor: '#E7E7E7'
                                            }}
                                            value={Math.round((analysisResult[area].implementedAreas / analysisResult[area].totalAreas) * 100)}
                                        />
                                        <div className="text-sm tracking-widest font-semibold">
                                            {analysisResult[area].implementedAreas}/{analysisResult[area].totalAreas}
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
                            Object.keys(analysisResult).map((area, index) => {
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
                                            {analysisResult[area].areaName}
                                            <span className="px-2 tracking-widest font-semibold">({analysisResult[area].implementedAreas}/{analysisResult[area].totalAreas})</span>
                                        </AccordionSummary>
                                        <AccordionDetails sx={{ backgroundColor: '#F8F8F80D' }}>
                                            <div className="flex justify-center align-center gap-8 flex-wrap px-4 py-4">
                                                <div className="flex-grow">
                                                    <div className="font-semibold text-[16px]">
                                                        Sustainability Passed Areas
                                                    </div>
                                                    <div className="px-4">
                                                        {
                                                            analysisResult[area].passedAreas.length === 0 ? (
                                                                <div className="text-[14px] my-8 text-[#F35E4A] cursor-pointer">
                                                                    No Passed Areas
                                                                </div>
                                                            ) : (
                                                                analysisResult[area].passedAreas.map((item, index) => {
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
                                                            analysisResult[area].failedAreas.length === 0 ? (
                                                                <div className="text-[14px] my-8 text-[#549B79] cursor-pointer">
                                                                    No Failed Areas
                                                                </div>
                                                            ) : (
                                                                analysisResult[area].failedAreas.map((item, index) => {
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