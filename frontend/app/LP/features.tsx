import React from "react";

export const Features = () => {
  const features = [
    {
      title: "Kanban Tracking",
      description:
        "Drag and drop interface to move roles through stages like Screening, Interviewing, and Negotiation.",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    },
    {
      title: "Status Timelines",
      description:
        "Every interaction is logged. See exactly how many days have passed since your last touchpoint.",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      title: "Smart Reminders",
      description:
        "Automated follow-up prompts for applications that haven’t received a response in 7 business days.",
      icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
    },
    {
      title: "Data Export",
      description:
        "Own your data. Export your entire application history to JSON or CSV for personal archiving.",
      icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
    },
  ];

  return (
    <section
      id="features"
      className="py-24 bg-zinc-50/50 border-y border-zinc-100"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 bg-white border border-zinc-200 rounded-lg hover:border-zinc-300 transition-colors shadow-sm"
            >
              <div className="w-10 h-10 bg-zinc-900 rounded-md flex items-center justify-center mb-6">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={feature.icon}
                  ></path>
                </svg>
              </div>
              <h4 className="text-base font-bold text-zinc-900 mb-2">
                {feature.title}
              </h4>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
