import { useEffect, useState } from "react";
import AddApplications from "../../../components/dashboard/AddApplications";
import ZeroApplicationUI from "../../../components/dashboard/ZeroApplicationUI";
import Layout from "../../../components/Layout";
import UserNavbar from "../../../components/navbar/UserNavbar";
import DashboardMenu from "../DashboardMenu";
import formFields from "./../../../public/data/ApplicationFormFields.json";

export default function AddNewApplication() {
    const [newProjectForm, setNewProjectForm] = useState({});
    useEffect(() => {
        setNewProjectForm(formFields);
    }, []);

    useEffect(() => {
        console.log("newProjectForm", newProjectForm);
    }, [newProjectForm])

    return (
        <Layout>
            <UserNavbar />
            <DashboardMenu />
            <AddApplications
                newProjectForm={newProjectForm}
                setNewProjectForm={setNewProjectForm}
            />
        </Layout>
    );
}