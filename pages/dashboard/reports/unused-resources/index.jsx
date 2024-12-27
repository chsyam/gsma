import { useEffect, useState } from "react";
import { decrypt } from "./../../../api/auth/lib";
import styles from "./unusedResources.module.css";
import { getUnusedAWSResources } from "../../../api/reports/unusedAWSResources";
import { getUnusedK8sResources } from "../../../api/reports/unusedK8sResources";
import { Checkbox, FormControlLabel, Input, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import dynamic from "next/dynamic";
import { CheckBox } from "@mui/icons-material";

const awsTableHeads = [
    { name: 'Instance Name', align: 'left' },
    { name: 'Instance ID', align: 'center' },
    { name: 'Instance State', align: 'center' },
    { name: 'Instance Type', align: 'center' },
    { name: 'Start Time', align: 'center' },
    { name: 'Unused Since (days)', align: 'center' },
]

const k8sTableHeads = [
    { name: 'Namespace', align: 'left' },
    { name: 'Resource Type', align: 'left' },
    { name: 'Resource Name', align: 'left' },
];

const tableCellStyles = {
    fontSize: '14px',
    color: '#17202a',
    borderRight: '1px solid #c9c8c7',
}

const tableHeadStyles = {
    fontSize: '14px',
    color: '#000',
    fontFamily: 'Montserrat',
    fontSize: '16px',
    fontWeight: 600,
    borderRight: '1px solid #c9c8c7'
}

export default function UnusedResources() {
    const Select = dynamic(() => import('react-select'), { ssr: false });

    const [showAWSResources, setShowAWSResources] = useState(true);
    const [showK8sResources, setShowK8sResources] = useState(true);
    const [awsResources, setAWSResources] = useState([]);
    const [k8sResources, setK8sResources] = useState([]);
    const [instancesList, setInstancesList] = useState([]);
    const [k8sNameSpacesList, setK8sNameSpacesList] = useState([]);
    const [k8sResourcesList, setK8sResourcesList] = useState([]);
    const [filteredAWSRows, setFilterdAWSRows] = useState([]);
    const [filteredK8sRows, setFilterdK8sRows] = useState([]);
    const [selectedInstances, setSelectedInstances] = useState([]);
    const [instanceSearchTerm, setInstanceSearchTerm] = useState('');
    const [resourceSearchTerm, setResourceSearchTerm] = useState('');
    const [selectedNamespaces, setSelectedNamespaces] = useState([]);
    const [selectedK8sResources, setSelectedK8sResources] = useState([]);

    useEffect(() => {
        const fetchUnusedReources = async () => {
            try {
                const temp_unused_AWS = await getUnusedAWSResources();
                const temp_unused_k8s = await getUnusedK8sResources();
                setAWSResources(temp_unused_AWS);
                setK8sResources(temp_unused_k8s);
            } catch (error) {
                console.log(error)
            }
        }
        fetchUnusedReources();
    }, []);

    useEffect(() => {
        let temp_instance_types = [];
        let temp_instance_checks = [];
        awsResources.forEach((resource) => {
            if (!temp_instance_checks.includes(resource.instanceType)) {
                temp_instance_types.push(
                    { value: resource.instanceType, label: resource.instanceType }
                );
                temp_instance_checks.push(resource.instanceType);
            }
        })
        setInstancesList(temp_instance_types);

        let temp_k8s_namespaces = [];
        let temp_k8s_namespace_checks = [];
        k8sResources.forEach((resource) => {
            if (!temp_k8s_namespace_checks.includes(resource.namespace)) {
                temp_k8s_namespaces.push(
                    { value: resource.namespace, label: resource.namespace }
                );
                temp_k8s_namespace_checks.push(resource.namespace);
            }
        })
        setK8sNameSpacesList(temp_k8s_namespaces);

        let temp_k8s_resources = [];
        let temp_k8s_resource_checks = [];
        k8sResources.forEach((resource) => {
            if (!temp_k8s_resource_checks.includes(resource.resource_type)) {
                temp_k8s_resources.push(
                    { value: resource.resource_type, label: resource.resource_type }
                );
                temp_k8s_resource_checks.push(resource.resource_type);
            }
        })
        setK8sResourcesList(temp_k8s_resources);
    }, [awsResources, k8sResources])

    useEffect(() => {
        let temp = awsResources;
        if (instanceSearchTerm !== "") {
            temp = temp.filter((row) => {
                return row.instanceName?.toLowerCase().includes(instanceSearchTerm.toLowerCase()) || row.instanceId?.toLowerCase().includes(instanceSearchTerm.toLowerCase());
            })
        }
        if (selectedInstances.length !== 0) {
            temp = temp.filter((row) => {
                return selectedInstances.map((level) => level.value).includes(row.instanceType)
            })
        }
        setFilterdAWSRows(temp);
    }, [instanceSearchTerm, selectedInstances, awsResources])

    useEffect(() => {
        let temp = k8sResources;
        if (resourceSearchTerm !== "") {
            temp = temp.filter((row) => {
                return row.resource_name?.toLowerCase().includes(resourceSearchTerm.toLowerCase());
            })
        }
        if (selectedK8sResources.length !== 0) {
            temp = temp.filter((row) => {
                return selectedK8sResources.map((level) => level.value).includes(row.resource_type)
            })
        }
        if (selectedNamespaces.length !== 0) {
            temp = temp.filter((row) => {
                return selectedNamespaces.map((level) => level.value).includes(row.namespace)
            })
        }
        setFilterdK8sRows(temp);
    }, [resourceSearchTerm, selectedK8sResources, selectedNamespaces, k8sResources])

    const handleSelectedInstancesChange = (selectedOption) => {
        setSelectedInstances(selectedOption);
    }
    const handleSelectedK8sNamespacesChange = (selectedOption) => {
        setSelectedNamespaces(selectedOption);
    }
    const handleSelectedK8sResourcesChange = (selectedOption) => {
        setSelectedK8sResources(selectedOption);
    }

    return (
        <div className={styles.bodyContainer}>
            <div>
                <div>
                    <FormControlLabel control={<Checkbox size="large" checked={showAWSResources} onChange={() => setShowAWSResources(!showAWSResources)} />} label="Unused EC2 Resources" />
                    <FormControlLabel control={<Checkbox size="large" checked={showK8sResources} onChange={() => setShowK8sResources(!showK8sResources)} />} label="Unused K8s Resources" />
                </div>
            </div>
            {
                (!showAWSResources && !showK8sResources) && (
                    <div className="mt-24 text-center text-xl font-medium tracking-wide">
                        Please check the boxes to display the unused resources.
                    </div>
                )
            }
            <div>
                {
                    showAWSResources && (
                        <div>
                            <div className={styles.title}>
                                Unused EC2 Resources
                            </div>
                            <div className="flex justify-between items-center gap-8 my-4 flex-wrap">
                                <div className="flex-grow max-w-[40%]">
                                    <input
                                        className="w-full py-2 px-4 text-sm rounded-sm border border-[#CED4DA]"
                                        type="text"
                                        placeholder="Type to search for Instances..."
                                        name="instanceSearchTerm"
                                        id="instanceSearchTerm"
                                        value={instanceSearchTerm}
                                        onChange={(e) => setInstanceSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="min-w-[200px]">
                                    <Select
                                        placeholder="Instance Type"
                                        options={instancesList}
                                        isMulti
                                        value={selectedInstances}
                                        onChange={handleSelectedInstancesChange}
                                        styles={{
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                fontSize: '14px'
                                            }),
                                        }}
                                    />
                                </div>
                            </div>
                            <TableContainer sx={{ boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)' }}>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ background: '#549B79' }}>
                                            {
                                                awsTableHeads.map((item, index) => {
                                                    return (
                                                        <TableCell key={index} align={item.align}
                                                            sx={tableHeadStyles}
                                                        >
                                                            {item.name}
                                                        </TableCell>
                                                    )
                                                })
                                            }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            filteredAWSRows.map((resource, index) => {
                                                return (
                                                    <TableRow hover tabIndex={-1}
                                                        key={index}
                                                        sx={{ fontSize: 14, backgroundColor: 'white' }}
                                                    >
                                                        <TableCell align='left' sx={tableCellStyles}>
                                                            {resource.instanceName ? resource.instanceName : "-"}
                                                        </TableCell>
                                                        <TableCell align='center' sx={tableCellStyles}>
                                                            {resource.instanceId ? resource.instanceId : '-'}
                                                        </TableCell>
                                                        <TableCell align='center' sx={tableCellStyles}>
                                                            <div className='max-w-[400px]'>
                                                                {resource.instanceState ? resource.instanceState : '-'}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell align='center' sx={tableCellStyles}>
                                                            {resource.instanceType ? resource.instanceType : '-'}
                                                        </TableCell>
                                                        <TableCell align='center' sx={tableCellStyles}>
                                                            {resource.startTimeConverted ? resource.startTimeConverted : '-'}
                                                        </TableCell>
                                                        <TableCell align='center' sx={tableCellStyles}>
                                                            {resource['Unused Days'] ? resource['Unused Days'] : '-'}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    )
                }
            </div>
            <div>
                {
                    showK8sResources && (
                        <div>
                            <div className={styles.title}>
                                Unused Kubernetes Resources
                            </div>
                            <div className="flex justify-between items-center gap-4 my-4 flex-wrap">
                                <div className="flex gap-4 flex-wrap justify-left items-center">
                                    <Select
                                        placeholder="Select NameSpaces"
                                        options={k8sNameSpacesList}
                                        isMulti
                                        value={selectedNamespaces}
                                        onChange={handleSelectedK8sNamespacesChange}
                                        styles={{
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                fontSize: '14px'
                                            }),
                                        }}
                                    />
                                    <Select
                                        placeholder="Select Resources Types"
                                        options={k8sResourcesList}
                                        isMulti
                                        value={selectedK8sResources}
                                        onChange={handleSelectedK8sResourcesChange}
                                        styles={{
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                fontSize: '14px'
                                            }),
                                        }}
                                    />
                                </div>
                                <div className="flex-grow max-w-[30%]">
                                    <input
                                        className="w-full py-2 px-4 text-sm rounded-sm border border-[#CED4DA]"
                                        type="text"
                                        placeholder="Type to search for Resource Names..."
                                        name="resourceSearchTerm"
                                        id="resourceSearchTerm"
                                        value={resourceSearchTerm}
                                        onChange={(e) => setResourceSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            <TableContainer sx={{ boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)' }}>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ background: '#549B79' }}>
                                            {
                                                k8sTableHeads.map((item, index) => {
                                                    return (
                                                        <TableCell key={index} align={item.align} sx={tableHeadStyles}>
                                                            {item.name}
                                                        </TableCell>
                                                    )
                                                })
                                            }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            filteredK8sRows.map((resource, index) => {
                                                return (
                                                    <TableRow hover tabIndex={-1}
                                                        key={index}
                                                        sx={{ fontSize: 14, backgroundColor: 'white' }}
                                                    >
                                                        <TableCell align='left' sx={tableCellStyles}>
                                                            {resource.namespace ? resource.namespace : "-"}
                                                        </TableCell>
                                                        <TableCell align='left' sx={tableCellStyles}>
                                                            {resource.resource_type ? resource.resource_type : '-'}
                                                        </TableCell>
                                                        <TableCell align='left' sx={tableCellStyles}>
                                                            <div className='max-w-[400px]'>
                                                                {resource.resource_name ? resource.resource_name : '-'}
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    )
                }
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