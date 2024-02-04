import { SignIn } from "@clerk/nextjs";
//import { useRouter } from 'next/router'
 
export default function Page() {

  return <SignIn afterSignInUrl="/feed" />;
}

