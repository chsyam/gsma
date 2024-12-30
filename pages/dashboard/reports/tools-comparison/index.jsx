import { X } from "lucide-react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { decrypt } from "./../../../api/auth/lib";
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Modal } from "@mui/material";
import toolsComparison from "./../../../../public/data/tools_comparison.json";
import DockerComaparison from "../../../../components/tools_comparison/DockerComparison";
import styles from "./../../../../components/tools_comparison/ToolsComparison.module.css";
import Docker_SVG from "../../../../components/icons/tools_svg/docker";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const tools_architecture = {
    "Docker Build Comparison": {
        "component": DockerComaparison, "data": [...toolsComparison["docker"]]
    },
    "Messaging between Java Microservices": {
        "component": DockerComaparison, "data": [...toolsComparison["sync"], ...toolsComparison["async"]]
    },
    "Energy efficient Workload Orchestrator": {
        "component": DockerComaparison, "data": [...toolsComparison["heft_ecws"], ...toolsComparison["fcfs_ecws"]]
    },
    "Python Web Frameworks": {
        "component": DockerComaparison, "data": [...toolsComparison["python_sync"], ...toolsComparison["python_async"]]
    },
    "Spring Boot Framework": {
        "component": DockerComaparison, "data": [...toolsComparison["spring"]]
    },
    "Energy Consumption of Java I/O Libraries & Techniques": {
        "component": DockerComaparison, "data": [...toolsComparison["java_io"]]
    },
    "Efficiency of Thread-Safe Collections in Java": {
        "component": DockerComaparison, "data": [...toolsComparison["thread_java"]]
    },
    "Trade-Offs in Object-Relational Mapping(ORM) Framework": {
        "component": DockerComaparison, "data": [...toolsComparison["trade_offs"]]
    },
    "Container Runtimes Across Various Scenarios": {
        "component": DockerComaparison, "data": [...toolsComparison["container_runtime"]]
    },
    "Performance of Container Network Plugins(CNIs) in Virtualized Environment": {
        "component": DockerComaparison, "data": [...toolsComparison["cni_virtual"]]
    },
    "Performance of Container Network Plugins(CNIs) in Physical Environment": {
        "component": DockerComaparison, "data": [...toolsComparison["cni_physical"]]
    },
    "Serialization Efficiency : JSON vs Avro": {
        "component": DockerComaparison, "data": [...toolsComparison["json_avro"]]
    },
    "Performance of API Data Formats: gRPC/Protobuf vs JSON": {
        "component": DockerComaparison, "data": [...toolsComparison["grpc_json"]]
    },
};

export default function ToolsComparison() {
    console.log(toolsComparison);
    const [expandedPanels, setExpandedPanels] = useState({});
    const [toggleOperation, setToggleOperation] = useState("Expand");
    const [popupData, setPopupData] = useState({});
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
        setPopupData({});
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
            case "High":
                return styles.danger;
            case "Low":
                return styles.success;
            default:
                return "";
        }
    }

    const callComponent = (Component, data) => {
        return (
            <Component
                dockerDetails={data}
                popupData={popupData}
                setPopupData={setPopupData}
                setOpen={setOpen}
            />
        )
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
                    <div className={styles.energyUsage}>
                        <div>Energy Usage</div>
                        {
                            Object.keys(popupData).length !== 0 && (
                                <div className={getEnergyUsageClass(popupData["basicMetrics"]["Energy Usage"]?.value)}
                                >
                                    {popupData["basicMetrics"]["Energy Usage"]?.value}
                                </div>
                            )
                        }
                    </div>
                    <Divider className="my-6" />
                    <div>
                        <span className="font-semibold text-xl">Detailed Metrics</span>
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
                    <div>{popupData?.description}</div>
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