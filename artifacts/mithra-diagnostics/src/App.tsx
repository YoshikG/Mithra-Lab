import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { MithraUser } from "@/hooks/use-user";

import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { EmergencyBar } from "@/components/EmergencyBar";
import { AIAssistant } from "@/components/AIAssistant";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { HealthPackages } from "@/components/sections/HealthPackages";
import { AppointmentBooking } from "@/components/sections/AppointmentBooking";
import { HomeSampleCollection } from "@/components/sections/HomeSampleCollection";
import { BeforeTestInstructions } from "@/components/sections/BeforeTestInstructions";
import { WhyUs } from "@/components/sections/WhyUs";
import { Gallery } from "@/components/sections/Gallery";
import { Reviews } from "@/components/sections/Reviews";
import { Experts } from "@/components/sections/Experts";
import { Certifications } from "@/components/sections/Certifications";
import { FAQ } from "@/components/sections/FAQ";
import { Blog } from "@/components/sections/Blog";
import { OpeningHours } from "@/components/sections/OpeningHours";
import { MapSection } from "@/components/sections/MapSection";
import { FeedbackForm } from "@/components/sections/FeedbackForm";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { RegistrationScreen } from "@/components/RegistrationScreen";
import { useUser } from "@/hooks/use-user";

const queryClient = new QueryClient();

function MithraPage() {
  const { user, login } = useUser();
  const [gateCleared, setGateCleared] = useState(false);

  const handleComplete = (data: MithraUser) => {
    login(data);
    setGateCleared(true);
  };

  return (
    <div className="relative overflow-x-hidden">
      {/* Registration gate — shows on every session: new users register, returning users see Welcome Back */}
      {!gateCleared && (
        <RegistrationScreen existingUser={user} onComplete={handleComplete} />
      )}

      <Navbar />
      <Hero />
      <EmergencyBar />
      <AIAssistant />
      <main>
        <About />
        <Services />
        <HealthPackages />
        <AppointmentBooking />
        <HomeSampleCollection />
        <BeforeTestInstructions />
        <WhyUs />
        <Gallery />
        <Reviews />
        <Experts />
        <Certifications />
        <FAQ />
        <Blog />
        <OpeningHours />
        <MapSection />
        <FeedbackForm />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MithraPage />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
