import React from 'react';
import styles from "./../../styles/dashboard/AddApplication.module.css"

export default function ApplicationDetails({ currentLevel, levels, setLevels, newProjectForm,
    setNewProjectForm }) {
    const handleSaveNext = () => {
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
        const { name, value } = e.target;
        setNewProjectForm({ ...newProjectForm, [name]: value });
    }

    return (
        <form className='px-[6%] my-14'>
            <div className={styles.formGroup}>
                <div className={styles.formElement}>
                    <label htmlFor="projectName">
                        Application Name
                    </label>
                    <br />
                    <input
                        name="projectName"
                        id="projectName"
                        value={newProjectForm['projectName'] || ""}
                        onChange={(e) => handleChange(e)}
                        placeholder="enter application name"
                    />
                </div>
                <div className={styles.formElement}>
                    <label htmlFor="projectVersion">
                        Application Version
                    </label>
                    <br />
                    <input
                        name="projectVersion"
                        id="projectVersion"
                        value={newProjectForm['projectVersion'] || ""}
                        onChange={(e) => handleChange(e)}
                        placeholder="enter application version"
                    />
                </div>
            </div>
            <div className={styles.formGroup}>
                <div className={styles.formElement}>
                    <label htmlFor="projectDescription">
                        Application Description
                    </label>
                    <br />
                    <textarea
                        name="projectDescription"
                        id="projectDescription"
                        value={newProjectForm['projectDescription'] || ""}
                        onChange={(e) => handleChange(e)}
                        placeholder="description about the application"
                    ></textarea>
                </div>
            </div>
            <div className={styles.formButton} onClick={() => handleSaveNext()}>
                Next
            </div>
        </form>
    );
}