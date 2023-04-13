import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import UserContext from "../lib/context/UserContext";
import Loading from "@/components/Loading";

export default function Dashboard({ children }) {
  const [userInfo, setUserInfo] = useState();
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/api/user/saved-recipes",
    fetcher
  );

  useEffect(() => {
    if (!isLoading && !error) {
      setUserInfo(data.user);
    }
  }, [data?.user, error, isLoading]);

  if (error) return "There was a problem fetching user data";
  if (isLoading)
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center">
        <Loading />
      </div>
    );

  return (
    <UserContext.Provider value={[userInfo, setUserInfo]}>
      <Navbar />
      <div className="flex flex-row">
        <Sidebar />
        {children}
      </div>
      <Footer />
    </UserContext.Provider>
  );
  // else return null;
}
