import ContinueLearning from "../components/dashboard/ContinueLearning";
import QuickActions from "../components/dashboard/QuickActions";
import RecentDocuments from "../components/dashboard/RecentDocuments";
import StatsCards from "../components/dashboard/StatsCards";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import DashboardLayout from "../layouts/DashboardLayout";

import useDashboard from "../hooks/useDashboard";

export default function Dashboard() {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-6 text-zinc-400">Loading dashboard...</div>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <div className="p-6 text-red-500">
          Failed to load dashboard.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 p-5 md:p-0">
        <WelcomeBanner dashboard={data} />

        <StatsCards
          documents={data.documents}
          notes={data.notes}
          quizzes={data.quizzes}
          streak={data.studyStreak}
        />

        <QuickActions />

        <ContinueLearning
          document={data.continueLearning}
        />

        <RecentDocuments
          documents={data.recentDocuments}
        />
      </div>
    </DashboardLayout>
  );
}