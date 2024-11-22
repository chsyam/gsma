import React, { useState } from "react";
import ZeroApplicationUI from "./ZeroApplicationUI";
import ApplicationDetails from "./ApplicationDetails";
import styles from "./../../styles/dashboard/AddApplication.module.css"
import { ChevronRight } from "lucide-react";
import SustainabilitySelection from "./SustainabilitySelection";

export default function AddApplications() {
    const [addingStatus, setAddingStatus] = useState(true);
    const [levels, setLevels] = useState([
        {
            sectionNumber: 1,
            sectionLabel: 'Application Details',
            sectionComponent: <ApplicationDetails />,
            isActive: true,
            isCompleted: false,
            isLast: false
        }, {
            sectionNumber: 2,
            sectionLabel: 'Sustainability Selection',
            sectionComponent: <SustainabilitySelection />,
            isActive: true,
            isCompleted: false,
            isLast: false
        }, {
            sectionNumber: 3,
            sectionLabel: 'Recommendations',
            sectionComponent: <ApplicationDetails />,
            isActive: false,
            isCompleted: false,
            isLast: true
        }
    ]);

    const handleSaveNext = () => {
        console.log("Clicked on Save & Next");
    }

    return (
        <div className={styles.dashboardContainer}>
            {
                addingStatus ? (
                    <div className={styles.addingAppContainer}>
                        <div className={styles.sectionTitle}>
                            Create Sustainability Analysis
                        </div>

                        <div className={styles.formContainer}>
                            <div className={styles.tracker}>
                                {
                                    levels.map((level, index) => {
                                        return (
                                            <div key={index} className={`${styles.sectionLevel} ${level.isActive && styles.currentSection} ${level.isCompleted && styles.completedSection}`}>
                                                <div className={styles.sectionNumber}>
                                                    {level.sectionNumber}
                                                </div>
                                                <div>{level.sectionLabel}</div>
                                                {
                                                    !level.isLast && <ChevronRight />
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            {
                                levels.map((level, index) => {
                                    return (
                                        <div key={index}>
                                            {level.isActive &&
                                                React.cloneElement(level.sectionComponent, {
                                                    currentLevel: level,
                                                    levels: levels,
                                                    setLevels: setLevels
                                                })
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                ) : (
                    <ZeroApplicationUI setAddingStatus={setAddingStatus} />
                )
            }
        </div>
    );
}