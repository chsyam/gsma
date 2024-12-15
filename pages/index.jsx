import { ChevronRight } from "lucide-react";
import styles from "./../styles/HomePage.module.css";
import introScreen from "./../components/images/intoScreen.png";

export default function Home() {
	return (
		<div
			className={styles.introScreen}
			style={{
				backgroundImage: `url(${introScreen.src})`,
				width: "100%",
				height: "100%",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
			}}
		>
			<div className={styles.pageTitle}>
				Green Soft Maturity
				<div className="text-[#549B79] font-bold">Assessment</div>
			</div>
			<div className={styles.titleDescription}>
				Optimize your resources with real-time sustainability assessments, cost reduction insights, and intelligent automation.
			</div>
			<div className={styles.featuresCards}>
				<div className={styles.cardItem}>
					<div className={styles.cardTitle}>Reduce Cloud Costs with Intelligent Automation</div>
					<div className={styles.cardDescription}>
						Automatically turn off idle workloads, eliminate unused resources,
						and provision infrastructure only when needed, reducing unnecessary
						cloud expenses.
					</div>
				</div>
				<div className={styles.cardItem}>
					<div className={styles.cardTitle}>Maximize Energy Efficiency & Cost Savings</div>
					<div className={styles.cardDescription}>
						Track energy leaks, optimize resource consumption, and implement
						green policies that cut down on both energy usage and costs.
					</div>
				</div>
				<div className={styles.cardItem}>
					<div className={styles.cardTitle}>Sustainability in Every Deployment</div>
					<div className={styles.cardDescription}>
						Integrate sustainability checks directly into your CI/CD pipeline,
						ensuring that your code is not only green but also cost-efficient
						from the moment it's deployed.
					</div>
				</div>
			</div>
			<div
				className={styles.tryNowButton}
				onClick={() => window.location.href = "/login"}
			>
				<button>
					Try Now <ChevronRight size={20} />
				</button>
			</div>
		</div>
	);
}
