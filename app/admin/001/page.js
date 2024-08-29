import Image from "next/image";
import styles from "./../../page.module.css";
import { Typography } from "@mui/material";

export default function Home() {
    return (
        <main className={styles.main}>
    
            <div className={styles.center}>
                <div className={styles.textCenter}>
                    <Typography variant="h2">Coming Soon</Typography>
                    <Typography variant="">This page is under construction.</Typography>
                </div>
            </div>
        
        </main>
    );
}
