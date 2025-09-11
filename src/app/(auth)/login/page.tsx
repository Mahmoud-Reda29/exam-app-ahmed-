import { Metadata } from "next";
import { LoginForm } from "@/app/(auth)/login/_components/login-form";

// Metadata for SEO
export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to access your account and continue learning.",
};

// Page Component
export default async function Login() {
  return (
    <div className="w-input max-w-md text-left">
      {/* Page heading */}

      <div className="text-start font-inter font-bold pb-4 text-gray-800">
        <h3 className="text-2xl font-bold">Login</h3>
      </div>

      {/* Login form component */}

      <LoginForm />
    </div>
  );
}
