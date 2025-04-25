import { auth } from "@/auth";

import Footer from "@/components/landing-page/Footer";
import Header from "@/components/landing-page/Header";
import Hero from "@/components/landing-page/Hero";
import HowItWorks from "@/components/landing-page/HowItWorks";
import Testimonials from "@/components/landing-page/Testimonials";
import TopWriters from "@/components/landing-page/TopWriters";
import Trending from "@/components/landing-page/Trending";

export default async function Home() {
  const session = await auth();

  // if(session){
  //   redirect("/home");
  // }

  return (
    <>
      <Header/>
      <Hero/>
      <HowItWorks/>
      <TopWriters/>
      <Trending/>
      <Testimonials/>
      <Footer/>
    </>
  );
}
