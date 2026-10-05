import { Outlet } from "react-router";
import Footer from "./shared/Footer";
import Nav from "./shared/Nav";
import PremiumLoader from "./shared/PremiumLoader";
import UserDashboard from "./features/user/ui/UserDashboard";
import RecruiterDashboard from "./features/recruiter/ui/dashboard/RecruiterDashboard";
import { useUser } from "./features/user/hooks/user.hook";

export const Layout = () => (
  <>
    <PremiumLoader />
    <Nav />
    <Outlet />
    <Footer />
  </>
);

export const Dashboard = () => {
  const { user, authLoading } = useUser();
  if (authLoading) return <main className="p-10 text-center">Loading dashboard...</main>;
  if (!user) return (
    <main className="p-10 text-center">
      <p className="mb-4 text-[#64748B]">Log in to view your dashboard.</p>
      <a href="/login" className="rounded-lg bg-[#059669] px-5 py-3 font-semibold text-white">Log In</a>
    </main>
  );
  return user?.role === "recruiter" ? <RecruiterDashboard /> : <UserDashboard />;
};
