import QuickActions from "../components/dashboard/QuickActions";
import RecentDocuments from "../components/dashboard/RecentDocuments";
import StatsCards from "../components/dashboard/StatsCards";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import DashboardLayout from "../layouts/DashboardLayout";



export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <WelcomeBanner />

        <StatsCards />

        <QuickActions />

        <RecentDocuments />
      </div>
    </DashboardLayout>
  );
}