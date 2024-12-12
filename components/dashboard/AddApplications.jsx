import React, { useState } from "react";
import ApplicationDetails from "./ApplicationDetails";
import styles from "./../../styles/dashboard/AddApplication.module.css"
import { ChevronRight } from "lucide-react";
import SustainabilitySelection from "./SustainabilitySelection";
import Recommendations from "./recommendations/Recommendations";
import CloudDetails from "./CloudDetails";
import { Alert, Snackbar } from "@mui/material";

export default function AddApplications({ newProjectForm, setNewProjectForm, setFailureShowPopup, setSuccessShowPopup }) {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const handleSnackbarOpen = () => {
        setOpenSnackbar(true);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const [levels, setLevels] = useState({
        1: {
            sectionNumber: 1,
            sectionLabel: 'Application Details',
            sectionComponent: <ApplicationDetails />,
            isActive: true,
            isCompleted: false,
            isLast: false
        },
        2: {
            sectionNumber: 2,
            sectionLabel: 'Cloud Details',
            sectionComponent: <CloudDetails />,
            isActive: false,
            isCompleted: false,
            isLast: false
        },
        3: {
            sectionNumber: 3,
            sectionLabel: 'Sustainability Selection',
            sectionComponent: <SustainabilitySelection />,
            isActive: false,
            isCompleted: false,
            isLast: true
        }
    });

    const handleJumpingLevels = (index) => {
        let tempLevels = levels;
        Object.keys(tempLevels).map((key, i) => {
            if (i === index && tempLevels[key].isCompleted) {
                Object.keys(tempLevels).map((k, j) => {
                    tempLevels[k].isActive = false;
                })
                tempLevels[key].isActive = true;
            }
        })
        setLevels({ ...tempLevels })
    }

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.addingAppContainer}>
                <div className={styles.sectionTitle}>
                    Create Sustainability Analysis
                </div>
                <div className={styles.formContainer}>
                    <div className={styles.tracker}>
                        {
                            Object.keys(levels).map((key, index) => {
                                return (
                                    <div key={index}
                                        onClick={() => handleJumpingLevels(index)}
                                        className={`${styles.sectionLevel} ${levels[key].isActive && styles.currentSection} ${levels[key].isCompleted && styles.completedSection}`}>
                                        <div className={styles.sectionNumber}>
                                            {levels[key].sectionNumber}
                                        </div>
                                        <div className={styles.sectionLabel}>{levels[key].sectionLabel}</div>
                                        {
                                            !levels[key].isLast && <ChevronRight />
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    {
                        Object.keys(levels).map((key, index) => {
                            return (
                                <div key={index}>
                                    {levels[key].isActive &&
                                        React.cloneElement(levels[key].sectionComponent, {
                                            currentLevel: levels[key],
                                            levels: levels,
                                            setLevels: setLevels,
                                            handleSnackbarOpen: handleSnackbarOpen,
                                            newProjectForm: newProjectForm,
                                            setNewProjectForm: setNewProjectForm,
                                            setSuccessShowPopup: setSuccessShowPopup,
                                            setFailureShowPopup: setFailureShowPopup
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert variant="filled" severity="success">
                    Connected to the cloud
                </Alert>
            </Snackbar>
        </div>
    );
}