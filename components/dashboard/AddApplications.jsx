import styles from "./../../styles/dashboard/Dashboard.module.css"
import { useState } from "react";
import ZeroApplicationUI from "./ZeroApplicationUI";
import ApplicationDetails from "./ApplicationDetails";

export default function AddApplications() {
    const [addingStatus, setAddingStatus] = useState(true);

    return (
        <div className={styles.dashboardContainer}>
            {
                addingStatus ? (
                    <ApplicationDetails />
                ) : (
                    <ZeroApplicationUI setAddingStatus={setAddingStatus} />
                )
            }
        </div>
    );
}