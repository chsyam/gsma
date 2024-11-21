import React from "react";
import UserNavbar from "../../components/navbar/UserNavbar";
import DashboardMenu from "./DashboardMenu";
import AddApplications from "../../components/dashboard/AddApplications";

export default function Dashboard() {
    return (
        <div>
            <UserNavbar />
            <DashboardMenu />
            <AddApplications />
        </div>
    );
}