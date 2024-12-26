import { useEffect, useState } from 'react';
import { decrypt } from './../../../api/auth/lib';
import { getInstanceTags } from "./../../../api/reports/getInstanceTags";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function SystemMetrics({ tags }) {
    const [instancesWithTags, setInstancesWithTags] = useState([]);
    const [instancesWithoutTags, setInstancesWithoutTags] = useState([]);

    useEffect(() => {
        let tempWithTags = [];
        let tempWithoutTags = [];
        tags.forEach((tag) => {
            if (tag.tags) {
                tempWithTags.push(tag);
            } else {
                tempWithoutTags.push(tag);
            }
        })
        setInstancesWithTags(tempWithTags);
        setInstancesWithoutTags(tempWithoutTags);
    }, [tags])

    return (
        <div className='flex flex-col items-center'>
            {
                instancesWithoutTags.length !== 0 ? (
                    <div className='my-[40px]'>
                        <div className='text-2xl text-center my-4 font-medium'>
                            Instances without Tags
                        </div>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ background: '#549B79' }}>
                                        <TableCell align='left'
                                            sx={{ fontSize: '14px', color: '#FFF', letterSpacing: '0.05em' }}
                                        >
                                            INSTANCE NAME
                                        </TableCell>
                                        <TableCell align='left'
                                            sx={{ fontSize: '14px', color: '#FFF', letterSpacing: '0.05em' }}
                                        >
                                            INSTANCE ID
                                        </TableCell>
                                        <TableCell align='left'
                                            sx={{ fontSize: '14px', color: '#FFF', letterSpacing: '0.05em' }}
                                        >
                                            INSTANCE TYPE
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        instancesWithoutTags.map((row, index) => {
                                            return (
                                                row.tags && (
                                                    <TableRow hover tabIndex={-1}
                                                        key={index}
                                                        sx={{ fontSize: 14, backgroundColor: 'white' }}
                                                    >
                                                        <TableCell align='left' sx={{
                                                            color: '#17202a'
                                                        }}>
                                                            {row.instanceName ? row.instanceName : "-"}
                                                        </TableCell>
                                                        <TableCell align='left' sx={{
                                                            color: '#17202a'
                                                        }}>
                                                            {row.instanceId ? row.instanceId : '-'}
                                                        </TableCell>
                                                        <TableCell align='left' sx={{
                                                            color: '#17202a'
                                                        }}>
                                                            {row.instanceType ? row.instanceType : '-'}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                ) : (
                    <div className='my-[40px] text-[18px]'>
                        ✅ All AWS instances are tagged appropriately! 🎉 No untagged instances were found.
                    </div>
                )
            }
            {
                instancesWithTags.length !== 0 ? (
                    <div className='mb-[60px]'>
                        <div className='text-2xl text-center my-4 font-medium'>
                            Instances With Tags
                        </div>
                        <TableContainer sx={{ boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)' }}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ background: '#549B79' }}>
                                        <TableCell align='left'
                                            sx={{ fontSize: '14px', color: '#FFF', letterSpacing: '0.05em' }}
                                        >
                                            INSTANCE NAME
                                        </TableCell>
                                        <TableCell align='center'
                                            sx={{ fontSize: '14px', color: '#FFF', letterSpacing: '0.05em' }}
                                        >
                                            INSTANCE ID
                                        </TableCell>
                                        <TableCell align='center'
                                            sx={{ fontSize: '14px', color: '#FFF', letterSpacing: '0.05em' }}
                                        >
                                            INSTANCE TYPE
                                        </TableCell>
                                        <TableCell align='left'
                                            sx={{ fontSize: '14px', color: '#FFF', letterSpacing: '0.05em' }}
                                        >
                                            TAGS
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        instancesWithTags.map((row, index) => {
                                            return (
                                                <TableRow hover tabIndex={-1}
                                                    key={index}
                                                    sx={{ fontSize: 14, backgroundColor: 'white' }}
                                                >
                                                    <TableCell align='left' sx={{
                                                        color: '#17202a'
                                                    }}>
                                                        {row.instanceName ? row.instanceName : "-"}
                                                    </TableCell>
                                                    <TableCell align='center' sx={{
                                                        color: '#17202a'
                                                    }}>
                                                        {row.instanceId ? row.instanceId : '-'}
                                                    </TableCell>
                                                    <TableCell align='center' sx={{
                                                        color: '#17202a'
                                                    }}>
                                                        {row.instanceType ? row.instanceType : '-'}
                                                    </TableCell>
                                                    <TableCell align='left' sx={{
                                                        color: '#17202a'
                                                    }}>
                                                        <div className='max-w-[400px]'>
                                                            {row.tags ? row.tags : '-'}
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
                ) : (
                    <div className='my-[40px] text-[18px]'>
                        ⚠️ None of the AWS instances have tags! 🛑 Please ensure proper tagging for better management.
                    </div>
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
        let tags = await getInstanceTags();
        if (!tags) tags = [];

        return {
            props: {
                username: payload?.username,
                email: payload?.email,
                role: payload?.role,
                tags: tags,
            }
        }
    }
}