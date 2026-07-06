import { SectionTitle } from '@/components/marketing/SectionTitle';

export default function FAQPage() {
  const faqs = [
    {
      q: "What is the minimum booking duration?",
      a: "Our minimum booking duration is 2 hours. This ensures you have enough time to set up, create, and wrap up without rushing."
    },
    {
      q: "Can I book the studio for a full day?",
      a: "Yes, you can book the studio for up to 12 hours in a single day subject to availability."
    },
    {
      q: "Do I need to create an account to book?",
      a: "No! You can book a session directly as a guest. Simply fill in your details and you will be redirected to WhatsApp for final confirmation."
    },
    {
      q: "Is equipment included in the hourly rate?",
      a: "Basic grip and continuous lighting are included. Specialized cameras, lenses, and premium microphones may incur additional rental fees."
    },
    {
      q: "How do I pay?",
      a: "Payments are coordinated via WhatsApp after your booking request is submitted. An advance payment percentage may be required to secure your slot."
    }
  ];

  return (
    <div className="pt-24 pb-16 bg-black min-h-screen">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <SectionTitle title="Frequently Asked Questions" />
        
        <div className="mt-12 space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-zinc-950 p-6 rounded-xl border border-zinc-800">
              <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
              <p className="text-zinc-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
