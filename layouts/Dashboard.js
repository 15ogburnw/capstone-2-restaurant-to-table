import LoadingScreen from "@/components/LoadingScreen";
import Sidebar from "@/components/Sidebar";
import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Dashboard({ children }) {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) router.push("/");
  }, [session, router]);

  if (!session) return <LoadingScreen />;
  else
    return (
      <>
        <Sidebar />
        {children}
      </>
    );
}
