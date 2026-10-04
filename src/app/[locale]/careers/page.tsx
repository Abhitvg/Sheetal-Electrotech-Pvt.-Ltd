import { ArrowRight, Mail } from "lucide-react";
import { Link } from "@/i18n/routing";

const openPositions = [
  {
    title: "Electronics Engineer",
    department: "R&D and Production",
    description: "Design and develop new electronic products and systems, specializing in LED driver circuitry and power electronics.",
  },
  {
    title: "Sales Representative",
    department: "Business Development",
    description: "Expand our B2B OEM customer base and increase sales across domestic and international markets.",
  },
  {
    title: "Technical Writer",
    department: "Documentation",
    description: "Create comprehensive technical documentation, compliance reports, and user manuals for our manufactured goods.",
  },
];

export default function CareersPage() {
  return (
    <div className="bg-paper text-ink min-h-screen">
      <div className="bg-mist text-ink pt-40 pb-24">
        <div className="container-wide">
          <p className="font-mono text-accent text-sm uppercase tracking-widest mb-6 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-accent inline-block" />
            Careers at Sheetal
          </p>
          <h1 className="text-5xl md:text-7xl font-display font-medium mb-6 max-w-3xl leading-tight">
            Build the future of manufacturing.
          </h1>
          <p className="text-ink/60 text-xl max-w-2xl">
            Join our dynamic and innovative team and help us shape the future of electronic solutions and rigid packaging.
          </p>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-wide max-w-4xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-display mb-6">Our Culture</h2>
            <p className="text-steel text-lg leading-relaxed">
              At Sheetal Electrotech, we foster a culture of innovation, collaboration, and continuous learning. We believe that vertical integration is only possible with a horizontally empowered team. From the tool room to the SMT line, every employee has a voice in improving our processes.
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-display mb-8">Open Positions</h2>
            <div className="space-y-6">
              {openPositions.map((position) => (
                <div key={position.title} className="border border-steel/20 p-8 hover:border-accent transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-display font-medium mb-2">{position.title}</h3>
                      <p className="font-mono text-xs uppercase tracking-widest text-accent">{position.department}</p>
                    </div>
                  </div>
                  <p className="text-steel text-lg">{position.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-accent/10 border border-accent/20 p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-display font-medium mb-2 text-ink">Ready to Apply?</h3>
              <p className="text-steel">Send your resume and a brief cover letter with the subject line <strong>"Job Application"</strong>.</p>
            </div>
            <a href="mailto:info@sheetalelectrotech.com?subject=Job%20Application" className="bg-accent text-white px-8 py-4 font-medium flex items-center gap-3 hover:bg-blue-600 transition-colors whitespace-nowrap">
              <Mail className="w-5 h-5" /> Email HR Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
