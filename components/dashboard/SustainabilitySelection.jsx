import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./../../styles/dashboard/SustainabilitySelection.module.css";
import { find } from "lodash"
import RenderComponent from "./RenderComponent";

export default function SustainabilitySelection() {
    const areas = {
        "Analysis & Design": {
            label: 'Analysis & Design',
            assessmentAreas: [
                {
                    title: 'Technology Advisor',
                    description: 'Smart tool comparison platform to optimize your development stack for performance and energy usage'
                }
            ],
        },
        "Development": {
            label: 'Development',
            assessmentAreas: [
                {
                    title: 'Energy Leaks in Application',
                    description: 'Identify energy-inefficient code to minimize energy utilization and improve performance.',
                    componentList: [
                        {
                            label: 'Application URL',
                            name: 'applicationURL',
                            componentType: 'input',
                            inputType: 'text',
                            placeholder: 'enter application URL',
                            prefix: 'http://',
                            defaultValue: '',
                            readOnly: false
                        }, {
                            label: 'Branch',
                            name: 'branch',
                            componentType: 'input',
                            inputType: 'text',
                            placeholder: 'enter branch',
                            prefix: 'http://',
                            defaultValue: '',
                            readOnly: false
                        }
                    ],
                }, {
                    title: 'Energy Utilization for ML Jobs',
                    description: 'Monitor energy consumption of machine learning jobs for better efficiency.',
                    componentList: [
                        {
                            label: 'Code URL',
                            name: 'codeURL',
                            inputType: 'text',
                            componentType: 'input',
                            placeholder: 'enter code url',
                            prefix: '',
                            defaultValue: '',
                            readOnly: false
                        }
                    ]
                }, {
                    title: 'Energy Metrics for Application',
                    description: 'Monitor energy consumption of machine learning jobs for better efficiency.',
                    componentList: [
                        {
                            label: 'Server Application IP',
                            name: 'serverIP',
                            inputType: 'text',
                            componentType: 'input',
                            placeholder: 'enter server IP',
                            prefix: '',
                            defaultValue: '',
                            readOnly: false
                        }, {
                            label: 'Username',
                            name: 'username',
                            componentType: 'input',
                            inputType: 'text',
                            placeholder: 'enter username',
                            prefix: '',
                            defaultValue: '',
                            readOnly: false
                        }, {
                            label: 'Password',
                            name: 'password',
                            componentType: 'input',
                            inputType: 'password',
                            placeholder: 'enter password',
                            prefix: '',
                            defaultValue: '',
                            readOnly: false
                        }
                    ],
                }, {
                    title: 'Prechecks in CI/CD Pipelines',
                    description: 'To prevent build failures, we run automated checks before deployments. These checks help identify potential issues.',
                    componentList: [
                        {
                            name: 'prechecks',
                            componentType: 'text',
                            defaultValue: 'To implement prechecks in your CICD environment, follow this',
                            externalResources: 'http://marvel-teaas-lb-1490692637.us-east-1.elb.amazonaws.com:83/prechecks',
                        }
                    ]
                }
            ],
        },
        "Testing": {
            label: 'Testing',
            assessmentAreas: [],
        },
        "Deployment": {
            label: 'Deployment',
            assessmentAreas: [
                {
                    title: 'Workload Benchmarking',
                    description: 'Compare workload performance against different processors to find efficient infrastructure',
                    componentList: [
                        {
                            label: 'Application Deployment File URL',
                            name: 'applicationDeploymentFileURL',
                            inputType: 'text',
                            componentType: 'input',
                            placeholder: 'enter Application Deployment File URL',
                            prefix: '',
                            defaultValue: '',
                            readOnly: false
                        }, {
                            label: 'Load Generator Deployment File URL',
                            name: 'loadGeneratorDeploymentFileURL',
                            inputType: 'text',
                            componentType: 'input',
                            placeholder: 'enter Load Generator Deployment File URL',
                            prefix: '',
                            defaultValue: '',
                            readOnly: false
                        }, {
                            label: 'Enter Instance Type',
                            name: 'instanceType',
                            inputType: 'text',
                            componentType: 'input',
                            placeholder: 'enter Instance Type',
                            prefix: '',
                            defaultValue: '',
                            readOnly: false
                        }
                    ]
                }, {
                    title: 'Energy Utilization of Cloud Instances',
                    description: 'Find energy used across your cloud instances and optimise to maximize utilization',
                    componentList: [
                        {
                            name: 'energyUtilization',
                            componentType: 'text',
                            defaultValue: 'Energy utilization for all instances in your subscription will be calculated automatically, and recommendations will be provided accordingly.',
                        }
                    ]
                }, {
                    title: 'Policy based Infra Provisioning',
                    description: 'Efficiently allocate and manage resources to meet demand while minimizing overprovisioning',
                    componentList: [
                        {
                            name: 'infraProvisioning',
                            componentType: 'text',
                            defaultValue: 'To implement OPA in your environment follow this',
                            externalResources: 'http://marvel-teaas-lb-1490692637.us-east-1.elb.amazonaws.com:83/opa',
                        }
                    ]
                }, {
                    title: 'Turn Off Idle Workloads',
                    description: 'Automatically shut down idle or unnecessary workloads to conserve energy and reduce costs',
                    componentList: []
                }, {
                    title: 'Identify Unused Resources',
                    description: 'Identify and reclaim unused or underutilized resources to optimize your infrastructure',
                    componentList: [
                        {
                            name: 'unusedResources',
                            componentType: 'text',
                            defaultValue: 'Any unused instances in your subscription will be automatically detected and shown in the order of least used.',
                        }
                    ]
                }, {
                    title: 'Tagging of Resources',
                    description: 'Implement a comprehensive tagging strategy to better organize and manage your resources',
                    componentList: [
                        {
                            name: 'taggingResources',
                            componentType: 'text',
                            defaultValue: 'Instances without tags within your subscription will be listed automatically',
                        }
                    ]
                }
            ],
        }
    }

    const [filteredLabels, setFilteredLabels] = useState(['Development']);
    const handleLabelClick = (label) => {
        if (filteredLabels.includes(label)) {
            let temp = [];
            filteredLabels.map((item) => item !== label && temp.push(item));
            setFilteredLabels(temp);
        } else {
            setFilteredLabels([...filteredLabels, label])
        }
    }

    const [assessmentAreas, setAssessmentAreas] = useState([]);
    useEffect(() => {
        let temp = [];
        Object.keys(areas).map((item, index) => (
            filteredLabels.includes(item) && temp.push(...areas[item]['assessmentAreas'])
        ))
        setAssessmentAreas(temp);
    }, [filteredLabels])

    const [selectedAssessments, setSelectedAssessments] = useState([]);
    const handleSelection = (assessmentArea) => {
        const result = find(selectedAssessments, function (item) {
            if (item.title === assessmentArea.title) {
                return true;
            }
        })

        if (result) {
            let temp = [];
            selectedAssessments.map((item) => item !== assessmentArea && temp.push(item));
            setSelectedAssessments(temp);
        } else {
            setSelectedAssessments([...selectedAssessments, assessmentArea])
        }
    }

    const findObject = (assessmentObj) => {
        return find(selectedAssessments, function (item) {
            if (item.title === assessmentObj.title) {
                return true;
            }
        })
    }


    return (
        <div className={styles.SustainabilitySelectionContainer}>
            <div className={styles.areaSelectionContainer}>
                <div className={styles.addingAreas}>
                    <div className={styles.areaSection}>
                        {
                            Object.keys(areas).map((area, index) => {
                                return (
                                    <div key={index}
                                        onClick={() => handleLabelClick(areas[area]['label'])}
                                        className={`${styles.area}`}
                                        style={{ backgroundColor: `${filteredLabels.includes(areas[area]['label']) ? '#549B79' : '#DDE1E6'}`, color: `${filteredLabels.includes(areas[area]['label']) ? '#FFF' : '#000'}` }}
                                    >
                                        {areas[area]['label']}
                                    </div>
                                );
                            })
                        }
                    </div>
                    {
                        assessmentAreas.length === 0 ? (
                            <div className="text-center text-md my-[100px] font-semibold">
                                No areas to assessment. Try selecting other areas
                            </div>
                        ) : (
                            <table className="mt-6">
                                <tbody>
                                    {
                                        assessmentAreas.map((assessmentArea, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className='py-3 pr-2'>
                                                        <div className="font-semibold"
                                                            style={{ color: `${findObject(assessmentArea) ? '#549B79' : '#000'}` }}
                                                        >{assessmentArea.title}</div>
                                                        <div className={styles.description}
                                                            style={{ color: `${findObject(assessmentArea) ? '#549B79' : '#000'}` }}
                                                        >{assessmentArea.description}</div>
                                                    </td>
                                                    <td>
                                                        <div className="cursor-pointer border border-black"
                                                            onClick={() => handleSelection(assessmentArea)}
                                                            style={{
                                                                display: `${findObject(assessmentArea) ? 'none' : 'block'}`
                                                            }}
                                                        >
                                                            <Plus size={18} />
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        )
                    }
                </div>
                <div className={styles.selectedAreas}>
                    <div className="text-[#549B79] font-bold text-[16px] leading-6">
                        Selected Assessment Areas:
                    </div>
                    {
                        selectedAssessments.length === 0 ? (
                            <div className="text-center my-[100px]">
                                <span className="font-semibold">Choose Areas for Assessment</span><br />
                                <span className="text-sm">Using the Left tabs</span>
                            </div>
                        ) : (
                            <div>
                                {
                                    selectedAssessments.map((item, index) => {
                                        return (
                                            <div key={index} className={`py-4 ${index !== 0 && 'border-t-2'}`}>
                                                <div className="flex justify-between font-semibold flex-wrap text-xl items-center">
                                                    <div>{item.title}</div>
                                                    <div
                                                        className="cursor-pointer rounded-full p-2 hover:bg-[#ef9696] ease-in-out duration-300"
                                                        onClick={() => handleSelection(item)}
                                                    ><Trash2 color="red" /></div>
                                                </div>
                                                <div>
                                                    <form className="px-4">
                                                        {
                                                            item?.componentList?.map((component, index) => {
                                                                return (
                                                                    <div key={index}>
                                                                        <RenderComponent details={component} />
                                                                    </div>
                                                                );
                                                            })
                                                        }
                                                    </form>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}