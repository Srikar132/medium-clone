import { auth } from "@/auth";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import TopWriters from "@/components/TopWriters";
import Trending from "@/components/Trending";
import BackgroundFilter from "@/components/design/BackgroundFilter";
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
