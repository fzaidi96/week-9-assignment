import styles from "@/app/page.module.css";
import NewComment from "@/components/NewComment";
import { sql } from "@vercel/postgres";
import Avatar from "@/components/Avatar";
import BackButton from "@/components/BackButton";


export default async function EachPost({params}) {
    const post_id = params.id

    const posts = await sql`SELECT * FROM posts WHERE id = ${post_id}`;
    const comments = await sql`SELECT * FROM commentz WHERE post_id = ${post_id}`;

    return (
      <main className={styles.main}>
      <BackButton />
      <Avatar />
          <div>{posts.rows.map((post) => 
            {return (<div key={post.id}>
            <h4>{post.post_content}</h4></div>)})}</div>
  
            <div>{comments.rows.map((comment) => 
              {return (<div key={comment.id}>
              <p>{comment.comment_content}</p></div>)})}</div>
      <NewComment post_id={post_id} />
      </main>

    )}