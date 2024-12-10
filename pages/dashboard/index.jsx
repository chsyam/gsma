import React from "react";
import UserNavbar from "../../components/navbar/UserNavbar";
import DashboardMenu from "./DashboardMenu";
import ZeroApplicationUI from "../../components/dashboard/ZeroApplicationUI";
import ApplicationList from "../../components/dashboard/ApplicationList";
import { getAllApplications } from "../api/applications/getAllApplications";
import SuccessPopup from "../../components/dashboard/SuccessPopup";
import { useRouter } from "next/router";
import BreadCrumb from "../../components/BreadCrumb";

export default function Dashboard({ projectList }) {
    const router = useRouter();

    return (
        <div>
            <UserNavbar />
            <DashboardMenu />
            <BreadCrumb />
            {/* {
                !projectList && projectList?.length == 0 ? (
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