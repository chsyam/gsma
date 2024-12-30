import { X } from "lucide-react";
import Highcharts from "highcharts";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { decrypt } from "./../../../api/auth/lib";
import HighchartsReact from "highcharts-react-official";
import Docker_SVG from "../../../../components/icons/tools_svg/docker";
import toolsComparison from "./../../../../public/data/tools_comparison.json";
import styles from "./../../../../components/tools_comparison/ToolsComparison.module.css";
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Modal } from "@mui/material";
import ToolsComparisonComponent from "./../../../../components/tools_comparison/ToolsComparisonComponent";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    maxHeight: '650px',
    boxShadow: 24,
    borderRadius: 2,
    outline: 'none',
    overflowY: 'scroll',
    pt: 2,
    px: 4,
    pb: 3,
};

const tools_architecture = {
    "Docker Build Comparison": {
        "component": ToolsComparisonComponent, "data": {
            "NA": toolsComparison["docker"]
        }
    },
    "Messaging between Java Microservices": {
        "component": ToolsComparisonComponent, "data": {
            "Synchronous Communication Protocols": toolsComparison["sync"],
            "Asynchronous Communication Protocols": toolsComparison["async"]
        }
    },
    "Energy efficient Workload Orchestrator": {
        "component": ToolsComparisonComponent, "data": {
            "HEFT vs ECWS": toolsComparison["heft_ecws"],
            "FCFS vs ECWS": toolsComparison["fcfs_ecws"]
        }
    },
    "Python Web Frameworks": {
        "component": ToolsComparisonComponent, "data": {
            "Synchronous Execution": toolsComparison["python_sync"],
            "Asynchronous Execution": toolsComparison["python_async"]
        }
    },
    "Spring Boot Framework": {
        "component": ToolsComparisonComponent, "data": {
            "NA": toolsComparison["spring"]
        }
    },
    "Energy Consumption of Java I/O Libraries & Techniques": {
        "component": ToolsComparisonComponent, "data": {
            "NA": toolsComparison["java_io"]
        }
    },
    "Efficiency of Thread-Safe Collections in Java": {
        "component": ToolsComparisonComponent, "data": {
            "NA": toolsComparison["thread_java"]
        }
    },
    "Trade-Offs in Object-Relational Mapping(ORM) Framework": {
        "component": ToolsComparisonComponent, "data": {
            "NA": toolsComparison["trade_offs"]
        }
    },
    "Container Runtimes Across Various Scenarios": {
        "component": ToolsComparisonComponent, "data": {
            "NA": toolsComparison["container_runtime"]
        }
    },
    "Performance of Container Network Plugins(CNIs) in Virtualized Environment": {
        "component": ToolsComparisonComponent, "data": {
            "NA": toolsComparison["cni_virtual"]
        }
    },
    "Performance of Container Network Plugins(CNIs) in Physical Environment": {
        "component": ToolsComparisonComponent, "data": {
            "NA": toolsComparison["cni_physical"]
        }
    },
    "Serialization Efficiency : JSON vs Avro": {
        "component": ToolsComparisonComponent, "data": {
            "NA": toolsComparison["json_avro"]
        }
    },
    "Performance of API Data Formats: gRPC/Protobuf vs JSON": {
        "component": ToolsComparisonComponent, "data": {
            "NA": toolsComparison["grpc_json"]
        }
    },
};

