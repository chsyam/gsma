export async function getSystemMetrics() {
    try {
        const response = await fetch('http://marvel-teaas-lb-1490692637.us-east-1.elb.amazonaws.com:83/cpu_power_chart', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return await response.json();
    } catch (error) {
        console.log("Error while fetching project list", error)
        return [];
    }
}