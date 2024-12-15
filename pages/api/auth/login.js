import usersList from "./../../../public/data/users.json";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

const secretKey = "6dce0f1746fee1d44fb3d75017abc75c81ac5a406cfb8640cbff3a61d7a197ce"

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { formData } = req.body;

        try {
            const user = usersList.find((user) => user.email === formData.email && user.password === formData.password);
            console.log("user found", user);
            if (user) {
                const token = jwt.sign({
                    userId: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }, secretKey, {
                    expiresIn: 60 * 60,
                })
                console.log(token)
                return res.status(200).json({ token: token, message: 'user details found & login successful' });
            }
            else {
                return res.status(response.status).json({ message: 'Invalid Credentials ...!' });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Something went wrong' });
        }
    }

    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}