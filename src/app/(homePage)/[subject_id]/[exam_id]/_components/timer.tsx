"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type Props = {
  parentMin: number;
  examId: string;
  onSubmit: () => void;
  clear?: boolean;
};

export default function TimerCircle({
  parentMin,
  examId,
  onSubmit,
  clear,
}: Props) {
  // keep your testing value as-is
  const totalSeconds = Math.max(0, Math.floor(parentMin)) * 60;

  const storageKey = `exam-${examId}-timer`;
  const pathname = usePathname();

  // restore from storage
  const [seconds, setSeconds] = useState<number>(() => {
    if (typeof window === "undefined") return totalSeconds;
    const saved = localStorage.getItem(storageKey);
    return saved !== null ? Number(saved) : totalSeconds;
  });

  // stable refs to avoid re-creating interval when parent re-renders
  const intervalRef = useRef<number | null>(null);
  const onSubmitRef = useRef(onSubmit);

  // always keep latest onSubmit in a ref (doesn't retrigger the interval effect)
  useEffect(() => {
    onSubmitRef.current = onSubmit;
  }, [onSubmit]);

  // handle clear (reset) and start interval once
  useEffect(() => {
    if (clear) {
      // clear interval if present and reset state + storage
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      localStorage.removeItem(storageKey);
      setSeconds(totalSeconds);
      return;
    }

    // If an interval already exists for this mounted instance, don't create another
    if (intervalRef.current !== null) return;

    intervalRef.current = window.setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          // time's up: persist 0, clear interval and call latest onSubmit
          localStorage.setItem(storageKey, "0");
          if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          // call onSubmit async to avoid running it inside setState synchronously
          setTimeout(() => onSubmitRef.current?.(), 0);
          return 0;
        }
        const next = prev - 1;
        localStorage.setItem(storageKey, String(next));
        return next;
      });
    }, 1000);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [clear, storageKey, totalSeconds]);

  // legacy pathname cleanup
  useEffect(() => {
    return () => {
      if (pathname !== window.location.pathname) {
        localStorage.removeItem(storageKey);
      }
    };
  }, [pathname, storageKey]);

  if (clear) return null;

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div className="w-16 h-16 text-xs text-black font-normal flex items-center justify-center">
      <CircularProgressbarWithChildren
        value={(seconds / Math.max(1, totalSeconds)) * 100}
        strokeWidth={12}
        styles={buildStyles({
          pathColor: "#2563eb",
          trailColor: "#e5edff",
          strokeLinecap: "butt",
          pathTransitionDuration: 0.35,
        })}
      >
        <span>
          {mins}:{secs.toString().padStart(2, "0")}
        </span>
      </CircularProgressbarWithChildren>
    </div>
  );
}
