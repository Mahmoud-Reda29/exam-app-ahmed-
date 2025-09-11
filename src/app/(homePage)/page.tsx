import { Metadata } from "next";
import { GraduationCap } from "lucide-react";
import Dashboard from "./_components/dashboard";
import HomePageHeader from "./_components/home-page-header";

// Metadata for SEO
export const metadata: Metadata = {
  title: "Diplomas - Home",
  description:
    "Browse available diplomas, explore subjects, and start learning today.",
};

// Page Component
export default function Home() {
  const breadcrumbItems = [{ label: "Home", href: "/" }];

  return (
    <main className="flex flex-col justify-center items-center gap-0">
      {/* Header with breadcrumb (hidden in this page) */}
      <HomePageHeader
        items={breadcrumbItems}
        Icon={GraduationCap}
        title="Diplomas"
        visible={false}
      />

      {/* Dashboard grid with subjects */}
      <Dashboard />
    </main>
  );
}
