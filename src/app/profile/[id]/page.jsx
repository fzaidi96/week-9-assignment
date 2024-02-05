import styles from "@/app/page.module.css";
import Link from "next/link";
import { sql } from "@vercel/postgres";
import {auth} from '@clerk/nextjs'
import { UserButton } from "@clerk/nextjs";
import BackButton from "@/components/BackButton";


export default async function MyProfile({params}) {

    const {userId} = auth()
    const profileRes = await sql`SELECT * FROM profiles WHERE clerk_user_id = ${userId}` 
    const profile_id = profileRes.rows[0]?.id
    const post_id = params.id

    const posts = await sql`SELECT * FROM posts WHERE profile_id = ${profile_id}`;


    return (
    <main className={styles.main}>
        <BackButton />
        <h2>My Profile</h2>
        <h5>my posts</h5>
        <div>{posts.rows.map((post) => 
        {return (<div key={post.id}>
        <Link href={`/feed/${post_id}`}><h4>{post.post_content}</h4></Link></div>)})}</div>
        <nav>
            <li><Link href={`/profile/${profile_id}/edit`}>edit profile</Link></li>
            <li><Link href={`/profile/${profile_id}/settings`}>profile settings</Link></li>
            <UserButton afterSignOutUrl="/"/>
        </nav>
    </main>
    )}