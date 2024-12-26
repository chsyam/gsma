import { getSystemMetrics } from './../../../api/reports/getSystemMetrics';
import { decrypt } from './../../../api/auth/lib';
import { useEffect, useState } from 'react';

export default function SystemMetrics({ systemMetrics }) {
    console.log(systemMetrics);
    const [systemInfo, setSystemInfo] = useState({});
    useEffect(() => {
        let temp = {};
        temp['cpu_model'] = { label: 'CPU Model', value: systemMetrics[0]?.cpu_model ? systemMetrics[0]?.cpu_model : 'N/A' };
        temp['cpu_count'] = { label: 'CPU Count', value: systemMetrics[0]?.cpu_count ? systemMetrics[0]?.cpu_count : 0 };
        temp['gpu_model'] = { label: 'GPU Model', value: systemMetrics[0]?.gpu_model ? systemMetrics[0]?.gpu_model : 'N/A' };
        temp['gpu_count'] = { label: 'GPU Count', value: systemMetrics[0]?.gpu_count ? systemMetrics[0]?.gpu_count : 0 };
        temp['ram'] = { label: 'RAM', value: systemMetrics[0]?.ram ? systemMetrics[0]?.ram + " GB" : 0 };
        temp['os'] = { label: 'OS', value: systemMetrics[0]?.os ? systemMetrics[0]?.os : 'N/A' };
        temp['country_name'] = { label: 'Country', value: systemMetrics[0]?.country_name ? systemMetrics[0]?.country_name : 'N/A' };
        temp['country_iso_code'] = { label: 'Country Code', value: systemMetrics[0]?.country_iso_code ? systemMetrics[0]?.country_iso_code : 'N/A' };
        temp['region'] = { label: 'Region', value: systemMetrics[0]?.region ? systemMetrics[0]?.region : 'N/A' };
        temp['latitude'] = { label: 'Latitude', value: systemMetrics[0]?.latitude ? systemMetrics[0]?.latitude : 'N/A' };
        temp['longitude'] = { label: 'Longitude', value: systemMetrics[0]?.longitude ? systemMetrics[0]?.longitude : 'N/A' };
        setSystemInfo(temp);
    }, [systemMetrics])

    return (
        <div>
            <div className='flex flex-wrap gap-8 justify-around px-[4%] py-[30px] items-start'>
                <div className='flex-1 max-w-[600px] bg-white rounded-md px-4 py-2 shadow-lg'>
                    <div className="title text-xl font-medium">
                        System Information
                    </div>
                    <div className='mt-2 ml-4'>
                        {
                            Object.keys(systemInfo).map((key, index) => {
                                return (
                                    <div key={index} className='my-4'>
                                        <span className='text-[14px]  pr-2'>
                                            {systemInfo[key]?.label}:
                                        </span>
                                        <span className='text-[16px] font-semibold'>
                                            {systemInfo[key]?.value}
                                        </span>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
                <div className='max-w-[600px] bg-white min-w-[250px] rounded-md px-4 py-2 shadow-lg'>
                    <div className="title text-xl font-medium">
                        Duration
                    </div>
                    <div className="text-xl my-2 font-semibold text-blue-500">
                        {systemMetrics[0]?.duration ? systemMetrics[0]?.duration.toFixed(2) : 0}
                    </div>
                    seconds
                </div>
                <div className='max-w-[600px] bg-white min-w-[250px] rounded-md px-4 py-2 shadow-lg'>
                    <div className="title text-xl font-medium">
                        Emissions
                    </div>
                    <div className="text-xl my-2 font-semibold text-blue-500">
                        {systemMetrics[0]?.emissions ? systemMetrics[0]?.emissions.toFixed(6) : 0}
                    </div>
                    kg
                </div>
                <div className='max-w-[600px] bg-white min-w-[250px] rounded-md px-4 py-2 shadow-lg'>
                    <div className="title text-xl font-medium">
                        Emissions Rate
                    </div>
                    <div className="text-xl my-2 font-semibold text-blue-500">
                        {systemMetrics[0]?.emissions_rate ? systemMetrics[0]?.emissions_rate.toFixed(8) : 0}
                    </div>
                    kg/s
                </div>
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
        let systemMetrics = await getSystemMetrics();
        if (!systemMetrics) systemMetrics = {};

        return {
            props: {
                username: payload?.username,
                email: payload?.email,
                role: payload?.role,
                systemMetrics: systemMetrics,
            }
        }
    }
}