import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import styles from "@/app/page.module.css"

export default async function NewPost() {
    const { userId } = auth()
    const profileRes = await sql`SELECT * FROM profiles WHERE clerk_user_id = ${userId}` 
    const profile_id = profileRes.rows[0]?.id
    
    async function handleNewPost(formData) {
        "use server";
    
        const content = formData.get("post_content")
        await sql`INSERT INTO posts(post_content, profile_id) VALUES (${content},${profile_id})`;
      
        revalidatePath(`/feed`);
        redirect(`/feed`);
        }
    
        return (
        <div className={styles.navBar}> 
            <form action={handleNewPost}>
            <textarea name="post_content" placeholder="what's on your mind?"></textarea>
            <button type="submit">share</button>
          </form>
        </div>
      );
}