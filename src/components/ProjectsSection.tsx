import Image from "next/image";

export default function ProjectsSection() {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#7C8C70] via-[#563320] to-white p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full max-w-[92%] sm:max-w-[88%] md:max-w-[85%] mx-auto py-16 sm:py-24 flex flex-col gap-20 sm:gap-28 z-10">
        
        {/* Header Block */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-8 sm:pb-12">
          {/* Main Title */}
          <h2 className="font-ivymode font-normal text-[5.5rem] sm:text-[7.5rem] md:text-[9rem] lg:text-[10.5rem] xl:text-[12.5rem] text-[#E5D9C4] leading-[0.8] select-none">
            Projects
          </h2>
          
          {/* Subtext info */}
          <div className="max-w-xs sm:max-w-sm md:max-w-md flex flex-col items-start gap-3">
            <h3 className="font-ivymode text-lg sm:text-xl md:text-2xl text-[#E5D9C4] font-normal leading-tight">
              Spaces Brought to Life
            </h3>
            <p className="font-ivymode text-xs sm:text-sm text-[#E5D9C4]/80 leading-relaxed tracking-wide">
              A curated selection of interiors that reflect our design philosophy, attention to detail, and regional expertise.
            </p>
          </div>
        </div>

        {/* Project 01: Left Image, Right Text */}
        <div className="w-full flex flex-col md:flex-row items-stretch gap-8 md:gap-0">
          {/* Left Image Column */}
          <div className="w-full md:w-[65%] relative aspect-[16/10] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
            <Image
              src="/uploads/2026/06/interior-1-1.png"
              alt="Interior Project"
              fill
              priority
              unoptimized
              sizes="(max-w-1024px) 100vw, 65vw"
              className="object-cover object-center hover:scale-105 transition-transform duration-[2000ms] ease-out"
            />
          </div>

          {/* Right Info Column */}
          <div className="w-full md:w-[35%] flex flex-col items-start justify-center pl-0 md:pl-16 py-6 md:py-0">
            {/* Box 01 */}
            <div className="border border-[#E5D9C4]/40 px-3 py-1.5 text-[#E5D9C4] font-ivymode text-sm tracking-wider select-none">
              01
            </div>
            {/* Divider Line */}
            <div className="w-[1px] h-20 bg-white/20 my-4 ml-3" />
            {/* Title */}
            <h4 className="font-ivymode text-2xl sm:text-3xl md:text-4xl text-[#E5D9C4] font-normal leading-tight">
              Interior
            </h4>
          </div>
        </div>

        {/* Project 02: Left Text, Right Image */}
        <div className="w-full flex flex-col-reverse md:flex-row items-stretch gap-8 md:gap-0">
          {/* Left Info Column */}
          <div className="w-full md:w-[35%] flex flex-col items-start md:items-end justify-center pr-0 md:pr-16 py-6 md:py-0 text-left md:text-right">
            {/* Box 02 */}
            <div className="border border-[#E5D9C4]/40 px-3 py-1.5 text-[#E5D9C4] font-ivymode text-sm tracking-wider select-none self-start md:self-end">
              02
            </div>
            {/* Divider Line */}
            <div className="w-[1px] h-20 bg-white/20 my-4 ml-3 md:ml-0 md:mr-3" />
            {/* Title */}
            <h4 className="font-ivymode text-2xl sm:text-3xl md:text-4xl text-[#E5D9C4] font-normal leading-snug max-w-xs">
              Exhibition Design<br />& Build
            </h4>
          </div>

          {/* Right Image Column */}
          <div className="w-full md:w-[65%] relative aspect-[16/10] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
            <Image
              src="/uploads/2026/06/Exhibition-1-1.png"
              alt="Exhibition Design"
              fill
              priority
              unoptimized
              sizes="(max-w-1024px) 100vw, 65vw"
              className="object-cover object-center hover:scale-105 transition-transform duration-[2000ms] ease-out"
            />
          </div>
        </div>

        {/* Project 03: Left Image, Right Text */}
        <div className="w-full flex flex-col md:flex-row items-stretch gap-8 md:gap-0">
          {/* Left Image Column */}
          <div className="w-full md:w-[65%] relative aspect-[16/10] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
            <Image
              src="/uploads/2026/06/events-1-1.png"
              alt="Events Project"
              fill
              priority
              unoptimized
              sizes="(max-w-1024px) 100vw, 65vw"
              className="object-cover object-center hover:scale-105 transition-transform duration-[2000ms] ease-out"
            />
          </div>

          {/* Right Info Column */}
          <div className="w-full md:w-[35%] flex flex-col items-start justify-center pl-0 md:pl-16 py-6 md:py-0">
            {/* Box 03 */}
            <div className="border border-[#E5D9C4]/40 px-3 py-1.5 text-[#E5D9C4] font-ivymode text-sm tracking-wider select-none">
              03
            </div>
            {/* Divider Line */}
            <div className="w-[1px] h-20 bg-white/20 my-4 ml-3" />
            {/* Title */}
            <h4 className="font-ivymode text-2xl sm:text-3xl md:text-4xl text-[#E5D9C4] font-normal leading-tight">
              Events
            </h4>
          </div>
        </div>

        {/* Project 04: Left Text, Right Image */}
        <div className="w-full flex flex-col-reverse md:flex-row items-stretch gap-8 md:gap-0">
          {/* Left Info Column */}
          <div className="w-full md:w-[35%] flex flex-col items-start md:items-end justify-center pr-0 md:pr-16 py-6 md:py-0 text-left md:text-right">
            {/* Box 04 */}
            <div className="border border-[#563320]/60 px-3 py-1.5 text-[#563320] font-ivymode text-sm tracking-wider select-none self-start md:self-end">
              04
            </div>
            {/* Divider Line */}
            <div className="w-[1px] h-20 bg-[#563320]/30 my-4 ml-3 md:ml-0 md:mr-3" />
            {/* Title */}
            <h4 className="font-ivymode text-2xl sm:text-3xl md:text-4xl text-[#563320] font-normal leading-snug max-w-xs">
              Mall Activation<br />& Travel Retail
            </h4>
          </div>

          {/* Right Image Column */}
          <div className="w-full md:w-[65%] relative aspect-[16/10] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
            <Image
              src="/uploads/2026/06/Mall-Activation-1-1-2.png"
              alt="Mall Activation Project"
              fill
              priority
              unoptimized
              sizes="(max-w-1024px) 100vw, 65vw"
              className="object-cover object-center hover:scale-105 transition-transform duration-[2000ms] ease-out"
            />
          </div>
        </div>

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
