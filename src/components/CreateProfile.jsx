//using demo to help 

import Link from "next/link";
import styles from "@/app/page.module.css";
import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";



export default function CreateProfileModal() {
    const { userId } = auth();


    async function addNewProfile(formData) {
        "use server";
        const username = formData.get("username");
        const bio = formData.get("bio");

        await sql`INSERT INTO profiles (clerk_user_id, username, bio) VALUES (${userId}, ${username}, ${bio})`;
        revalidatePath("/feed");
        redirect("/feed");
      }

    return (
        <div className={styles.modal}>
            <form action={addNewProfile}>
                <label for="username">Username</label>
                <input type="text" name="username" required></input>

                <label for="bio">Bio</label>
                <textarea name="bio"></textarea>

                <button type="submit">Save Changes</button>
            </form>

            <Link href="/feed">close</Link>
        </div>
    )}

    // <label for="profilepPic">Profile Picture</label>
    // <input type="file" id="profilePic" name="profilePic" accept="image/*"></input>