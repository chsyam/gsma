import { ChevronRight } from "lucide-react";
import styles from "./../../styles/dashboard/AddApplication.module.css"
import React, { useState } from 'react';
import Select from 'react-select';

export default function ApplicationDetails() {
    const [selectedOption, setSelectedOption] = useState(null);
    const options = [
        { value: 'AWS', label: 'AWS' },
        { value: 'Azure', label: 'Azure' },
        { value: 'GCP', label: 'GCP' },
    ];

    return (
        <div className={styles.addingAppContainer}>
            <div className={styles.sectionTitle}>
                Create Sustainability Analysis
            </div>
            <div className={styles.formContainer}>
                <div className={styles.tracker}>
                    <div className={`${styles.sectionLevel} ${styles.activeSection}`}>
                        <div className={styles.sectionNumber}>1</div>
                        <div>Application Details</div>
                    </div>
                    <ChevronRight />
                    <div className={styles.sectionLevel}>
                        <div className={styles.sectionNumber}>2</div>
                        <div>Sustainability Selection</div>
                    </div>
                    <ChevronRight />
                    <div className={styles.sectionLevel}>
                        <div className={styles.sectionNumber}>3</div>
                        <div>Recommendations</div>
                    </div>
                </div>
                <form>
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
                    <div className={styles.formButton}>
                        Save & Next
                    </div>
                </form>
            </div >
        </div >
    );
}