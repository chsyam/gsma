export async function optimizeEc2Instances() {
    try {
        const response = await fetch('http://marvel-teaas-lb-1490692637.us-east-1.elb.amazonaws.com:83/ec2_optimise', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({})
        });
        return await response.json();
    } catch (error) {
        console.log("Error while fetching tags of aws instances", error)
        return [];
    }
}