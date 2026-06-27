import { Hero } from "@/components/Hero";
import { MastodonSection } from "@/components/MastodonSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { DevicesSection } from "@/components/DevicesSection";
import { NutriIaSection } from "@/components/NutriIaSection";
import { ThemesSection } from "@/components/ThemesSection";
import { MoreSection } from "@/components/MoreSection";
import { Testimonials } from "@/components/Testimonials";
import { GlobalFooter } from "@/components/GlobalFooter";

// Stacked diagonal sections in source order. Section overlap, z-index layering,
// and clip-paths are all handled in ivory.css.
export default function Home() {
  return (
    <>
      <Hero />
      <MastodonSection />
      <FeaturesSection />
      <DevicesSection />
      <NutriIaSection />
      <MoreSection />
      <ThemesSection />
      <Testimonials />
      <GlobalFooter />
    </>
  );
}
