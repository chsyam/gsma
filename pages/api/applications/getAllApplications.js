export async function getAllApplications() {
    try {
        const response = await fetch('http://marvel-teaas-lb-1490692637.us-east-1.elb.amazonaws.com:83/sustainability_projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const projectsList = await response.json();
        return projectsList;
    } catch (error) {
        console.log("Error while fetching project list", error)
        return [];
    }
}