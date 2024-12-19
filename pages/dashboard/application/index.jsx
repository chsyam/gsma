import ProjectAnalysis from "../../../components/dashboard/projectAnalysis/ProjectAnalysis";
import { decrypt } from '../../api/auth/lib';
import Layout from '../../../components/Layout';
import { getMaturityLevel } from "../../api/applications/getMaturityLevel";
import { getImplementedAreas } from "../../api/applications/getImplementedAreas";
import { getUnImplementedAreas } from "../../api/applications/getUnImplementedAreas";

export default function ApplicationDetails({ maturityLevel, implementedAreas, unImplementedAreas }) {
    return (
        <Layout>
            <ProjectAnalysis projectList={[]} maturityLevel={maturityLevel} implementedAreas={implementedAreas} unImplementedAreas={unImplementedAreas} />
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const { req, res } = context;

    const project_name = context?.query?.projectName
    console.log(project_name);

    if (project_name === undefined) {
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false
            }
        }
    }

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
        const maturityLevel = await getMaturityLevel(project_name);
        const implementedAreas = await getImplementedAreas(project_name);
        const unImplementedAreas = await getUnImplementedAreas(project_name);
        return {
            props: {
                username: payload?.username,
                email: payload?.email,
                role: payload?.role,
                maturityLevel: maturityLevel,
                implementedAreas: implementedAreas,
                unImplementedAreas: unImplementedAreas
            }
        }
    }
}