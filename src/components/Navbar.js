import styles from "../assets/Navbar.module.css";
import eth2 from "../assets/ethRainbow.png";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <img src={eth2} className={styles.listen} alt="logo" />

      <p className={styles.title}>explorETH</p>
    </nav>
  );
}
