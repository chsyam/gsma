export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { newProjectForm } = req.body;
        console.log(newProjectForm);
        let formData = {
            projectDetails: newProjectForm
        }
        console.log(formData);

        try {
            const response = await fetch('http://marvel-teaas-lb-1490692637.us-east-1.elb.amazonaws.com:83/trigger-jenkins', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            console.log(response);
            if (response.status === 201 || response.status === 200) {
                return res.status(200).json({ message: 'Request sent to analyze this project' });
            }
            else {
                return res.status(response.status).json({ message: 'Something went wrong when sending the request to analyzing.' });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Something went wrong' });
        }
    }

    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}