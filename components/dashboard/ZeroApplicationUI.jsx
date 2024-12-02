import { Plus } from "lucide-react";
import styles from "./../../styles/dashboard/AddApplication.module.css"
import { useRouter } from "next/router";

export default function ZeroApplicationUI({ setAddingStatus }) {
    const router = useRouter();
    const handleAddNewApp = () => {
        router.push(`${router.pathname}/add`)
    }
    return (
        <div className={styles.dashboardContainer}>
            <div className="flex justify-between align-center">
                <div className="text-2xl font-semibold">
                    Sustainability Analysis Applications
                </div>
                <div
                    onClick={() => handleAddNewApp()}
                    className={styles.addApplication}>
                    Add Application <Plus />
                </div>
            </div>
            <div className={styles.zeroApplications}>
                <div className="text-xl font-semibold my-1">
                    Add Applications
                </div>
                <div className="text-sm my-1">
                    To know the Reports
                </div>
                <div className="text-xs">
                    *************************************************************
                </div>
                <div
                    onClick={() => handleAddNewApp()}
                    className={`my-6 ${styles.addApplication}`}>
                    Add Application <Plus />
                </div>
            </div>
        </div>
    );
}