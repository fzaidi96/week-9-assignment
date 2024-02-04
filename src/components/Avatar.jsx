import Link from "next/link"
import styles from "@/app/page.module.css"
import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres"

export default async function Avatar() {

    const {userId} = auth()
    const profileRes = await sql`SELECT * FROM profiles WHERE clerk_user_id = ${userId}` 
    const profile_id = profileRes.rows[0]?.id
    

    return ( 
    <nav className={styles.avatar}>
        <Link href={`/profile/${profile_id}`}><h6>avatar</h6></Link>
    </nav>)
}