import React, { useEffect, useState } from 'react';
import styles from "./../../styles/dashboard/CloudDetails.module.css"
import AwsSvg from '../icons/AWS';
import AzureSVG from '../icons/AzureSVG';
import GcpSVG from '../icons/GcpSVG';
import { Alert, Backdrop, CircularProgress, Snackbar } from '@mui/material';

export default function CloudDetails({ currentLevel, levels, setLevels, handleSnackbarOpen, newProjectForm,
    setNewProjectForm }) {
    const [activeCloud, setActiveCloud] = useState("AWS");
    useEffect(() => {
        setNewProjectForm({ ...newProjectForm, "cloudProvider": activeCloud })
    }, [activeCloud])

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
        setTimeout(() => {
            handleClose();
            handleSaveNext();
            handleSnackbarOpen();
        }, 500);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProjectForm({ ...newProjectForm, [name]: value });
    }

    const cloudOptions = {
        "AWS": {
            cloudName: 'AWS',
            svgLogo: <AwsSvg height='150px' width='150px' />,
            components: [
                {
                    name: 'secretKey',
                    placeholder: 'enter secret key',
                    label: 'Secret Key'
                },
                {
                    name: 'accessKey',
                    placeholder: 'enter access key',
                    label: 'Access Key'
                }
            ]
        },
        "GCP": {
            cloudName: 'GCP',
            svgLogo: <GcpSVG height='150px' width='150px' />,
            components: [
                {
                    name: 'secretKey',
                    placeholder: 'enter secret key',
                    label: 'Secret Key'
                },
                {
                    name: 'accessKey',
                    placeholder: 'enter access key',
                    label: 'Access Key'
                }
            ]
        },
        "Azure": {
            cloudName: 'Azure',
            svgLogo: <AzureSVG height='150px' width='150px' />,
            components: [
                {
                    name: 'secretKey',
                    placeholder: 'enter secret key',
                    label: 'Secret Key'
                },
                {
                    name: 'accessKey',
                    placeholder: 'enter access key',
                    label: 'Access Key'
                }
            ]
        }
    }

    const handleSaveNext = () => {
        const temp = [];
        Object.keys(levels).map((key) => {
            if (currentLevel.sectionNumber == levels[key].sectionNumber) {
                const currentLevelObject = levels[key];
                currentLevelObject["isCompleted"] = true;
                currentLevelObject["isActive"] = false;
                temp.push(currentLevelObject);
            } else if (currentLevel.sectionNumber + 1 == levels[key].sectionNumber) {
                const nextLevelObject = levels[key];
                nextLevelObject["isActive"] = true;
                temp.push(nextLevelObject);
            } else {
                temp.push(levels[key])
            }
        })
        setLevels(temp);
    }

    return (
        <div className='p-[7%] py-4 my-7 bg-white rounded-md flex justify-around gap-2 items-center'>
            <div className='flex-grow flex justify-center'>
                {
                    cloudOptions[activeCloud].svgLogo
                }
            </div>
            <div className='w-[50%]'>
                <div className='font-semibold mb-4 text-xl'>
                    Cloud Provider
                </div>
                <div className='flex justify-left gap-4 flex-nowrap border rounded-md w-fit mb-2'>
                    {
                        Object.keys(cloudOptions).map((cloud, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`cursor-pointer py-2 px-5 ${activeCloud === cloudOptions[cloud].cloudName && 'bg-[#549B79] text-white rounded-md border border-[#549B79]'}`}
                                    onClick={() => setActiveCloud(cloudOptions[cloud].cloudName)}
                                >
                                    {cloudOptions[cloud].cloudName}
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    {
                        cloudOptions[activeCloud].components.map((component, index) => {
                            return (
                                <div className={styles.formGroup} key={index}>
                                    <div className={styles.formElement}>
                                        <label htmlFor={component.name}>
                                            {component.label}
                                        </label>
                                        <br />
                                        <input
                                            name={component.name}
                                            value={newProjectForm[component.name] || ""}
                                            onChange={(e) => handleChange(e)}
                                            id={component.name}
                                            placeholder={component.placeholder}
                                        />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={styles.formButton}
                    onClick={() => {
                        handleOpen();
                    }}
                >
                    Connect
                </div>
                <Backdrop
                    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                    open={open}
                    onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        </div>
    );
}