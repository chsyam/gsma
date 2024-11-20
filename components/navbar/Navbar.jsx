import { ChevronRight, MoveUpRight } from "lucide-react";
import styles from "./Navbar.module.css"

export default function Navbar() {
    return (
        <div className={styles.navbarContainer}>
            <div className={styles.navbarTitle}>GSMA</div>
            <ul className={styles.navbarMenu}>
                <li>Home</li>
                <li>Product</li>
                <li>Services</li>
                <li>Sustainability Guide</li>
            </ul>
            <div className={styles.userActions}>
                <div className={styles.tryNowButton}>
                    <button className="bg-[#549B79] text-white">
                        Login <ChevronRight size={20} />
                    </button>
                </div>
                <div className={styles.tryNowButton}>
                    <button className="text-[#549B79] border border-[#549B79]">
                        Sign Up <MoveUpRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}