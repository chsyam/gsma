import React from "react";
import UserNavbar from "../../components/navbar/UserNavbar";
import DashboardMenu from "./DashboardMenu";
import ZeroApplicationUI from "../../components/dashboard/ZeroApplicationUI";

export default function Dashboard() {
    return (
        <div>
            <UserNavbar />
            <DashboardMenu />
            <ZeroApplicationUI />
        </div>
    );
}