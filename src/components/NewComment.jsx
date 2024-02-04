
// can I use radix alert dialog?
import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import styles from "@/app/page.module.css"

export default async function NewComment({post_id}) {
  
    const { userId } = auth();
    const profileRes = await sql`SELECT * FROM profiles WHERE clerk_user_id = ${userId}` 
    const profile_id = profileRes.rows[0]?.id
    
    
    async function handleNewComment(formData) {
        "use server";
    
        const content = formData.get("comment_content")
        await sql`INSERT INTO commentz(comment_content,post_id, profile_id) VALUES (${content},${post_id},${profile_id})`;
      
        revalidatePath(`/feed/${post_id}`);
        redirect(`/feed/${post_id}`);
        }
    
        return (
        <div className={styles.navBar}>
          <form action={handleNewComment}>
            <textarea name="comment_content" placeholder="share your comments"></textarea>
            <button type="submit">share</button>
          </form>
        </div>
      );
 }