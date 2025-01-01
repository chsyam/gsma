import { decrypt } from '../../api/auth/lib';
import Layout from '../../../components/Layout';
import ProjectAnalysis from "../../../components/dashboard/projectAnalysis/ProjectAnalysis";

export default function ApplicationDetails({ project_name }) {
    return (
        <Layout>
            <ProjectAnalysis project_name={project_name} />
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
        return {
            props: {
                username: payload?.username,
                email: payload?.email,
                role: payload?.role,
                project_name: project_name
            }
        }
    }
}