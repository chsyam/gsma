import { useEffect, useState } from "react";
import { decrypt } from "../../../api/auth/lib"
import { optimizeEc2Instances } from "../../../api/reports/ec2InstanceOptimize";
import { Box, Divider, Modal, Typography } from "@mui/material";
import { X } from "lucide-react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    height: '90%',
    overflowY: 'scroll',
    backgroundColor: '#FFF',
    boxShadow: 24,
    padding: '40px',
    outline: 'none',
};

export default function Ec2InstanceOptimize() {
    const [underProvisioned, setUnderProvisioned] = useState([]);
    const [optimized, setOptimized] = useState([]);
    const [overProvisioned, setOverProvisioned] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ec2InstancesList, setEc2InstancesList] = useState([]);
    const [instanceDetails, setInstanceDetails] = useState({});
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        setLoading(true);
        const getInstancesList = async () => {
            try {
                const ec2Instances = await optimizeEc2Instances();
                console.log(ec2Instances)
                setEc2InstancesList(ec2Instances);
                return ec2Instances;
            } catch (error) {
                console.log(error)
            }
        }
        getInstancesList();
    }, [])

    useEffect(() => {
        if (ec2InstancesList?.instanceRecommendations?.length > 0) {
            const tempUnderProvisioned = ec2InstancesList?.instanceRecommendations?.filter((instance) => instance.finding === "UNDER_PROVISIONED");
            const tempOptimized = ec2InstancesList?.instanceRecommendations?.filter((instance) => instance.finding === "OPTIMIZED");
            const tempOverProvisioned = ec2InstancesList?.instanceRecommendations?.filter((instance) => instance.finding === "OVER_PROVISIONED");

            setUnderProvisioned(tempUnderProvisioned);
            setOptimized(tempOptimized);
            setOverProvisioned(tempOverProvisioned);
        }
        setLoading(false);
    }, [ec2InstancesList])

    const getInstanceId = (instanceArn) => {
        const instanceId = instanceArn.split("/").pop();
        return instanceId;
    }

    const handleClick = (instance) => {
        let temp = {};
        temp["instanceName"] = instance?.instanceName;
        temp["instanceId"] = getInstanceId(instance?.instanceArn);
        temp["instanceType"] = instance?.currentInstanceType;
        // console.log(instance?.utilizationMetrics)
        instance?.utilizationMetrics?.map((item) => {
            if (item.name === "CPU") {
                temp["CPU"] = item.value.toFixed(2);
            }
        })
        temp["recommendationOptions"] = instance?.recommendationOptions;
        setInstanceDetails(temp);
    }

    useEffect(() => {
        if (Object.keys(instanceDetails).length > 0) {
            console.log(instanceDetails)
            setOpen(true);
        }
    }, [instanceDetails])

    const getInstanceComponent = (instance, index) => {
        return (
            <div key={index} onClick={() => handleClick(instance)} className="bg-[#E3EBFA] hover:bg-blue-100 border border-white hover:border-blue-500 cursor-pointer flex justify-between items-center gap-4 m-4 rounded-md px-4">
                <div>
                    <div className="font-semibold my-2 text-[16px]">{instance?.instanceName}</div>
                    <div className="text-[14px] my-2">
                        {getInstanceId(instance?.instanceArn)}
                    </div>
                </div>
                <div className="text-blue-600 font-medium text-[16px]">
                    {instance?.currentInstanceType}
                </div>
            </div>
        );
    }

    const getInstanceDetailsComponent = (instanceDetails) => {
        return (
            <div>
                <div className="flex flex-wrap gap-4 items-center justify-between mb-3">
                    <div className="text-2xl font-medium">Instance Details</div>
                    <div className="cursor-pointer" onClick={() => setOpen(false)}>
                        <X />
                    </div>
                </div>
                <Divider />
                <div>
                    <div className="flex justify-center items-center gap-8 my-8">
                        <div className="flex-1 bg-[#DBEAFE] px-4 py-2 rounded-lg">
                            <span className="text-[16px] font-semibold">
                                Instance Name
                            </span>
                            <br />
                            <span>
                                {instanceDetails?.instanceName}
                            </span>
                        </div>
                        <div className="flex-1 bg-[#DBEAFE] px-4 py-2 rounded-lg">
                            <span className="text-[16px] font-semibold">
                                Instance ID
                            </span>
                            <br />
                            <span>
                                {instanceDetails?.instanceId}
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-8 my-8">
                        <div className="flex-1 bg-[#DBEAFE] px-4 py-2 rounded-lg">
                            <span className="text-[16px] font-semibold">
                                Current Type
                            </span>
                            <br />
                            <span>
                                {instanceDetails?.instanceType}
                            </span>
                        </div>
                        {
                            instanceDetails?.CPU && (
                                <div className="flex-1 bg-[#DBEAFE] px-4 py-2 rounded-lg">
                                    <span className="text-[16px] font-semibold">
                                        CPU
                                    </span>
                                    <br />
                                    <span>
                                        {instanceDetails?.CPU} %
                                    </span>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div>
                    <div className="text-xl font-semibold">
                        Recommended Instance Types
                    </div>
                    {
                        instanceDetails.recommendationOptions?.length === 0 ? (
                            <div>
                                <div className="text-xl font-medium text-red-600 text-center my-12">
                                    No recommendations available
                                </div>
                            </div>
                        ) : (
                            instanceDetails.recommendationOptions?.map((recommendation, index) => {
                                return (
                                    <div key={index} className="w-full bg-[#F8FAFC] border border-gray-300 p-4 rounded-lg hover:border-blue-600 cursor-pointer my-4">
                                        <div className="flex justify-between flex-wrap gap-4 mb-2">
                                            <div className="font-medium">
                                                {recommendation?.instanceType}
                                            </div>
                                            <div className="font-medium text-white rounded-md px-2 py-1 bg-blue-600">Rank {index + 1}</div>
                                        </div>
                                        <div className="flex justify-left items-center gap-4 mt-4">
                                            {
                                                recommendation?.projectedUtilizationMetrics.map((metric, ind) => {
                                                    return (
                                                        metric?.name === 'CPU' &&
                                                        <div key={ind} className="flex-1 bg-[#DBEAFE] px-4 py-2 rounded-lg">
                                                            <div className="text-[14px] font-semibold mb-2">
                                                                CPU (MAXIMUM)
                                                            </div>
                                                            <div className="font-medium text-[16px] h-[32px] leading-8">
                                                                {metric?.value.toFixed(2)} %
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                            <div className="flex-1 bg-[#DBEAFE] px-4 py-2 rounded-lg">
                                                <div className="text-[14px] font-semibold mb-2">
                                                    Savings
                                                </div>
                                                <div className="font-medium text-[16px] h-[32px] leading-8">
                                                    NA
                                                </div>
                                            </div>
                                            <div className="flex-1 bg-[#DBEAFE] px-4 py-2 rounded-lg">
                                                <div className="text-[14px] font-semibold mb-2">
                                                    Migration Effort
                                                </div>
                                                <div className="font-medium bg-green-300 text-green-600 w-fit rounded-xl px-2 text-[16px] h-[32px] leading-8">
                                                    {recommendation?.migrationEffort}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )
                    }
                </div>
            </div>
        );
    }

    return (
        <div className="px-[5%] pb-[50px]">
            <div className="text-2xl text-center font-semibold my-4">
                EC2 Instance Optimization
            </div>
            <div className="flex justify-around gap-8 py-[20px] flex-wrap items-start">
                <div className="flex-1 bg-white px-2 rounded-xl shadow-lg">
                    <div className="text-xl font-medium my-4 flex justify-left gap-2 items-center">
                        <div className="h-4 w-4 rounded-full bg-[#F97316]"></div>
                        Under-provisioned ({underProvisioned.length})
                    </div>
                    <Divider />
                    <div>
                        {
                            underProvisioned.map((instance, index) => {
                                return (
                                    getInstanceComponent(instance, index)
                                )
                            })
                        }
                    </div>
                </div>
                <div className="flex-1 bg-white px-2 rounded-xl shadow-lg">
                    <div className="text-xl font-medium my-4 flex justify-left gap-2 items-center">
                        <div className="h-4 w-4 rounded-full bg-[#22C55E] border border-[#22C55E]"></div>
                        Optimized ({optimized.length})
                    </div>
                    <Divider />
                    <div>
                        {
                            optimized.map((instance, index) => {
                                return (
                                    getInstanceComponent(instance, index)
                                )
                            })
                        }
                    </div>
                </div>
                <div className="flex-1 bg-white px-2 rounded-xl shadow-lg">
                    <div className="text-xl font-medium my-4 flex justify-left gap-2 items-center">
                        <div className="h-4 w-4 rounded-full bg-[#EF4444] border border-[#EF4444]"></div>
                        Over-provisioned ({overProvisioned.length})
                    </div>
                    <Divider />
                    <div>
                        {
                            overProvisioned.map((instance, index) => {
                                return (
                                    getInstanceComponent(instance, index)
                                )
                            })
                        }
                    </div>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div style={style}>
                        {getInstanceDetailsComponent(instanceDetails)}
                    </div>
                </Modal>
            </div>
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
        return {
            props: {
                username: payload?.username,
                email: payload?.email,
                role: payload?.role
            }
        }
    }
}