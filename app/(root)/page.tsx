import { auth } from "@/auth";

import BackgroundFilter from "@/components/design/BackgroundFilter";
import Footer from "@/components/landing-page/Footer";
import Header from "@/components/landing-page/Header";
import Hero from "@/components/landing-page/Hero";
import HowItWorks from "@/components/landing-page/HowItWorks";
import Testimonials from "@/components/landing-page/Testimonials";
import TopWriters from "@/components/landing-page/TopWriters";
import Trending from "@/components/landing-page/Trending";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if(session) redirect("/home");

  return (
    <main>
      <Header/>
      <Hero/>
      <HowItWorks/>
      <TopWriters/>
      <Trending/>
      <Testimonials/>
      <Footer/>

      <BackgroundFilter/>
    </main>
  );
}
