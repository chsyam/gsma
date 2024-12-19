import "./../styles/global.css";
import Layout from "../components/Layout";
import Navbar from "../components/navbar/Navbar";
import UserNavbar from "../components/navbar/UserNavbar";
import BreadCrumb from "../components/BreadCrumb";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
	const [breadCrumbParts, setBreadCrumbParts] = useState([]);
	const router = useRouter();

	useEffect(() => {
		let urlParts = window.location.href.replace(window.location.origin + "/", "").split("/");
		setBreadCrumbParts(urlParts);
	}, [Component, pageProps])

	useEffect(() => {
		const body = document.body;
		console.log(router.pathname)
		switch (router.pathname) {
			case "/login":
				body.style.background = "linear-gradient(270deg, #D3E8B1, #A5E7C7)";
				break;
			case "/":
				body.style.background = "linear-gradient(270deg, #D3E8B1, #A5E7C7)";
				break;
			default:
				body.style.backgroundColor = "#E7E7E7";
				break;
		}
	}, [router.pathname])

	return (
		<Layout>
			{
				!pageProps.username ? (
					<div className="introScreen">
						<Navbar />
					</div>
				) : (
					<UserNavbar username={pageProps?.username} />
				)
			}
			{
				(pageProps.username && (breadCrumbParts.includes("dashboard") && breadCrumbParts.length > 1)) && (
					<BreadCrumb urlParts={breadCrumbParts} />
				)
			}
			<div className="#F0F0F0">
				<Component {...pageProps} />
			</div>
		</Layout>
	);
}

export default MyApp;
