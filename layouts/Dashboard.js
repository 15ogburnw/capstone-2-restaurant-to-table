import Sidebar from "@/components/Sidebar";

export default function Dashboard({ children }) {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
}
