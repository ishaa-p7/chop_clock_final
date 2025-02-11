"use client"

import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { SessionProvider } from "next-auth/react";
import GoogleButton from "./_components/GoogleButton";


const HomePage = () => {

  

  return (
    // <SessionProvider>

    <div className="min-h-screen">
      {/* Navbar */}
      {/* <Navbar /> */}

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-[80vh] p-6">
        <h1 className="text-4xl font-bold mb-4">Welcome to ChopClock</h1>
        <p className="text-lg text-center max-w-xl">
          Experience premium haircuts and grooming services tailored just for you.
        </p>
      </main>
   

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
