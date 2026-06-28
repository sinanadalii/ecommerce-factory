import { Nav } from "@/components/marketing/Nav";
import { Hero } from "@/components/marketing/Hero";
import { SocialProof } from "@/components/marketing/SocialProof";
import { Problem } from "@/components/marketing/Problem";
import { Solution } from "@/components/marketing/Solution";
import { DemoShowcase } from "@/components/marketing/DemoShowcase";
import { PhaseTwoFlow } from "@/components/marketing/PhaseTwoFlow";
import { Features } from "@/components/marketing/Features";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Comparison } from "@/components/marketing/Comparison";
import { Pricing } from "@/components/marketing/Pricing";
import { FAQ } from "@/components/marketing/FAQ";
import { CTA } from "@/components/marketing/CTA";
import { Footer } from "@/components/marketing/Footer";

/**
 * Ecommerce Factory — sales site. Each section answers a buyer question, in the
 * order a buyer asks them: what is it → can I trust it → what's my pain → how is
 * it solved → show me → what's inside → how does it work → vs. building it →
 * what's it cost → objections → let's go.
 */
export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <SocialProof />
        <Problem />
        <Solution />
        <DemoShowcase />
        <PhaseTwoFlow />
        <Features />
        <HowItWorks />
        <Comparison />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
