import React from 'react';

export const PhilosophySection: React.FC = () => {
  const inquiries = [
    {
      index: '01',
      question: 'What if we could live differently?',
      reflection:
        'When materials sense and adapt like living membranes, shelter becomes a symbiotic organism rather than an inert wall.',
    },
    {
      index: '02',
      question: 'What if technology became more human?',
      reflection:
        'The next fifty years belong to calm, spatial instruments that enrich physical presence rather than pulling attention into glass rectangles.',
    },
    {
      index: '03',
      question:
        "What if the impossible was simply something we hadn't explored yet?",
      reflection:
        'By giving tangible form to unbuilt futures today, we gain the agency to choose which tomorrow deserves to be constructed.',
    },
  ];

  return (
    <section
      id="chapter-philosophy"
      aria-label="Chapter 05: The Philosophy"
      className="relative min-h-screen w-full py-32 px-6 md:px-14 max-w-[1440px] mx-auto flex flex-col justify-between pointer-events-none"
    >
      <div className="pointer-events-auto">
        <p className="text-xs font-mono tracking-[0.2em] text-[#525D6B] mb-3">
          05 · THE PHILOSOPHY
        </p>
        <h2
          className="font-display text-4xl sm:text-6xl font-semibold tracking-tight text-[#0F141A] leading-[1.02] max-w-3xl"
          style={{ textWrap: 'balance' }}
        >
          WE DON&apos;T WAIT FOR TOMORROW.
          <br />
          <span className="text-[#087E8B]">WE IMAGINE IT.</span>
        </h2>
      </div>

      {/* Quiet Editorial Inquiry Columns separated only by hairline borders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-10 border-t border-black/10 bg-[#F6F5F0]/88 pointer-events-auto">
        {inquiries.map((item) => (
          <article key={item.index} className="space-y-3">
            <span className="font-mono text-xs text-[#9A6F28] font-medium">
              {item.index}
            </span>
            <h3 className="font-serif-editorial italic text-2xl sm:text-3xl text-[#0F141A]">
              &ldquo;{item.question}&rdquo;
            </h3>
            <p className="text-sm text-[#525D6B] leading-relaxed">
              {item.reflection}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
