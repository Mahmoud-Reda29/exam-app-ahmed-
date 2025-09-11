import { Metadata } from "next";
import RegisterForm from "./_components/register-form";

// Metadata for SEO
export const metadata: Metadata = {
  title: "Register",
  description: "Create a new account to start learning and take exams.",
  openGraph: {
    title: "Register",
    description: "Sign up with your details to create your account.",
    url: "/register",
  },
};

// Page Component
export default function Register() {
  return (
    <div className="w-input max-w-md py-36 text-left">
      {/* Registration form component */}
      <RegisterForm />
    </div>
  );
}
