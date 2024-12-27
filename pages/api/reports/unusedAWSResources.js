export async function getUnusedAWSResources() {
    try {
        const response = await fetch('http://marvel-teaas-lb-1490692637.us-east-1.elb.amazonaws.com:83/unused?project_name=Platform-Engineering', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return await response.json();
    } catch (error) {
        console.log("Error while fetching tags of aws instances", error)
        return [];
    }
}