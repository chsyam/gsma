import React from "react";
import UserNavbar from "../../components/navbar/UserNavbar";
import DashboardMenu from "./DashboardMenu";
import ZeroApplicationUI from "../../components/dashboard/ZeroApplicationUI";
import ApplicationList from "../../components/dashboard/ApplicationList";

export default function Dashboard() {
    return (
        <div>
            <UserNavbar />
            <DashboardMenu />
            {/* <ZeroApplicationUI /> */}
            <ApplicationList />
        </div>
    );
}