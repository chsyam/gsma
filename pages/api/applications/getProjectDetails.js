export async function getProjectDetails(project_name) {
    try {
        const response = await fetch(`http://marvel-teaas-lb-1490692637.us-east-1.elb.amazonaws.com:83/project_details?project_name=${project_name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const project_info = await response.json();
        return project_info;
    } catch (error) {
        console.log("Error while fetching project details", error)
        return [];
    }
}