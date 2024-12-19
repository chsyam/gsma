export async function getMaturityLevel(projectName) {
    try {
        const response = await fetch(`http://marvel-teaas-lb-1490692637.us-east-1.elb.amazonaws.com:83/levels?project_name=${projectName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const maturityLevel = await response.json();
        return maturityLevel;
    } catch (error) {
        console.log("Error while fetching project list", error)
        return -1;
    }
}