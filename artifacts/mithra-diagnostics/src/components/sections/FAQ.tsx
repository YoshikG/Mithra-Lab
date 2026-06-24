import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

export function FAQ() {
  const faqs = [
    {
      q: "Do I need fasting before blood tests?",
      a: "For most blood tests, fasting for 8-10 hours is recommended. However, some tests like CBC, thyroid, and vitamin D do not require fasting. Our team will guide you when you book."
    },
    {
      q: "How long does report generation take?",
      a: "Most reports are ready within 4-6 hours. Urgent reports can be delivered faster. We also provide same-day reports for routine tests."
    },
    {
      q: "Are you open 24 hours?",
      a: "Yes! Mithra Diagnostics is open 24 hours a day, 7 days a week including all public holidays. Emergency testing is always available."
    },
    {
      q: "Do you provide home sample collection?",
      a: "Yes, we provide home sample collection services. Our certified phlebotomists will come to your location at your preferred time."
    },
    {
      q: "Can reports be downloaded online?",
      a: "You can contact us via WhatsApp or phone to receive your reports digitally. We send reports as PDF via WhatsApp."
    },
    {
      q: "What payment methods are accepted?",
      a: "We accept cash, UPI (GPay, PhonePe, Paytm), and online transfers. We keep our prices affordable for all patients."
    },
    {
      q: "Can I book appointments online?",
      a: "Yes! You can book appointments through our website form, WhatsApp, or by calling us directly at +91 82475 57270."
    },
    {
      q: "How accurate are the test results?",
      a: "We use advanced equipment and follow strict quality control procedures. Our tests are highly accurate and reliable."
    }
  ];

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-orange-600 font-semibold tracking-wider uppercase text-sm mb-2">Support</h2>
          <h3 className="font-poppins text-3xl font-bold text-foreground">
            Frequently Asked Questions
          </h3>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-semibold text-gray-800 hover:text-primary">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
