import { Wifi } from "lucide-react";
import { useState } from "react";
import styles from "./../../styles/dashboard/SustainabilitySelection.module.css";

export default function SustainabilitySelection() {
    const areas = {
        "AnalysisDesign": {
            label: 'Analysis & Design',
            assessmentAreas: [],
        },
        "Development": {
            label: 'Development',
            assessmentAreas: [
                {
                    title: 'Energy Leaks in Application',
                    description: 'Identify energy-inefficient code to minimize energy utilization and improve performance.'
                }, {
                    title: 'Energy Utilization for ML Jobs',
                    description: 'Monitor energy consumption of machine learning jobs for better efficiency.'
                }, {
                    title: 'Energy Metrics for Application',
                    description: 'Monitor energy consumption of machine learning jobs for better efficiency.'
                }, {
                    title: 'Prechecks in CI/CD Pipelines',
                    description: 'To prevent build failures, we run automated checks before deployments. These checks help identify potential issues.'
                }
            ],
        },
        "Testing": {
            label: 'Testing',
            assessmentAreas: [],
        },
        "Deployment": {
            label: 'Deployment',
            assessmentAreas: [],
        }
    }
    const [assessmentAreas, setAssessmentAreas] = useState({});

    return (
        <div className={styles.SustainabilitySelectionContainer}>
            {/* <div className="flex justify-left gap-3 font-bold text-md">
                Status of Connection:  <Wifi /> Connected
            </div> */}
            <div className={styles.areaSelectionContainer}>
                <div className="border-r pr-5">
                    <div className={styles.areaSection}>
                        {
                            Object.keys(areas).map((area, index) => {
                                return (
                                    <div key={index} className={`${styles.area}`}>
                                        {areas[area]['label']}
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div>
                        {
                            Object.keys(areas).map((area, index) => {
                                return (
                                    areas[area].assessmentAreas.map((assessmentArea, ind) => {
                                        return (
                                            <div>
                                                <div>
                                                    <div>{assessmentArea.title}</div>
                                                    <div>{assessmentArea.description}</div>
                                                </div>
                                                <div>+</div>
                                            </div>
                                        );
                                    })
                                );
                            })
                        }
                    </div>
                </div>
                <div className={styles.selectedAreas}>
                    <div className="text-[#549B79] font-bold text-[16px] leading-6">
                        Selected Assessment Areas:
                    </div>
                    <div className="text-center my-[100px]">
                        <span className="font-semibold">Choose Areas for Assessment</span><br />
                        <span className="text-sm">Using the Left tabs</span>
                    </div>
                </div>
            </div>
        </div>
    )
}