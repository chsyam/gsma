import { useState } from "react";
import { decrypt } from "./../../../api/auth/lib";
import { ChevronDown, ExternalLink } from "lucide-react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import toolsComparison from "./../../../../public/data/tools_comparison.json";
import DockerComaparison from "../../../../components/tools_comparison/DockerComparison";

const tools_architecture = {
    "Docker Build Comparison": ["docker"],
    "Messaging between Java Microservices": ["sync", "async"],
    "Energy efficient Workload Orchestrator": ["heft_ecws", "fcfs_ecws"],
    "Python Web Frameworks": ["python_sync", "python_async"],
    "Spring Boot Framework": ["spring"],
    "Energy Consumption of Java I/O Libraries & Techniques": ["java_io"],
    "Efficiency of Thread-Safe Collections in Java": ["thread_java"],
    "Trade-Offs in Object-Relational Mapping(ORM) Framework": ["trade_offs"],
    "Container Runtimes Across Various Scenarios": ["container_runtime"],
    "Performance of Container Network Plugins(CNIs) in Virtualized Environment": ["cni_virtual"],
    "Performance of Container Network Plugins(CNIs) in Physical Environment": ["cni_physical"],
    "Performance of Container Network Plugins(CNIs) in Physical Environment": ["json_avro"],
    "Serialization Efficiency : JSON vs Avro": ["json_avro"],
    "Performance of API Data Formats: gRPC/Protobuf vs JSON": ["grpc_json"]
};

const ComponentsImporting = {
    "docker": DockerComaparison,
    "sync": DockerComaparison,
    "async": DockerComaparison,
    "heft_ecws": DockerComaparison,
    "fcfs_ecws": DockerComaparison,
    "python_sync": DockerComaparison,
    "python_async": DockerComaparison,
    "spring": DockerComaparison,
    "java_io": DockerComaparison,
    "thread_java": DockerComaparison,
    "trade_offs": DockerComaparison,
    "container_runtime": DockerComaparison,
    "cni_virtual": DockerComaparison,
    "cni_physical": DockerComaparison,
    "json_avro": DockerComaparison,
    "grpc_json": DockerComaparison
}

export default function ToolsComparison() {
    console.log(toolsComparison);
    const [expandedPanels, setExpandedPanels] = useState({});
    const [toggleOperation, setToggleOperation] = useState("Expand");

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
        <div>
            <div>
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
                                            tools_architecture[area]?.map((item, ind) => {
                                                return (
                                                    callComponent(ComponentsImporting[item], toolsComparison[item], index)
                                                )
                                            })
                                        }
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        );
                    })
                }
            </div>
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