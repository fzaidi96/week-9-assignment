import styles from "@/app/page.module.css";
import NewComment from "@/components/NewComment";
import Link from "next/link";
import { sql } from "@vercel/postgres";
import Avatar from "@/components/Avatar";


export default async function EachPost({params}) {
    const post_id = params.id

    const posts = await sql`SELECT * FROM posts WHERE id = ${post_id}`;
    const comments = await sql`SELECT * FROM commentz WHERE post_id = ${post_id}`;

    return (
    <main className={styles.main}>

      <Avatar />
    
        <div>{posts.rows.map((post) => 
        {return (<div key={post.id}>
          <h4>{post.post_content}</h4></div>)})}</div>
          <Link href="/feed"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.85355 3.85355C7.04882 3.65829 7.04882 3.34171 6.85355 3.14645C6.65829 2.95118 6.34171 2.95118 6.14645 3.14645L2.14645 7.14645C1.95118 7.34171 1.95118 7.65829 2.14645 7.85355L6.14645 11.8536C6.34171 12.0488 6.65829 12.0488 6.85355 11.8536C7.04882 11.6583 7.04882 11.3417 6.85355 11.1464L3.20711 7.5L6.85355 3.85355ZM12.8536 3.85355C13.0488 3.65829 13.0488 3.34171 12.8536 3.14645C12.6583 2.95118 12.3417 2.95118 12.1464 3.14645L8.14645 7.14645C7.95118 7.34171 7.95118 7.65829 8.14645 7.85355L12.1464 11.8536C12.3417 12.0488 12.6583 12.0488 12.8536 11.8536C13.0488 11.6583 13.0488 11.3417 12.8536 11.1464L9.20711 7.5L12.8536 3.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></Link>
          
          <div>{comments.rows.map((comment) => 
        {return (<div key={comment.id}>
          <p>{comment.comment_content}</p></div>)})}</div>
  
          <NewComment post_id = {params.id} />
    </main>
    )}