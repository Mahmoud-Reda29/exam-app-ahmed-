"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useExamQuestions } from "@/app/(homePage)/[subject_id]/[exam_id]/_hooks/use-exam-questions.hook";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  QuizFormSchema,
  QuizFormValues,
} from "@/lib/schemes/exam-question.scheme";
import { Progress } from "@/components/ui/progress";
import TimerCircle from "./timer";
import { AnswerKey } from "@/lib/types/exam-questions";
import { usePathname } from "next/navigation";
import QuizResults from "./results";
import { LoopLoader } from "@/app/(homePage)/_components/loop-loader";

const QuizPage = ({
  exam_id,
  subject_id,
  subjectName,
}: {
  exam_id: string;
  subject_id: string;
  subjectName: string;
}) => {
  const { data, isLoading, error } = useExamQuestions(exam_id);
  const questions = data?.questions ?? [];
  const pathname = usePathname();

  const answersKey = `questions-${exam_id}-answers`;
  const indexKey = `questions-${exam_id}-index`;

  // safe localStorage helpers
  const safeGetJson = <T,>(key: string): T | null => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  };
  const safeSetJson = (key: string, value: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      return;
    }
  };
  const safeRemove = (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch {
      return;
    }
  };

  // check if localStorage(indexKey) is stored; if not return 0
  const [activeIndex, setActiveIndex] = useState<number>(() => {
    try {
      const raw =
        typeof window !== "undefined" ? localStorage.getItem(indexKey) : null;

      if (!raw) return 0;
      const parsed = parseInt(raw);
      return parsed;
    } catch {
      return 0;
    }
  });

  const form = useForm<QuizFormValues>({
    resolver: zodResolver(QuizFormSchema),
    defaultValues: { answers: [] },
  });

  // watch answers array
  const answers = useWatch({
    control: form.control,
    name: "answers",
  }) as QuizFormValues["answers"] | undefined;

  const currentValue = answers?.[activeIndex]?.correct;
  const isCurrentAnswered = currentValue !== "" && currentValue !== "empty";

  // prevent reacting to the programmatic seeding
  const seededRef = useRef(false);
  const prevSerializedRef = useRef<string | null>(null);

  // index value used for results tab (right after last question)
  const resultsIndex = questions.length;

  // ✅ update index with option to skip persisting
  const updateIndex = (newIndex: number, persist = true) => {
    setActiveIndex(newIndex);
    if (persist && newIndex !== resultsIndex) {
      safeSetJson(indexKey, newIndex);
    }
  };

  // seed form answers from storage (or defaults)
  useEffect(() => {
    if (!questions.length) return;

    type StoredAnswer = { questionId: string; correct: string };

    const defaultAnswers: QuizFormValues["answers"] = questions.map((q) => ({
      questionId: q._id,
      correct: "empty" as AnswerKey,
    }));

    const stored = safeGetJson<StoredAnswer[]>(answersKey);
    let initialAnswers = defaultAnswers;

    if (stored && Array.isArray(stored)) {
      const theMap = new Map(stored.map((s) => [s.questionId, s.correct]));

      initialAnswers = questions.map((q) => ({
        questionId: q._id,
        correct: (theMap.get(q._id) ?? "empty") as AnswerKey,
      }));
    }

    form.reset({ answers: initialAnswers });
    safeSetJson(answersKey, initialAnswers);

    seededRef.current = true;
    prevSerializedRef.current = JSON.stringify(initialAnswers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  // persist answers when user changes them (after seed)
  useEffect(() => {
    if (!seededRef.current) return;
    if (!answers) return;

    const serialized = JSON.stringify(answers);
    if (prevSerializedRef.current === serialized) return;

    prevSerializedRef.current = serialized;
    safeSetJson(answersKey, answers);
  }, [answers, answersKey]);

  // legacy pathname cleanup
  useEffect(() => {
    return () => {
      if (pathname !== window.location.pathname) {
        safeRemove(answersKey);
        safeRemove(indexKey);
      }
    };
  }, [pathname, answersKey, indexKey, subject_id, exam_id]);

  const handleNext = () => {
    if (questions.length && activeIndex < questions.length - 1) {
      updateIndex(activeIndex + 1, true); // ✅ يخزن
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      updateIndex(activeIndex - 1, false); // ❌ ما يخزن
    }
  };

  // onSubmit now opens "Results" tab instead of navigating
  const onSubmit = (values: QuizFormValues) => {
    void values;
    updateIndex(resultsIndex, true); // ✅ يخزن
  };

  if (isLoading)
    return (
      <div>
        <LoopLoader />
      </div>
    );
  if (error) return <p>{error.message}</p>;
  if (!questions.length) return <p>No questions found</p>;

  const progressPct =
    questions.length > 0 ? ((activeIndex + 1) / questions.length) * 100 : 0;

  return (
    <Tabs
      value={String(activeIndex)}
      className="select-none w-full px-6  font-mono"
    >
      {/* header + progress */}
      <div className="w-full text-sm font-normal text-gray-500 pb-11">
        <div className="flex items-center justify-between mb-1">
          <span className="font-medium">
            {subjectName} - {questions[0].exam.title}
          </span>
          <span>
            Question{" "}
            <span className="text-blue-600 font-bold">
              {activeIndex === resultsIndex
                ? safeGetJson(indexKey)
                : activeIndex + 1}
            </span>{" "}
            of {questions.length}
          </span>
        </div>
        <Progress value={progressPct} className="h-4" />
      </div>

      <TabsList className="hidden">
        {questions.map((_, i) => (
          <TabsTrigger key={i} value={String(i)}>
            {i + 1}
          </TabsTrigger>
        ))}
        <TabsTrigger
          key="results"
          value={String(resultsIndex)}
          className="hidden"
        >
          results
        </TabsTrigger>
      </TabsList>

      {questions.map((ques, i) => (
        <TabsContent
          key={ques._id}
          value={String(i)}
          className="h-full data-[state=inactive]:hidden"
          forceMount
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-6">
                <h2 className="text-blue-600 font-semibold text-xl mb-4">
                  {i + 1}: {ques.question}
                </h2>

                <FormField
                  control={form.control}
                  name={`answers.${i}.correct`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(val) => field.onChange(val)}
                          value={field.value ?? ""}
                          className="flex flex-col gap-3 text-blue-600 justify-center items-center"
                        >
                          {ques.answers.map((ans) => {
                            const inputId = `${ques._id}-${ans.key}`;
                            return (
                              <div
                                key={ans.key}
                                className="flex items-center justify-between p-4 w-full bg-gray-50 hover:bg-gray-100 rounded"
                              >
                                <div className="flex items-center gap-x-3">
                                  <RadioGroupItem
                                    value={ans.key}
                                    id={inputId}
                                  />
                                  <Label
                                    htmlFor={inputId}
                                    className="text-gray-800 cursor-pointer"
                                  >
                                    {ans.answer}
                                  </Label>
                                </div>
                              </div>
                            );
                          })}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-between items-center h-20 gap-2.5">
                <Button
                  size="quiz"
                  type="button"
                  onClick={handlePrev}
                  disabled={activeIndex === 0}
                  variant="ghost"
                  className="bg-gray-200 rounded disabled:opacity-50"
                >
                  Previous
                </Button>

                <TimerCircle
                  parentMin={questions[0].exam.duration}
                  examId={exam_id}
                  onSubmit={form.handleSubmit(onSubmit)}
                  clear={activeIndex === resultsIndex} // ✅ clears timer at results
                />

                {activeIndex < questions.length - 1 ? (
                  <Button
                    size="quiz"
                    type="button"
                    onClick={handleNext}
                    disabled={!isCurrentAnswered}
                    className="bg-blue-600 text-white rounded disabled:opacity-50"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    size="quiz"
                    type="submit"
                    disabled={!isCurrentAnswered}
                    className="bg-green-600 text-white rounded disabled:opacity-50"
                  >
                    Submit
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </TabsContent>
      ))}

      {/* Results Tab */}

      <TabsContent
        key="results"
        value={String(resultsIndex)}
        className="h-full data-[state=inactive]:hidden p-6"
        forceMount
      >
        {activeIndex == resultsIndex && (
          <QuizResults
            answersKey={answersKey}
            questions={questions || undefined}
          />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default QuizPage;
