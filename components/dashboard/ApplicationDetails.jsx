import React, { useState } from 'react';
import Select from 'react-select';
import styles from "./../../styles/dashboard/AddApplication.module.css"

export default function ApplicationDetails({ currentLevel, levels, setLevels }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const options = [
        { value: 'AWS', label: 'AWS' },
        { value: 'Azure', label: 'Azure' },
        { value: 'GCP', label: 'GCP' },
    ];

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

    return (
        <form className='px-[6%] my-14'>
            <div className={styles.formGroup}>
                <div className={styles.formElement}>
                    <label htmlFor="applicationName">
                        Application Name
                    </label>
                    <br />
                    <input name="applicationName" id="applicationName" placeholder="enter application name" />
                </div>
                <div className={styles.formElement}>
                    <label htmlFor="applicationVersion">
                        Application Version
                    </label>
                    <br />
                    <input name="applicationVersion" id="applicationVersion" placeholder="enter application version" />
                </div>
            </div>
            <div className={styles.formGroup}>
                <div className={styles.formElement}>
                    <label htmlFor="applicationDescription">
                        Application Description
                    </label>
                    <br />
                    <textarea name="applicationDescription" id="applicationDescription" placeholder="description about the application"></textarea>
                </div>
            </div>
            <div className={styles.formGroup}>
                <div className={styles.formElement}>
                    <label htmlFor="companyName">
                        Company Name
                    </label>
                    <br />
                    <input name="companyName" id="companyName" placeholder="enter company name" />
                </div>
                <div className={styles.formElement}>
                    <label htmlFor="cloudProvider">
                        Cloud Provider
                    </label>
                    <br />
                    <Select
                        instanceId="cloudProvider"
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={options}
                    />
                </div>
            </div>
            <div className={styles.formGroup}>
                <div className={styles.formElement}>
                    <label htmlFor="secretKey">
                        Secret Key
                    </label>
                    <br />
                    <input name="secretKey" id="secretKey" placeholder="enter secret key" />
                </div>
                <div className={styles.formElement}>
                    <label htmlFor="accessKey">
                        Access Key
                    </label>
                    <br />
                    <input name="accessKey" id="accessKey" placeholder="enter access key" />
                </div>
            </div>
            <div className={styles.formButton} onClick={() => handleSaveNext()}>
                Save & Next
            </div>
        </form>
    );
}