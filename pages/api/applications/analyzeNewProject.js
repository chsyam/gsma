export default async function handle(req, res) {
    if (req.method === 'POST') {
        const { newProjectForm } = req.body;
        console.log(newProjectForm);
        
        try {
            const response = await fetch('http://marvel-teaas-lb-1490692637.us-east-1.elb.amazonaws.com:83/trigger-jenkins', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProjectForm),
            });
            console.log(response);
            return res.status(201).json({ message: 'Request sent to analyze this project' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Something went wrong' });
        }
    }

    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}