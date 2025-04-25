import { auth, signIn } from "@/auth";
import GoogleSvg from "@/components/design/GoogleSvg";
import { Mail } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { FaFacebook } from "react-icons/fa6";

async function LoginPage() {
  const session = await auth();

  if(session) redirect("/home");

  return (
    <div className="w-full h-screen flex-center">
      <div className="flex flex-col items-center justify-center max-w-md mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-serif font-bold text-center">
          Join Medium.
        </h1>

        <form className="w-full " action={async () => {
          "use server";
          await signIn("google" , {redirectTo : "/home"});

        }}>
          <button
            className="flex items-center justify-center w-full py-2 px-4 border rounded-full bg-accent cursor-pointer transition-colors"
          >
            <GoogleSvg/>
            Sign up with Google
          </button>
        </form>
        <button
          className="flex items-center justify-center w-full py-2 px-4 border rounded-full  bg-muted  cursor-not-allowed gap-2"
          disabled
        >
          <FaFacebook/>
          Sign up with Facebook
        </button>

        <button
          className="flex items-center justify-center w-full py-2 px-4 border rounded-full bg-muted cursor-not-allowed gap-2"
          disabled
        >
          <Mail/>
          Sign up with email
        </button>

        <div className="text-center text-sm mt-4">
          Already have an account?
          <span className="text-green-600 font-medium ml-1 cursor-not-allowed">
            Sign in
          </span>
        </div>

        <div className="text-xs text-center text-gray-500 mt-8">
          Click "Sign up" to agree to Medium's
          <span className="text-gray-700"> Terms of Service</span> and
          acknowledge that Medium's
          <span className="text-gray-700"> Privacy Policy</span> applies to you.
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
