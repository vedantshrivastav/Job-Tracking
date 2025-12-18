import React from "react";

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Capture",
      description:
        "Quickly add applications using our browser extension or direct entry. We handle the heavy lifting of extracting company details.",
    },
    {
      number: "02",
      title: "Timeline",
      description:
        'Visualize every stage from "Applied" to "Signed". Track interview dates and technical assessment deadlines in one view.',
    },
    {
      number: "03",
      title: "Analyze",
      description:
        "Review your conversion rates. Identify where your funnel is leaking and optimize your outreach strategy.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 max-w-7xl mx-auto px-6">
      <div className="mb-16">
        <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4 mono">
          The Workflow
        </h2>
        <h3 className="text-3xl font-bold text-zinc-900 max-w-md">
          Built for the systematic candidate.
        </h3>
      </div>
      <div className="grid md:grid-cols-3 gap-12">
        {steps.map((step) => (
          <div key={step.number} className="group">
            <div className="text-4xl font-bold text-zinc-100 group-hover:text-zinc-200 transition-colors mb-4 mono">
              {step.number}
            </div>
            <h4 className="text-lg font-bold text-zinc-900 mb-3">
              {step.title}
            </h4>
            <p className="text-zinc-500 leading-relaxed text-sm">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
