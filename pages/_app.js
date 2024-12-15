import "./../styles/global.css";
import Layout from "../components/Layout";
import Navbar from "../components/navbar/Navbar";
import UserNavbar from "../components/navbar/UserNavbar";

function MyApp({ Component, pageProps }) {
	console.log("pageProps", pageProps)

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
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;
