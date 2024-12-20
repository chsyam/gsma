export async function getEnergyStats(projectName) {
    try {
        const response = await fetch(`http://marvel-teaas-lb-1490692637.us-east-1.elb.amazonaws.com:83/dashboard_chart`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const energyStats = await response.json();
        return energyStats;
    } catch (error) {
        console.log("Error while fetching project list", error)
        return [];
    }
}