import AddApplications from "../../../components/dashboard/AddApplications";
import ZeroApplicationUI from "../../../components/dashboard/ZeroApplicationUI";
import Layout from "../../../components/Layout";
import UserNavbar from "../../../components/navbar/UserNavbar";
import DashboardMenu from "../DashboardMenu";

export default function AddNewApplication() {
    return (
        <Layout>
            <UserNavbar />
            <DashboardMenu />
            <AddApplications />
        </Layout>
    );
}