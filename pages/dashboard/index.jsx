import React from "react";
import UserNavbar from "../../components/navbar/UserNavbar";
import DashboardMenu from "./DashboardMenu";
import ZeroApplicationUI from "../../components/dashboard/ZeroApplicationUI";
import ApplicationList from "../../components/dashboard/ApplicationList";
import { getAllApplications } from "../api/applications/getAll";

export default function Dashboard({ projectList }) {
    return (
        <div>
            <UserNavbar />
            <DashboardMenu />
            {/* {
                projectList && projectList?.length == 0 ? (
                    <ZeroApplicationUI />
                ) : (
                    <ApplicationList projectList={projectList} />
                )
            } */}
            <ApplicationList projectList={projectList} />
        </div>
    );
}

export async function getServerSideProps() {
    const projectList = await getAllApplications();
    return {
        props: {
            projectList
        }
    }
}