import styles from "@/app/page.module.css";
import CreateProfileModal from "@/components/CreateProfile";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import { sql } from "@vercel/postgres";
import NewPost from "@/components/NewPost";


export default async function Feed({searchParams}) {
  const show = searchParams?.show;
  const posts = await sql`SELECT * FROM posts`


  return (
    <main className={styles.main}>
      <Avatar />
      <h1>main feed / the timeline</h1>
      <div>
          {posts.rows.map((post) => {return (<div key={post.id}>
         <Link href={`/feed/${post.id}`}><h3>{post.post_content}</h3></Link></div>)})}
        </div>
        
        
      {show && <CreateProfileModal />}
      <NewPost />
    </main>
  );

}