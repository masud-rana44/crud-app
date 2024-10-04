import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";
import { ScrollToTop } from "./ScrollToTop";

export function AppLayout() {
  return (
    <div>
      <Navbar />
      <main className="pt-[80px] bg-[#563e7c] text-[#775732] dark:text-[#CA9352] pb-24">
        <ScrollToTop>
          <Outlet />
        </ScrollToTop>
      </main>
    </div>
  );
}
