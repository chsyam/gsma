import { ChevronRight } from "lucide-react";
import styles from "./Navbar.module.css"

export default function Navbar() {
    const homePageRoute = () => {
        window.location.href = "/";
    }

    return (
        <div className={styles.navbarContainer}>
            <div className={styles.navbarTitle} onClick={() => homePageRoute()}>
                GSMA
            </div>
            <ul className={styles.navbarMenu}>
                <li onClick={() => homePageRoute()}>Home</li>
                <li>Product</li>
                <li>Services</li>
                <li>Sustainability Guide</li>
            </ul>
            <div className={styles.userActions}>
                <div className={styles.tryNowButton}
                    onClick={() => window.location.href = "/login"}
                >
                    <button className="bg-[#549B79] text-white">
                        Login <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}