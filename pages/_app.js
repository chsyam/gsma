import "./../styles/global.css";
import Layout from "../components/Layout";
import Navbar from "../components/navbar/Navbar";
import UserNavbar from "../components/navbar/UserNavbar";
import BreadCrumb from "../components/BreadCrumb";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
	// console.log("pageProps", pageProps)
	const [breadCrumbParts, setBreadCrumbParts] = useState([]);

	useEffect(() => {
		let urlParts = window.location.href.replace(window.location.origin + "/", "").split("/");
		setBreadCrumbParts(urlParts);
	}, [Component, pageProps])

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
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;
