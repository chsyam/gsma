export function getAllApplications() {
    try {
        const response = fetch('http://marvel-teaas-lb-1490692637.us-east-1.elb.amazonaws.com:83/project_name', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log("response", response);
    } catch (error) {

    }
}