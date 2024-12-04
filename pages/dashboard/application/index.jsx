import ProjectAnalysis from "../../../components/dashboard/projectAnalysis/ProjectAnalysis";
import UserNavbar from "../../../components/navbar/UserNavbar";
import DashboardMenu from "../DashboardMenu";

export default function ApplicationDetails() {
    return (
        <div>
            <UserNavbar />
            <DashboardMenu />
            <ProjectAnalysis projectList={[]} />
        </div>
    );
}