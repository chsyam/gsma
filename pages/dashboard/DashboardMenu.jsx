import { useState } from "react";
import styles from "./../../styles/dashboard/DashboardMenu.module.css"

export default function DashboardMenu() {
    const [active, setActive] = useState('dashboard');

    return (
        <div className={styles.menuContainer}>
            <ol className="flex gap-10 justify-left flex-nowrap">
                <li
                    onClick={() => setActive("dashboard")}
                    className={`cursor-pointer ${active === 'dashboard' && 'font-bold'}`}
                >
                    Dashboard
                    {
                        active === 'dashboard' &&
                        <div className={styles.active}></div>
                    }
                </li>
                <li
                    onClick={() => setActive("reports")}
                    className={`cursor-pointer ${active === 'reports' && 'font-bold'}`}
                >
                    Reports
                    {
                        active === 'reports' &&
                        <div className={styles.active}></div>
                    }
                </li>
                <li
                    onClick={() => setActive("tools")}
                    className={`cursor-pointer ${active === 'tools' && 'font-bold'}`}
                >
                    Tools
                    {
                        active === 'tools' &&
                        <div className={styles.active}></div>
                    }
                </li>
            </ol>
        </div>
    );
}