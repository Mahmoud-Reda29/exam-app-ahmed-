"use client";

import React, { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import ForgetPasswordEmail from "./forget-password-email";
import ForgetPasswordCreatePassword from "./forget-password-create-password";
import OtpForm from "./forget-password-reset-code";

export type NextStepType = () => void;
export type PrevStepType = () => void;

export default function StepsGroup() {
  const [step, setStep] = useState("step1");
  const [email, setEmail] = useState("");

  const steps = ["step1", "step2", "step3"];

  {
    /* Go to the next step */
  }
  const nextStep: NextStepType = () => {
    const index = steps.indexOf(step);
    if (index < steps.length - 1) setStep(steps[index + 1]);
  };

  {
    /* Go back to the previous step */
  }
  const prevStep: PrevStepType = () => {
    const index = steps.indexOf(step);
    if (index > 0) setStep(steps[index - 1]);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center font-mono ">
      <div className="relative w-input bg-white ">
        <Tabs value={step} onValueChange={setStep}>
          <AnimatePresence mode="wait">
            {/* Step 1: Ask for email */}

            {step === "step1" && (
              <TabsContent value="step1">
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <ForgetPasswordEmail
                    nextStep={nextStep}
                    setEmail={setEmail}
                  />
                </motion.div>
              </TabsContent>
            )}

            {/* Step 2: Enter OTP code */}

            {step === "step2" && (
              <TabsContent value="step2">
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <OtpForm
                    prevStep={prevStep}
                    nextStep={nextStep}
                    email={email}
                  />
                </motion.div>
              </TabsContent>
            )}

            {/* Step 3: Create new password */}

            {step === "step3" && (
              <TabsContent value="step3">
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <ForgetPasswordCreatePassword
                    prevStep={prevStep}
                    email={email}
                  />
                </motion.div>
              </TabsContent>
            )}
          </AnimatePresence>
        </Tabs>
      </div>
    </div>
  );
}
