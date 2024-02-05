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
  <div>
    <main className={styles.main}>
      <Avatar />
      <h1>main feed</h1>
      
      {show !== "true" && (
        <div>
          {posts.rows.map((post) => (
            <div key={post.id}>
              <Link href={`/feed/${post.id}`}>
                <h3>{post.post_content}</h3>
              </Link>
            </div>
          ))}
        </div>
      )}

      {show === "true" && <CreateProfileModal />}

    </main>
    <NewPost />

    </div>
  );
}
