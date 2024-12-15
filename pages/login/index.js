import { Checkbox, FormControlLabel } from "@mui/material";
import Layout from "../../components/Layout";
import styles from "./../../styles/Login/Login.module.css";
import { useState } from "react";

export default function LoginPage() {
    const [formData, setFormData] = useState(
        {
            email: "syamkumar6845@gmail.com",
            password: "Syam@190543",
            rememberMe: false
        }
    )

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ formData }),
            });
            console.log(res);
            if (res.status === 200) {
                const { token } = await res.json()
                document.cookie = `token=${token}; path=/`
                setTimeout(() => {
                    window.location.href = "/dashboard"
                }, 100);
            }
            else {
                throw new Error(`Error: ${res.status}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <div className={styles.loginContainer}>
                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <div className="text-center my-[40px]">
                        <span className="text-4xl font-medium leading-10">
                            Welcome Back
                        </span>
                        <br />
                        <span className="text-md">
                            Please log in to continue
                        </span>
                    </div>
                    <div className={styles.inputField}>
                        <label htmlFor="email">
                            Email Address
                        </label>
                        <br />
                        <input
                            value={formData.email}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                            type="email"
                            placeholder="email"
                            name="email"
                        />
                    </div>
                    <div className={styles.inputField}>
                        <label htmlFor="password">Password</label><br />
                        <input
                            value={formData.password}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                            placeholder="password"
                            type="password"
                            name="password"
                        />
                    </div>
                    <div className="flex justify-between flex-wrap items-center my-1">
                        <FormControlLabel
                            checked={formData.rememberMe}
                            control={
                                <Checkbox
                                    name="rememberMe"
                                    onChange={() =>
                                        setFormData({ ...formData, rememberMe: !formData.rememberMe })
                                    }
                                />
                            }
                            label="Remember Me"
                            sx={{ fontFamily: 'Montserrat' }}
                        />
                        <div className="text-[#001D6C] cursor-pointer font-medium hover:underline hover:underline-offset-2">
                            Forgot Password?
                        </div>
                    </div>
                    <div className={styles.inputField}>
                        <input type="submit" value="Log In" />
                    </div>
                </form>
            </div>
        </Layout >
    );
}