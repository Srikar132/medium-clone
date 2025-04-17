import { signIn } from '@/auth';
import Image from 'next/image';
import React from 'react';

async function LoginPage() {



  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-custom-baby-pink via-white to-custom-purple flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-8 flex flex-col items-center text-center">
        
        <Image height={20} width={20} src="/logo.jpg" alt="Blog Logo" className="w-16 h-16 mb-4" />
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to Medium Lite</h1>
        <p className="text-gray-600 mb-6">Start writing your thoughts, stories, and ideas.</p>

        <form  action={async () => {
            "use server"
            await signIn("google",{ redirectTo : "/home" });
        }} >
            <button className="flex items-center justify-center bg-white border border-gray-300 py-2 px-6 rounded-2xl shadow-sm hover:bg-gray-100 transition-colors" type='submit'>
            <Image height={10} width={10} src="/google (2).png" alt="Google" className="w-5 h-5 mr-3" />
            <span className="text-gray-700 font-medium">Continue with Google</span>
            </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
