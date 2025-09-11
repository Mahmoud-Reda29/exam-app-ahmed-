// import HomePageHeader from "@/app/(homePage)/_components/home-page-header";
// import { notFound } from "next/navigation";
// import React from "react";
// import { singleSubjectDetailes } from "../_action/get-subject-detailes.action";
// import { CircleQuestionMark } from "lucide-react";

// const Results = ({
//   params,
// }: {
//   params: { subject_id: string; exam_id: string };
// }) => {
//   const { subject_id, exam_id } = params;

//   let subjectData = null;
//   console.log("subjectData");

//   try {
//     subjectData = await singleSubjectDetailes({ subject_id });

//     // pass {} if no data needed
//   } catch (error) {
//     if (error) {
//       notFound();
//     }

//     console.error(" Failed to load subject:", error);
//   }
//   {
//     const subjectName = subjectData?.category.name;
//     const breadcrumbItems = [
//       { label: "Home", href: "/" },
//       { label: "Exams", href: `/${subject_id}` },
//       { label: "Quiz", href: `#` },
//       { label: "Questions", href: `${exam_id}` },
//     ];

//     return (
//       <main className="p-6">
//         Results
//         <HomePageHeader
//           items={breadcrumbItems}
//           title={`[${subjectName}] Questions`}
//           Icon={CircleQuestionMark}
//         />
//       </main>
//     );
//   }
// };

// export default Results;
