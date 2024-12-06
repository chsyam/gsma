export async function getAllApplications() {
    try {
        const response = await fetch('http://marvel-teaas-lb-1490692637.us-east-1.elb.amazonaws.com:83/project_name', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        // console.log("response", await response.json());
        const projectList = await response.json();
        return projectList;
    } catch (error) {
        console.log("Error while fetching project list")
        return [];
    }
}