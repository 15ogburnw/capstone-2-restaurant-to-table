import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Dashboard({ children }) {
  return (
    <>
      <Navbar />
      <div className="flex flex-row">
        <Sidebar />
        {children}
      </div>
      <Footer />
    </>
  );
}
