import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export default function Dashboard({ children }) {
  return (
    <>
      <div className="flex flex-row">
        <Sidebar />
        {children}
      </div>

      <Footer />
    </>
  );
}
