export async function getUnImplementedAreas(projectName) {
    try {
        const response = await fetch(`http://marvel-teaas-lb-1490692637.us-east-1.elb.amazonaws.com:83/implemented_no?project_name=${projectName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const unImplementedAreas = await response.json();
        return unImplementedAreas;
    } catch (error) {
        console.log("Error while fetching project list", error)
        return [];
    }
}