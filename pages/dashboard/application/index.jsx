import { useRouter } from 'next/router';
import ProjectAnalysis from "../../../components/dashboard/projectAnalysis/ProjectAnalysis";
import UserNavbar from "../../../components/navbar/UserNavbar";
import DashboardMenu from "../DashboardMenu";
import BreadCrumb from '../../../components/BreadCrumb';

export default function ApplicationDetails() {
    const router = useRouter();

    return (
        <div>
            <UserNavbar />
            <DashboardMenu />
            <BreadCrumb />
            <ProjectAnalysis projectList={[]} />
        </div>
    );
}