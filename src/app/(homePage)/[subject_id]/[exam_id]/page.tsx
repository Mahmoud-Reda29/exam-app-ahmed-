import { Metadata } from "next";
import { CircleQuestionMark } from "lucide-react";
import HomePageHeader from "../../_components/home-page-header";
import QuizPage from "./_components/quiz-page";
import { singleSubjectDetailes } from "./_actions/get-subject-detailes.action";
import { notFound } from "next/navigation";

// Metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { subject_id: string; exam_id: string };
}): Promise<Metadata> {
  const { subject_id, exam_id } = params;

  try {
    const subjectData = await singleSubjectDetailes({ subject_id });
    const subjectName = subjectData?.category.name || "Exam";

    return {
      title: `${subjectName} - Quiz`,
      description: `Take the ${subjectName} quiz. Exam ID: ${exam_id}. Practice and test your knowledge with our curated questions.`,
    };
  } catch {
    return {
      title: "Exam - Not Found",
      description: "The requested exam could not be found.",
    };
  }
}

// Exam Page
export default async function ExamID({
  params,
}: {
  params: { subject_id: string; exam_id: string };
}) {
  const { subject_id, exam_id } = params;

  let subjectData = null;

  try {
    subjectData = await singleSubjectDetailes({ subject_id });
  } catch (error) {
    void error;
    notFound();
  }

  const subjectName = subjectData?.category.name;

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Exams", href: `/${subject_id}` },
    { label: "Quiz", href: `#` },
    { label: "Questions", href: `${exam_id}` },
  ];

  return (
    <main className="pb-60">
      {/* Page header with breadcrumb */}
      <HomePageHeader
        items={breadcrumbItems}
        title={`[${subjectName}] Questions`}
        Icon={CircleQuestionMark}
      />

      {/* Quiz content */}
      <QuizPage
        exam_id={exam_id}
        subjectName={subjectName as string}
        subject_id={subject_id}
      />
    </main>
  );
}
