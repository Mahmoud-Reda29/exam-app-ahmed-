import { Metadata } from "next";
import { BookOpenCheck } from "lucide-react";
import SubjectAllExams from "./_components/subject-all-exams";
import HomePageHeader from "../_components/home-page-header";

// Metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { subject_id: string };
}): Promise<Metadata> {
  const { subject_id } = params;

  return {
    title: `Exams `,
    description: `Browse all exams available for subject ${subject_id}. Prepare, practice, and test your knowledge.`,
  };
}

// Page Component
export default function Exams({ params }: { params: { subject_id: string } }) {
  const { subject_id } = params;

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Exams", href: `/${subject_id}` },
  ];

  return (
    <main>
      {/* Page header with breadcrumb */}
      <HomePageHeader
        items={breadcrumbItems}
        title="Exams"
        Icon={BookOpenCheck}
      />

      {/* List of exams */}
      <SubjectAllExams />
    </main>
  );
}
