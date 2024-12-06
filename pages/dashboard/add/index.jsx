import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import AddApplications from "../../../components/dashboard/AddApplications";
import ZeroApplicationUI from "../../../components/dashboard/ZeroApplicationUI";
import Layout from "../../../components/Layout";
import UserNavbar from "../../../components/navbar/UserNavbar";
import DashboardMenu from "../DashboardMenu";
import formFields from "./../../../public/data/ApplicationFormFields.json";
import SuccessPopup from "../../../components/dashboard/SuccessPopup";

export default function AddNewApplication() {
    const [newProjectForm, setNewProjectForm] = useState({});
    useEffect(() => {
        setNewProjectForm(formFields);
    }, []);

    const [showPopup, setShowPopup] = useState(false);
    const router = useRouter();

    return (
        <Layout>
            <UserNavbar />
            <DashboardMenu />
            {router.pathname}
            <AddApplications
                newProjectForm={newProjectForm}
                setNewProjectForm={setNewProjectForm}
                setShowPopup={setShowPopup}
            />
            <SuccessPopup showPopup={showPopup} setShowPopup={setShowPopup} />
        </Layout>
    );
}