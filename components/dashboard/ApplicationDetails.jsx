import React, { useEffect, useState } from 'react';
import styles from "./../../styles/dashboard/AddApplication.module.css"

export default function ApplicationDetails({ currentLevel, levels, setLevels, newProjectForm,
    setNewProjectForm, projectsList }) {
    const [projectNameError, setProjectNameError] = useState("");
    const [projectDescriptionError, setProjectDescriptionError] = useState("");
    const [valid, setValid] = useState(false);

    const handleSaveNext = () => {
        if (!newProjectForm['projectDescription'] === "" || newProjectForm['projectDescription']?.length < 3) {
            setProjectDescriptionError("Application description is required. Atleast 3 characters required.");
            return;
        } else {
            setProjectDescriptionError("");
        }

        if (!newProjectForm['projectName'] === "" || newProjectForm['projectName']?.length < 3) {
            setProjectNameError("Application name is required. Atleast 3 characters required.");
            return;
        } else {
            setProjectNameError("");
        }

        const temp = [];
        Object.keys(levels).map((key, index) => {
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

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name === 'projectName')
            value = value.replace(/^\d+/, '').replace(/[^a-zA-Z0-9 ]/g, '');
        setNewProjectForm({ ...newProjectForm, [name]: value });
    }

    useEffect(() => {
        if (projectNameError === "" && projectDescriptionError === "") {
            setValid(true);
        } else {
            setValid(false);
        }
    }, [projectNameError, projectDescriptionError])

    const handleFieldError = (field) => {
        if (field === "projectName") {
            if (!newProjectForm['projectName'] || newProjectForm['projectName'].length < 3) {
                setProjectNameError("Application name is required. Atleast 3 characters required.");
            } else if (projectNameError !== "Application name is already exists") {
                setProjectNameError("");
            }
        }
        if (field === "projectDescription") {
            if (!newProjectForm['projectDescription'] === "" || newProjectForm['projectDescription'].length < 3) {
                setProjectDescriptionError("Application description is required. Atleast 3 characters required.");
            } else {
                setProjectDescriptionError("");
            }
        }
    }

    useEffect(() => {
        let projectWithSameName = projectsList?.filter((project) => project?.application_name === newProjectForm['projectName']);
        if (newProjectForm['projectName'] === "") {
            setValid(false);
        } else if (projectWithSameName.length > 0) {
            setProjectNameError("Application name is already exists");
        } else if (newProjectForm['projectName']?.length < 3) {
            setProjectNameError("Application name is required. Atleast 3 characters required.");
        } else {
            setProjectNameError("");
        }
    }, [newProjectForm['projectName']])

    useEffect(() => {
        if (newProjectForm['projectDescription'] === "") {
            setValid(false);
        }
        else if (newProjectForm['projectDescription']?.length < 3) {
            setProjectDescriptionError("Application description is required. Atleast 3 characters required.");
        } else {
            setProjectDescriptionError("");
        }
    }, [newProjectForm['projectDescription']])

    return (
        <form className='px-[6%] my-14'>
            <div className={styles.formGroup}>
                <div className={styles.formElement}>
                    <label htmlFor="projectName">
                        Application Name<span className='text-red-500 font-semibold pl-1'>*</span>
                    </label>
                    <br />
                    <input
                        name="projectName"
                        id="projectName"
                        value={newProjectForm['projectName'] || ""}
                        onChange={(e) => handleChange(e)}
                        placeholder="enter application name"
                        onBlur={() => handleFieldError("projectName")}
                    />
                    <div className='text-sm text-red-600 my-1 font-medium'>
                        {projectNameError}
                    </div>
                </div>
            </div>
            <div className={styles.formGroup}>
                <div className={styles.formElement}>
                    <label htmlFor="projectDescription">
                        Application Description<span className='text-red-500 font-semibold pl-1'>*</span>
                    </label>
                    <br />
                    <textarea
                        name="projectDescription"
                        id="projectDescription"
                        value={newProjectForm['projectDescription'] || ""}
                        onChange={(e) => handleChange(e)}
                        placeholder="description about the application"
                        onBlur={() => handleFieldError("projectDescription")}
                    />
                    <div className='text-sm text-red-600 my-1 font-medium'>
                        {projectDescriptionError}
                    </div>
                </div>
            </div>
            <div className='flex flex-row-reverse'>
                {
                    valid ? (
                        <div className={styles.formButton} onClick={() => handleSaveNext()}>
                            Next
                        </div>
                    ) : (
                        <div className="border-2 border-[#6fa98d] py-2 px-4 rounded-md font-semibold cursor-not-allowed">
                            Next
                        </div>
                    )
                }
            </div>
        </form>
    );
}