export default function ToolsComparison() {
    const [expandedPanels, setExpandedPanels] = useState({});
    const [toggleOperation, setToggleOperation] = useState("Expand");
    const [popupData, setPopupData] = useState({});
    const [open, setOpen] = useState(false);
    const [chartData, setChartData] = useState([]);

    const handleClose = () => {
        setOpen(false);
        setPopupData({});
        setChartData([]);
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

    const getEnergyUsageClass = (value) => {
        switch (value) {
            case "high":
                return styles.danger;
            case "low":
                return styles.success;
            case "medium":
                return styles.warning;
            default:
                return "";
        }
    }

    const callComponent = (Component, data) => {
        return (
            <Component
                dockerDetails={data}
                setPopupData={setPopupData}
                setOpen={setOpen}
            />
        )
    }

    useEffect(() => {
        let tempChatData = [];
        let labels = popupData?.chartData?.labels;
        let values = popupData?.chartData?.values;
        if (labels && values) {
            for (let i = 0; i < labels.length; i++) {
                tempChatData.push([labels[i], values[i]]);
            }
        }
        setChartData(tempChatData);
    }, [popupData])

    const chartOptions = {
        chart: {
            type: 'line',
            height: 400
        },
        title: {
            text: "",
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
                text: ''
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
                name: 'Metrics',
                data: chartData,
            }
        ],
        tooltip: {
            headerFormat: '<span style="font-size:16px;font-family:Montserrat, sans-serif">{point.key}</span><br/>',
            pointFormat: '<span style="color:{series.color};font-family:Montserrat, sans-serif">{series.name}</span>: <b>{point.y}</b><br/>',
            valueSuffix: '<span style="font-family:Montserrat, sans-serif"> kWh</span>'
        },
    }

    return (
        <div className="px-[5%] py-8">
            {
                Object.keys(tools_architecture)?.map((area, index) => {
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
                                {area}
                            </AccordionSummary>
                            <AccordionDetails sx={{ backgroundColor: '#F8F8F80D' }}>
                                <div>
                                    {
                                        callComponent(tools_architecture[area]?.component, tools_architecture[area]?.data)
                                    }
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    );
                })
            }

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: '60%' }}>
                    <div className="flex justify-between">
                        <div className={styles.title}>
                            <Docker_SVG />
                            {popupData?.title}
                        </div>
                        <div className="p-4 rounded-full bg-gray-100 cursor-pointer hover:bg-gray-300"
                            onClick={handleClose}
                        >
                            <X />
                        </div>
                    </div>
                    <div>
                        {
                            popupData["basicMetrics"] && Object.keys(popupData["basicMetrics"]).map((key, i) => {
                                return (
                                    <div className={styles.energyUsage}>
                                        <div>
                                            {key}
                                        </div>
                                        {
                                            Object.keys(popupData).length !== 0 && (
                                                <div className={getEnergyUsageClass(popupData["basicMetrics"][key]?.status)}
                                                >
                                                    {popupData["basicMetrics"][key]?.value}
                                                </div>
                                            )
                                        }
                                    </div>
                                );
                            })
                        }
                    </div>
                    <Divider className="my-6" />
                    <div>
                        <span className={styles.title}>Detailed Metrics</span>
                        {
                            Object.keys(popupData).length !== 0 && (
                                Object.keys(popupData?.detailedMetrics).map((key, i) => {
                                    return (
                                        <div className="flex justify-between items-center my-4 bg-[#f5f5f5] px-2 py-2 rounded-[4px] font-medium">
                                            <div>{key}</div>
                                            <div className="bg-[#dcf2fe] px-2 py-1 rounded-[4px] font-semibold">{popupData?.detailedMetrics[key]}</div>
                                        </div>
                                    );
                                })
                            )
                        }
                    </div>
                    <Divider className="my-6" />
                    <div className="text-[14px] tracking-wider mb-4">{popupData?.description}</div>
                    {
                        chartData.length !== 0 && (
                            <div className="mt-12">
                                <HighchartsReact highcharts={Highcharts} options={chartOptions} />
                            </div>
                        )
                    }
                </Box>
            </Modal>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { req, res } = context;

    const token = req?.cookies['token']
    const payload = await decrypt(token)
    if (!payload || payload === null || payload === undefined) {
        res.setHeader('Set-Cookie', [
            'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;',
        ]);
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    } else {
        return {
            props: {
                username: payload?.username,
                email: payload?.email,
                role: payload?.role
            }
        }
    }
}