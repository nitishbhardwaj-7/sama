import Image from "next/image";

interface ProjectItem {
  number: string;
  title: string;
  image: string;
  link: string;
}

interface ProjectsSectionProps {
  data?: {
    title: string;
    subtitle: string;
    description: string;
    items: ProjectItem[];
  };
}

export default function ProjectsSection({ data }: ProjectsSectionProps) {
  const title = data?.title || "Projects";
  const subtitle = data?.subtitle || "Spaces Brought to Life";
  const description = data?.description || "A curated selection of interiors that reflect our design philosophy, attention to detail, and regional expertise.";
  const items = data?.items || [
    { number: "01", title: "Interior", image: "/uploads/2026/06/interior-1-1.png", link: "#" },
    { number: "02", title: "Exhibition Design & Build", image: "/uploads/2026/06/Exhibition-1-1.png", link: "#" },
    { number: "03", title: "Events", image: "/uploads/2026/06/events-1-1.png", link: "#" },
    { number: "04", title: "Mall Activation & Travel Retail", image: "/uploads/2026/06/Mall-Activation-1-1-2.png", link: "#" },
  ];

  return (
    <section className="relative w-full bg-gradient-to-b from-[#7C8C70] via-[#563320] to-white p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full max-w-[92%] sm:max-w-[88%] md:max-w-[85%] mx-auto py-16 sm:py-24 flex flex-col gap-20 sm:gap-28 z-10">
        
        {/* Header Block */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-8 sm:pb-12">
          {/* Main Title */}
          <h2 className="font-ivymode font-normal text-[5.5rem] sm:text-[7.5rem] md:text-[9rem] lg:text-[10.5rem] xl:text-[12.5rem] text-[#E5D9C4] leading-[0.8] select-none">
            {title}
          </h2>
          
          {/* Subtext info */}
          <div className="max-w-xs sm:max-w-sm md:max-w-md flex flex-col items-start gap-3">
            <h3 className="font-ivymode text-lg sm:text-xl md:text-2xl text-[#E5D9C4] font-normal leading-tight">
              {subtitle}
            </h3>
            <p className="font-ivymode text-xs sm:text-sm text-[#E5D9C4]/80 leading-relaxed tracking-wide">
              {description}
            </p>
          </div>
        </div>

        {/* Dynamic Projects Grid */}
        {items.map((item, index) => {
          const isReverse = index % 2 === 1;
          const isLastItem = index === items.length - 1;
          
          // Apply dark brown text styling for the last project item that sits on the light background
          const textThemeClass = isLastItem ? "text-[#563320]" : "text-[#E5D9C4]";
          const borderThemeClass = isLastItem 
            ? "border-[#563320]/60 text-[#563320]" 
            : "border-[#E5D9C4]/40 text-[#E5D9C4]";
          const lineThemeClass = isLastItem ? "bg-[#563320]/30" : "bg-white/20";
          const alignmentClass = isReverse ? "items-start md:items-end text-left md:text-right" : "items-start text-left";

          return (
            <div 
              key={index} 
              className={`w-full flex flex-col items-stretch gap-8 md:gap-0 ${
                isReverse ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              {/* Image Column */}
              <div className="w-full md:w-[65%] relative aspect-[16/10] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority={index === 0}
                  unoptimized
                  sizes="(max-w-1024px) 100vw, 65vw"
                  className="object-cover object-center hover:scale-105 transition-transform duration-[2000ms] ease-out"
                />
              </div>

              {/* Info Column */}
              <div className={`w-full md:w-[35%] flex flex-col justify-center py-6 md:py-0 ${
                isReverse 
                  ? "pr-0 md:pr-16" 
                  : "pl-0 md:pl-16"
              } ${alignmentClass}`}>
                {/* Number Box */}
                <div className={`border px-3 py-1.5 font-ivymode text-sm tracking-wider select-none ${
                  isReverse ? "self-start md:self-end" : "self-start"
                } ${borderThemeClass}`}>
                  {item.number}
                </div>
                {/* Divider Line */}
                <div className={`w-[1px] h-20 my-4 ${
                  isReverse ? "ml-3 md:ml-0 md:mr-3" : "ml-3"
                } ${lineThemeClass}`} />
                {/* Title */}
                <h4 className={`font-ivymode text-2xl sm:text-3xl md:text-4xl font-normal leading-snug max-w-xs ${textThemeClass}`}>
                  {item.title}
                </h4>
              </div>
            </div>
          );
        })}

        {/* Call To Action Block (rendered on the light gradient ending block) */}
        <div className="w-full flex flex-col items-center justify-center gap-6 pt-12 sm:pt-16 pb-8 text-center">
          <p className="font-ivymode text-base sm:text-lg md:text-xl text-[#563320] tracking-wide max-w-md">
            Take a closer look at our projects and capabilities.
          </p>
          <a
            href="/portfolio.pdf"
            download
            className="inline-flex items-center gap-2 bg-[#563320] hover:bg-[#402213] text-[#E5D9C4] font-ivymode text-xs sm:text-sm tracking-widest uppercase px-8 py-3.5 rounded-full shadow-[0_10px_30px_rgba(86,51,32,0.3)] transition-all duration-300 transform hover:translate-y-[-2px]"
          >
            <span>Download Portfolio</span>
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="animate-bounce"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
