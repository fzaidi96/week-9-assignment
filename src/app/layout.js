import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignUp, auth} from '@clerk/nextjs'
import { sql } from "@vercel/postgres";
import CreateProfileModal from "@/components/CreateProfile";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "silly social media",
  description: "Generated by fatima",
};

export default async function RootLayout({ children }) {

  const {userId} = auth()
  const profileRes = await sql`SELECT * FROM profiles WHERE clerk_user_id = ${userId}` 
  const profile_id = profileRes.rows[0]?.id
  const clerk_user_id = profileRes.rows[0]?.clerk_user_id

  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        {/* if the user is signed in and has a profile (i.e has a clerk_user_id and a profile_id), show the children (the feed and everything else) */}
        {profileRes.rowCount !== 0 && children}

        {/* if the user is signed in (i.e. has a clerk_user_id) and doesn't have a profile (i.e. does not have a profile_id), show them the create profile modal */}
        {profileRes.rowCount === 0 && <CreateProfileModal />}

        {/* if the user does not have a clerk_user_id or a profile id, show them sign-up page */}
        {clerk_user_id === 0 && <SignUp /> }
      </body>
    </html>
    </ClerkProvider>
  );
}

// I would have liked to set this up differntly but I wasn't sure how to get it to work. Ideally, I would route the users to the pages I have created for sign-in and sign-up. 