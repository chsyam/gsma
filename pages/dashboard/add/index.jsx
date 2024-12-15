import { useEffect, useState } from "react";
import AddApplications from "../../../components/dashboard/AddApplications";
import Layout from "../../../components/Layout";
import DashboardMenu from "../DashboardMenu";
import formFields from "./../../../public/data/ApplicationFormFields.json";
import SuccessPopup from "../../../components/dashboard/SuccessPopup";
import FailurePopup from '../../../components/dashboard/FailurePopup';
import { decrypt } from "../../api/auth/lib";

export default function AddNewApplication() {
    const [newProjectForm, setNewProjectForm] = useState({});
    useEffect(() => {
        setNewProjectForm(formFields);
    }, []);

    useEffect(() => {
        const path = window.location.pathname;
        const pathArray = path.split('/').filter((item) => item !== '');

        console.log(pathArray)
    }, []);

    const [showSuccessPopup, setSuccessShowPopup] = useState(false);
    const [showFailurePopup, setFailureShowPopup] = useState(false);

    return (
        <Layout>
            <DashboardMenu />
            <AddApplications
                newProjectForm={newProjectForm}
                setNewProjectForm={setNewProjectForm}
                setFailureShowPopup={setFailureShowPopup}
                setSuccessShowPopup={setSuccessShowPopup}
            />
            <SuccessPopup showSuccessPopup={showSuccessPopup} setSuccessShowPopup={setSuccessShowPopup} />
            <FailurePopup showFailurePopup={showFailurePopup} setFailureShowPopup={setFailureShowPopup} />
        </Layout>
    );
}


export async function getServerSideProps(context) {
    const { req, res } = context;
    const token = req?.cookies['token']
    const payload = await decrypt(token)
    if (!payload || payload === null || payload === undefined) {
        res.setHeader('Set-Cookie', [
            'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;',
        ]);
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    } else {
        return {
            props: {
                username: payload?.username,
                email: payload?.email,
                role: payload?.role
            }
        }
    }
}