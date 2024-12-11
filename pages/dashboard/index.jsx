import React from "react";
import UserNavbar from "../../components/navbar/UserNavbar";
import DashboardMenu from "./DashboardMenu";
import ZeroApplicationUI from "../../components/dashboard/ZeroApplicationUI";
import ApplicationList from "../../components/dashboard/ApplicationList";
import { getAllApplications } from "../api/applications/getAllApplications";
import SuccessPopup from "../../components/dashboard/SuccessPopup";
import { useRouter } from "next/router";
import BreadCrumb from "../../components/BreadCrumb";

export default function Dashboard({ projectsList }) {
    const router = useRouter();

    return (
        <div>
            <UserNavbar />
            <DashboardMenu />
            <BreadCrumb />
            {
                !projectsList && projectsList?.length == 0 ? (
                    <ZeroApplicationUI />
                ) : (
                    <ApplicationList projectsList={projectsList} />
                )
            }
        </div>
    );
}

export async function getServerSideProps() {
    try {
        const projectsList = await getAllApplications();
        if (!projectsList) {
            console.log("Error while fetching project list")
            return {
                props: {
                    projectsList: []
                }
            }
        }
        return {
            props: {
                projectsList: projectsList
            }
        }
    } catch (error) {
        console.log(error);
        return {
            props: {
                projectsList: []
            }
        }
    }
}