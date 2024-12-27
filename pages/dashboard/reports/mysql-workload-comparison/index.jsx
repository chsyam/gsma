import { decrypt } from "./../../../api/auth/lib";
import styles from "./MySQLWorkloadComparison.module.css";

export default function MySQLWorkloadComparison() {
    return (
        <div className="text-[14px] px-[4%] py-[20px]">
            <div className="text-[#2c3e50] text-[24px] mb-2 mt-4 font-medium">
                MySQL Workload Processor Comparison
            </div>
            <div className="bg-[#FFF] p-[10px] rounded-md shadow-lg leading-7 font-normal text-[15px] mb-8">
                <p>In the era of increasing environmental awareness, the importance of Green IT and sustainability in technology cannot be overstated. When comparing processors from major manufacturers like Intel and AMD, it's crucial to consider not only performance metrics but also energy efficiency and environmental impact.</p>
                <p>The following comparisons showcase various metrics including energy consumption, CO2 emissions, and performance-per-watt ratios. These factors are essential in determining the overall environmental footprint of data centers and large-scale computing operations. By choosing more efficient processors, companies can significantly reduce their energy consumption and carbon emissions, contributing to a more sustainable IT infrastructure.</p>
            </div>

            <div className={styles.comparisonGrid}>
                <div className={styles.comparisonContainer}>
                    <div className={styles.cpuName}>
                        Intel® Xeon® Platinum 8488C vs AMD EPYC™ 9R14 (4th Gen)
                    </div>
                    <table className={styles.table}>
                        <tbody>
                            <tr>
                                <th>Metric</th>
                                <th>Intel</th>
                                <th>AMD</th>
                            </tr>
                            <tr>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] text-[#333] font-semibold">NOPM</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium">167,040</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium">189,367</td>
                            </tr>
                            <tr>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] text-[#333] font-semibold">TPM</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium">384,453</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium">436,769</td>
                            </tr>
                            <tr>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] text-[#333] font-semibold">Build Duration</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium">25 min</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium">21 min</td>
                            </tr>
                            <tr>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] text-[#333] font-semibold">Cost</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium">$0.200</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium">$0.230</td>
                            </tr>
                            <tr>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] text-[#333] font-semibold">Cost/100k Trans</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium">$0.0520</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium">$0.0526</td>
                            </tr>
                            <tr>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] text-[#333] font-semibold">Machine Power</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium">8.54 W</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-semibold text-[#4CAF50]">4.96 W</td>
                            </tr>
                            <tr>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] text-[#333] font-semibold">Machine Energy</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium">12.8 kJ</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-semibold text-[#4CAF50]">6.24 kJ</td>
                            </tr>
                            <tr>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] text-[#333] font-semibold">Machine CO2</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium">7.33 g</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-semibold text-[#4CAF50]">5.07 g</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={styles.comparisonContainer}>
                    <div className={styles.cpuName}>
                        Intel® Xeon® Platinum 8375C vs AMD EPYC™ 7R13 (3rd Gen)
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <th>Metric</th>
                                <th>Intel</th>
                                <th>AMD</th>
                            </tr>
                            <tr>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] text-[#333] font-semibold">NOPM</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium">118,815</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium ">132,245</td>
                            </tr>
                            <tr>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] text-[#333] font-semibold">TPM</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium">273,480</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium ">304,698</td>
                            </tr>
                            <tr>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] text-[#333] font-semibold">Build Duration</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium">29 min</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium ">27 min</td>
                            </tr>
                            <tr>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] text-[#333] font-semibold">Cost</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium">$0.192</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium ">$0.173</td>
                            </tr>
                            <tr>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] text-[#333] font-semibold">Cost/100k Trans</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium">$0.0702</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium ">$0.0567</td>
                            </tr>
                            <tr>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] text-[#333] font-semibold">Machine Power</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium">11.6 W</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-semibold text-[#4CAF50]">8.79 W</td>
                            </tr>
                            <tr>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] text-[#333] font-semibold">Machine Energy</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium">20.1 kJ</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-semibold text-[#4CAF50]">14.2 kJ</td>
                            </tr>
                            <tr>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] text-[#333] font-semibold">Machine CO2</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium">8.56 g</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-semibold text-[#4CAF50]">6.99 g</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={styles.comparisonContainer}>
                    <div className={styles.cpuName}>
                        Intel® Xeon® Platinum 8259CL vs AMD EPYC™ 7571
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <th>Metric</th>
                                <th>Intel</th>
                                <th>AMD</th>
                            </tr>
                            <tr>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] text-[#333] font-semibold">NOPM</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium">95,524</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium">75,050</td>
                            </tr>
                            <tr>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] text-[#333] font-semibold">TPM</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium">219,283</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium">172,985</td>
                            </tr>
                            <tr>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] text-[#333] font-semibold">Build Duration</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium">37 min</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium">43 min</td>
                            </tr>
                            <tr>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] text-[#333] font-semibold">Cost</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium">$0.166</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium ">$0.150</td>
                            </tr>
                            <tr>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] text-[#333] font-semibold">Cost/100k Trans</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium">$0.0757</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium">$0.0867</td>
                            </tr>
                            <tr>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] text-[#333] font-semibold">Machine Power</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium">38.9 W</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-semibold text-[#4CAF50]">25.3 W</td>
                            </tr>
                            <tr>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] text-[#333] font-semibold">Machine Energy</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium">86.4 kJ</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-semibold text-[#4CAF50]">65.3 kJ</td>
                            </tr>
                            <tr>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] text-[#333] font-semibold">Machine CO2</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-medium">22.6 g</td>
                                <td className="p-[8px] text-left border-b border-[#e0e0e0] font-semibold text-[#4CAF50]">12.6 g</td>
                            </tr>
                        </tbody>
                    </table>
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
        return {
            props: {
                username: payload?.username,
                email: payload?.email,
                role: payload?.role
            }
        }
    }
}