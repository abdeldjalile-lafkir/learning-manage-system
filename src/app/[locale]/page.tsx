import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWork } from "@/components/landing/HowItWorks";
import { Categories } from "@/components/landing/Categories";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { States } from "@/components/landing/States";
import { Tools } from "@/components/landing/Tools";
import { Contacts } from "@/components/landing/Contacts";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <States />
      <Tools />
      <Features />
      <HowItWork />
      <Categories />
      <Testimonials />
      <FAQ />
      <Contacts />
    </>
  );
}
