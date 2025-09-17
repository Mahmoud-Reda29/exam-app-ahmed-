"use client";

import { useEffect, useState } from "react";
import { useCheckQuestions } from "../_hooks/use-check-questions.hook";
import { QuizFormValues } from "@/lib/schemes/exam-question.scheme";
import { CheckRequest, ExamResultResponse } from "@/lib/types/check-questions";
import { ChartPieDonut } from "@/components/ui/chart-pie-dount";
import { ExamsQuestionsQueryResponse } from "@/lib/types/exam-questions";
import { Button } from "@/components/ui/button";
import { RotateCcw, FolderSearch } from "lucide-react";

const QuizResults = ({
  answersKey,
  questions,
}: {
  answersKey: string;
  questions: ExamsQuestionsQueryResponse["data"]["questions"] | undefined;
}) => {
  // keep track of the results (once we get them from the backend)
  const [results, setResults] = useState<ExamResultResponse | null>(null);

  // show a loading message while we’re checking answers
  const [loading, setLoading] = useState(true);

  // our hook that calls the backend to check answers
  const { mutateAsync } = useCheckQuestions();

  // when the component loads, grab answers from localStorage and send them
  useEffect(() => {
    const sendAnswers = async () => {
      try {
        // pull user’s saved answers from localStorage
        const localAnswers = localStorage.getItem(answersKey);
        const answers: QuizFormValues["answers"] = localAnswers
          ? JSON.parse(localAnswers)
          : [];

        // if no answers, just stop here
        if (!answers || !answers.length) {
          setLoading(false);
          return;
        }

        // send answers to backend
        const payload: CheckRequest = { answers };
        const res = await mutateAsync(payload);

        // save results in state
        setResults(res);
      } catch (err) {
        console.error("Something went wrong while checking answers:", err);
      } finally {
        // either way, stop showing loading
        setLoading(false);
      }
    };

    sendAnswers();
  }, [answersKey, mutateAsync]);

  // reset everything and let the user start over
  const handleRestart = () => {
    localStorage.clear();
    window.location.reload();
  };

  // build chart data for donut chart
  const charDate = [
    { name: "Correct", value: results?.correct || 0, color: "#00BC7D" },
    { name: "Incorrect", value: results?.wrong || 0, color: "#EF4444" },
  ];

  // if still checking
  if (loading) {
    return <p className="text-gray-600">Checking your answers...</p>;
  }

  // if no results came back
  if (!results) {
    return <p className="text-red-500">No results available.</p>;
  }

  return (
    <div className="bg-white">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Results</h2>

      <div className="flex flex-col justify-center items-center gap-24">
        {/* donut chart + wrong answers list side by side */}

        <div className="flex justify-center items-center gap-5 h-tabs">
          <ChartPieDonut chartData={charDate} />

          <div className="max-h-[500px] overflow-y-auto pr-2">
            {/* show wrong questions only */}
            {results?.WrongQuestions?.length > 0 && (
              <div className="space-y-6 py-6">
                {results.WrongQuestions.map((wq) => {
                  // find the original question details
                  const originalQ = questions?.find((q) => q._id === wq.QID);
                  if (!originalQ) return null;

                  // figure out which option was correct and which was chosen wrong

                  const correctOpt = originalQ.answers.find(
                    (a) => a.key === wq.correctAnswer
                  );
                  const wrongOpt = originalQ.answers.find(
                    (a) => a.key === wq.inCorrectAnswer
                  );

                  return (
                    <div key={wq.QID} className="p-4 bg-white">
                      <p className="text-blue-600 mb-2 font-semibold text-xl">
                        {originalQ.question}
                      </p>

                      <div className="space-y-2">
                        {/* the wrong choice (highlighted red) */}

                        {wrongOpt && (
                          <label className="flex items-center gap-3 p-3 bg-red-50">
                            <input type="radio" className="hidden" />
                            <span className="w-3 h-3 rounded-full border flex justify-center items-center border-red-600">
                              <span className="w-2 h-2 rounded-full bg-red-600 block"></span>
                            </span>

                            <span className="text-red-600 font-semibold">
                              {wrongOpt.answer}
                            </span>
                          </label>
                        )}

                        {/* the right answer (highlighted green) */}
                        {correctOpt && (
                          <label className="flex items-center gap-3 p-3 bg-green-50">
                            <input type="radio" className="hidden" />
                            <span className="w-3 h-3 rounded-full border border-emerald-600"></span>

                            <span className="text-green-700 font-semibold">
                              {correctOpt.answer}
                            </span>
                          </label>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* buttons at the bottom */}
        <div className="flex gap-4 mt-6 z-40 bg-white p-5 w-full">
          <Button
            variant="secondary"
            className="flex-1 flex items-center gap-2"
            onClick={handleRestart}
          >
            <RotateCcw className="h-4 w-4" />
            Restart
          </Button>
          <Button className="flex-1 flex items-center gap-2">
            <FolderSearch className="h-4 w-4" />
            Explore
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
