import React, { useEffect, useState } from "react";
import DashboardMenu from "./DashboardMenu";
import ZeroApplicationUI from "../../components/dashboard/ZeroApplicationUI";
import ApplicationList from "../../components/dashboard/ApplicationList";
import { getAllApplications } from "../api/applications/getAllApplications";
import { decrypt } from "../api/auth/lib";
import styles from "./../../styles/Loading.module.css";

export default function Dashboard() {
    const [projectsList, setProjectsList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchProjectsList() {
            setLoading(true);
            const projectsList = await getAllApplications();
            console.log(projectsList);
            if (!projectsList) {
                console.log("Error while fetching project list")
                setProjectsList([]);
            } else {
                setProjectsList(projectsList)
            }
            setLoading(false);
        }
        fetchProjectsList();
    }, [])

    return (
        <div>
            <DashboardMenu />
            {
                loading ? (
                    <div className="flex justify-center items-center flex-nowrap mt-[10%] tracking-wide">
                        <div className={styles.loader} />fetching projects list...
                    </div>
                ) : (
                    <div>
                        {
                            !projectsList || projectsList?.length == 0 ? (
                                <ZeroApplicationUI />
                            ) : (
                                <ApplicationList projectsList={projectsList} />
                            )
                        }
                    </div>
                )
            }
        </div >
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