import React from "react";
import DashboardMenu from "./DashboardMenu";
import ZeroApplicationUI from "../../components/dashboard/ZeroApplicationUI";
import ApplicationList from "../../components/dashboard/ApplicationList";
import { getAllApplications } from "../api/applications/getAllApplications";
import { decrypt } from "../api/auth/lib";

export default function Dashboard({ projectsList }) {
    return (
        <div className="bg-[#F0F0F0]">
            <DashboardMenu />
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
        try {
            const projectsList = await getAllApplications();
            if (!projectsList) {
                console.log("Error while fetching project list")
                return {
                    props: {
                        projectsList: [],
                        username: payload?.username,
                        email: payload?.email,
                        role: payload?.role
                    }
                }
            }
            return {
                props: {
                    projectsList: projectsList,
                    username: payload?.username,
                    email: payload?.email,
                    role: payload?.role
                }
            }
        } catch (error) {
            console.log(error);
            return {
                props: {
                    projectsList: [],
                    username: payload?.username,
                    email: payload?.email,
                    role: payload?.role
                }
            }
        }
    }
}