export async function getImplementedAreas(projectName) {
    try {
        const response = await fetch(`http://marvel-teaas-lb-1490692637.us-east-1.elb.amazonaws.com:83/implemented_yes?project_name=${projectName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const implementedAreas = await response.json();
        return implementedAreas;
    } catch (error) {
        console.log("Error while fetching project list", error)
        return [];
    }
}