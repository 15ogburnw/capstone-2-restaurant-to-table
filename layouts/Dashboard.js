import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export default function Dashboard({ children }) {
  return (
    <>
      <Sidebar />
      {children}
      <Footer />
    </>
  );
}
