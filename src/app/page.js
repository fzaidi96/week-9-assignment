import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";


export default function Home() {
  return (
    <main className={styles.main}>
      <h2>silly social media</h2>
      <Link href="/feed"><h6>enter for silliness</h6></Link>
    </main>
  );
}
