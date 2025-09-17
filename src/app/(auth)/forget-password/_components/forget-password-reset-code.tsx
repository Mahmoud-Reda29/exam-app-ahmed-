"use client";

import React from "react";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  ResetCodeSchema,
  ResetCodeValues,
} from "../../../../lib/schemes/forget-password.scheme";
import { NextStepType, PrevStepType } from "./steps-group";
import { useAddForgetPasswordResetCode } from "../_hooks/use-add-forget-password-reset-code";
import { AuthError } from "@/components/auth-error";

type OtpProps = {
  prevStep?: PrevStepType;
  nextStep?: NextStepType;
  email: string;
};

const OTP_TIMER_KEY = "otp-timer-start";
const OTP_DURATION = 60;

// Forget password step: Verify OTP
export default function ForgetPasswordReset({
  prevStep,
  nextStep,
  email,
}: OtpProps) {
  const { error, isPending, VerifyOtp } = useAddForgetPasswordResetCode();
  const [seconds, setSeconds] = React.useState(OTP_DURATION);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const form = useForm<ResetCodeValues>({
    resolver: zodResolver(ResetCodeSchema),
    defaultValues: { resetCode: "" },
  });

  // Timer logic
  function runTimer(startTime: number) {
    if (timerRef.current) clearInterval(timerRef.current);
    const updateTimer = () => {
      const fromStart = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(OTP_DURATION - fromStart, 0);
      setSeconds(remaining);
      if (remaining === 0) {
        localStorage.removeItem(OTP_TIMER_KEY);
        if (timerRef.current) clearInterval(timerRef.current);
      }
    };
    updateTimer();
    timerRef.current = setInterval(updateTimer, 1000);
  }

  const startTimer = React.useCallback(() => {
    localStorage.setItem(OTP_TIMER_KEY, Date.now().toString());
    runTimer(Date.now());
  }, []);

  React.useEffect(() => {
    const start = localStorage.getItem(OTP_TIMER_KEY);
    if (start) {
      runTimer(parseInt(start, 10));
    } else {
      startTimer();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  // Prev step
  function handlePrevStep() {
    if (prevStep) {
      prevStep();
      localStorage.removeItem(OTP_TIMER_KEY);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }

  // Submit OTP
  const onSubmit = async (values: ResetCodeValues) => {
    VerifyOtp(values, {
      onSuccess: () => {
        if (nextStep) nextStep();
        localStorage.removeItem(OTP_TIMER_KEY);
      },
    });
  };

  return (
    <>
      {/* Back Button */}
      <div
        className="font-bold h-10 w-10 border-2 border-gray-200 flex justify-center items-center mb-10 cursor-pointer rounded-md hover:bg-gray-50"
        onClick={handlePrevStep}
      >
        <MoveLeft />
      </div>

      {/* OTP Form */}
      <div className="max-w-md mx-auto rounded-lg space-y-6">
        <h1 className="text-3xl text-gray-800 font-bold mb-2 font-inter">
          Verify OTP
        </h1>

        <p className="text-gray-500 w-input text-base mb-4">
          Please enter the 6-digit code we have sent to:
          <br />
          <span className="text-gray-800">{email}</span>
          <Button
            variant={"none"}
            type="button"
            onClick={handlePrevStep}
            className="text-blue-600 ml-2"
          >
            Edit
          </Button>
        </p>

        {/* OTP Input Field */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => onSubmit(values))}
            className="space-y-6"
          >
            {/* Input Field */}
            <FormField
              control={form.control}
              name="resetCode"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center gap-2">
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
                      className="gap-2"
                    >
                      <InputOTPGroup className="flex justify-center items-center gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <InputOTPSlot key={i} index={i} />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Timer */}
            <div className="text-center text-gray-400 text-base mb-4 font-medium">
              You can request another code in:{" "}
              {seconds !== 0 ? (
                <span>{`${seconds}s`}</span>
              ) : (
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={startTimer}
                >
                  Resend
                </span>
              )}
            </div>

            {/* API Error */}
            {error && <AuthError error={error?.message} />}

            {/* Submit */}
            <Button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-medium rounded-md mb-4"
            >
              {isPending ? "Verifying..." : "Verify Code"}
            </Button>
          </form>
        </Form>

        {/* Register link */}
        <div className="text-center text-gray-500 text-sm font-medium">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-600">
            Create yours
          </Link>
        </div>
      </div>
    </>
  );
}
