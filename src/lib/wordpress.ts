export interface ProjectItem {
  number: string;
  title: string;
  image: string;
  link: string;
}

export interface ClientLogo {
  src: string;
  alt: string;
}

export interface HomepageData {
  hero: {
    title: string;
    middleText: string;
    subtitle: string;
    description: string;
    backgroundImage: string;
  };
  about: {
    sectionName: string;
    title: string;
    description: string;
    image: string;
  };
  projects: {
    title: string;
    subtitle: string;
    description: string;
    items: ProjectItem[];
  };
  clients: {
    title: string;
    description: string;
    logos: ClientLogo[];
  };
  reachOut: {
    title: string;
    image: string;
    phone: string;
    phoneRaw: string;
  };
}

const FALLBACK_DATA: HomepageData = {
  hero: {
    title: "SPACES",
    middleText: "THAT SPEAK FOR THE",
    subtitle: "BRAND",
    description: "Elegant spaces crafted with purpose, detail, and a sense of permanence.",
    backgroundImage: "/uploads/2026/02/main-banners.png",
  },
  about: {
    sectionName: "about us",
    title: "SAMA",
    description: "SAMA Production is a multidisciplinary design and build studio known for crafting refined, high-impact environments across interiors, exhibitions, and brand activations. Defined by precision, material sophistication, and architectural clarity, each project is meticulously executed to embody brand identity at the highest level.",
    image: "/uploads/2026/05/about_us_video.png",
  },
  projects: {
    title: "Projects",
    subtitle: "Spaces Brought to Life",
    description: "A curated selection of interiors that reflect our design philosophy, attention to detail, and regional expertise.",
    items: [
      { number: "01", title: "Interior", image: "/uploads/2026/06/interior-1-1.png", link: "#" },
      { number: "02", title: "Exhibition Design & Build", image: "/uploads/2026/06/Exhibition-1-1.png", link: "#" },
      { number: "03", title: "Events", image: "/uploads/2026/06/events-1-1.png", link: "#" },
      { number: "04", title: "Mall Activation & Travel Retail", image: "/uploads/2026/06/Mall-Activation-1-1-2.png", link: "#" },
    ],
  },
  clients: {
    title: "Our Clients",
    description: "Our clients include leading global brands who trust us to deliver refined, high-quality environments that elevate their presence and reflect their identity with excellence.",
    logos: [
      { src: "/uploads/2026/05/image-21-Vectorized-2.png", alt: "Eucerin Logo" },
      { src: "/uploads/2026/05/image-22-Vectorized-2.png", alt: "AMMT Logo" },
      { src: "/uploads/2026/05/image-23-Vectorized-2.png", alt: "Audi Logo" },
      { src: "/uploads/2026/05/image-24-Vectorized-1.png", alt: "Casio Logo" },
      { src: "/uploads/2026/05/Vector.png", alt: "DHL Logo" },
    ],
  },
  reachOut: {
    title: "Reach Out",
    image: "/uploads/2026/05/vertical-shot-dining-set-featuring-modern-chairs-a-2026-01-22-02-31-15-utc_1-1.png",
    phone: "+971 4 320 0416",
    phoneRaw: "+97143200416",
  },
};

/**
 * Translates WordPress URLs to local paths if they exist in public/uploads.
 */
export function mapWpUrl(url: string): string {
  if (!url) return "";
  const match = url.match(/wp-content\/uploads\/(.*)$/);
  if (match) {
    return `/uploads/${match[1]}`;
  }
  return url;
}

export async function getHomepageData(): Promise<HomepageData> {
  const url = "https://samaproductionme.com/wp-json/wp/v2/pages/7";
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!res.ok) {
      console.warn(`Failed to fetch WordPress page data: ${res.statusText}. Using fallback data.`);
      return FALLBACK_DATA;
    }

    const page = await res.json();
    const html = page.content?.rendered || "";
    
    if (!html) {
      console.warn("WordPress response contains empty content. Using fallback data.");
      return FALLBACK_DATA;
    }

    const data: HomepageData = JSON.parse(JSON.stringify(FALLBACK_DATA));

    // 1. Parse Hero Description & Quote (if found in content)
    // Looking for: Elegant spaces crafted with purpose...
    const heroDescMatch = html.match(/Elegant spaces crafted with purpose[\s\S]*?<\/p>/);
    if (heroDescMatch) {
      data.hero.description = heroDescMatch[0]
        .replace(/<[^>]+>/g, "")
        .replace(/\s+/g, " ")
        .trim();
    }

    // 2. Parse About Section Description
    const aboutDescMatch = html.match(/SAMA Production is a multidisciplinary[\s\S]*?<\/p>/);
    if (aboutDescMatch) {
      data.about.description = aboutDescMatch[0]
        .replace(/<[^>]+>/g, "")
        .replace(/\s+/g, " ")
        .trim();
    }

    // 3. Parse Projects
    const projectCards = html.split('<div class="proj-card');
    if (projectCards.length > 1) {
      const parsedItems: ProjectItem[] = [];
      for (let i = 1; i < projectCards.length; i++) {
        const cardHtml = projectCards[i];
        
        const numMatch = cardHtml.match(/class="proj-number-box">([^<]+)/);
        const titleMatch = cardHtml.match(/<h3><a[^>]*>([\s\S]*?)<\/a>/);
        const imgMatch = cardHtml.match(/<img[^>]+src="([^"]+)"/);
        const linkMatch = cardHtml.match(/class="proj-btn"><a href="([^"]+)"/);
        
        if (imgMatch) {
          parsedItems.push({
            number: numMatch ? numMatch[1].trim() : `0${i}`,
            title: titleMatch 
              ? titleMatch[1].replace(/<br\s*\/?>/g, " ").replace(/<[^>]+>/g, "").trim() 
              : "Project",
            image: mapWpUrl(imgMatch[1].trim()),
            link: linkMatch ? linkMatch[1].trim() : "#",
          });
        }
      }
      
      if (parsedItems.length > 0) {
        data.projects.items = parsedItems;
      }
    }

    // 4. Parse Client Logos (from Swiper slides)
    const swiperSlides = html.split('<div class="swiper-slide"');
    if (swiperSlides.length > 1) {
      const parsedLogos: ClientLogo[] = [];
      for (let i = 1; i < swiperSlides.length; i++) {
        const slideHtml = swiperSlides[i];
        const imgMatch = slideHtml.match(/<img[^>]+src="([^"]+)"/);
        if (imgMatch) {
          const src = mapWpUrl(imgMatch[1].trim());
          const altMatch = slideHtml.match(/alt="([^"]*)"/);
          
          if (!parsedLogos.some((l) => l.src === src)) {
            parsedLogos.push({
              src,
              alt: altMatch && altMatch[1] ? altMatch[1].trim() : "Client Logo",
            });
          }
        }
      }
      
      if (parsedLogos.length > 0) {
        data.clients.logos = parsedLogos;
      }
    }

    // 5. Parse Reach Out
    if (html.includes('id="contactus"')) {
      const reachOutPart = html.split('id="contactus"')[1] || "";
      const imgMatch = reachOutPart.match(/<img[^>]+src="([^"]+)"/);
      if (imgMatch) {
        data.reachOut.image = mapWpUrl(imgMatch[1].trim());
      }
      
      const phoneMatch = reachOutPart.match(/href="tel:([^"]+)"/);
      if (phoneMatch) {
        data.reachOut.phoneRaw = decodeURIComponent(phoneMatch[1].trim());
      }
      
      const phoneTextMatch = reachOutPart.match(/class="elementor-icon-list-text">([^<]+)/);
      if (phoneTextMatch) {
        data.reachOut.phone = phoneTextMatch[1].trim();
      }
    }

    return data;
  } catch (err) {
    console.error("Error in getHomepageData:", err);
    return FALLBACK_DATA;
  }
}

export interface AboutPageData {
  hero: {
    title: string;
    middleText: string;
    subtitle: string;
    description: string;
    backgroundImage: string;
  };
  about: {
    sectionName: string;
    title: string;
    description: string;
    image: string;
  };
  designSection: {
    image: string;
    quote: string;
  };
  whoWeAre: {
    title: string;
    pillars: {
      title: string;
      description: string;
    }[];
  };
  certificationsSection: {
    title: string;
    items: {
      image: string;
      title: string;
    }[];
  };
}

const FALLBACK_ABOUT_DATA: AboutPageData = {
  hero: {
    title: "VISION",
    middleText: "THAT DRIVES THE",
    subtitle: "CRAFT",
    description: "Elegant spaces crafted with purpose, detail, and a sense of permanence.",
    backgroundImage: "https://samaproductionme.com/wp-content/uploads/2026/06/dining-room-in-a-coffee-shop-on-two-tone-wall-back-2026-03-24-01-02-36-utc-scaled.jpg",
  },
  about: {
    sectionName: "about us",
    title: "SAMA",
    description: "SAMA Production is a multidisciplinary design and build studio known for crafting refined, high-impact environments across interiors, exhibitions, and brand activations. Defined by precision, material sophistication, and architectural clarity, each project is meticulously executed to embody brand identity at the highest level.",
    image: "/uploads/2026/05/about_us_video.png",
  },
  designSection: {
    image: "https://samaproductionme.com/wp-content/uploads/2026/06/Mask-group2.png",
    quote: "“We design and build spaces where clarity, detail, and purpose come together to create meaningful brand experiences.”",
  },
  whoWeAre: {
    title: "Who We Are",
    pillars: [
      {
        title: "Design Led Thinking",
        description: "We approach every project with a strong design foundation, focusing on spatial planning, material selection, and visual clarity to create environments that are both functional and impactful.",
      },
      {
        title: "End to End Execution",
        description: "From concept development to final installation, we manage every stage of the process in-house, ensuring consistency, quality, and precision across all deliverables.",
      },
      {
        title: "Detail & Craftsmanship",
        description: "Every element is carefully considered and executed with attention to detail, resulting in refined spaces that reflect quality, durability, and strong brand presence.",
      },
    ],
  },
  certificationsSection: {
    title: "Certifications",
    items: [
      {
        image: "https://samaproductionme.com/wp-content/uploads/2026/05/blue-certificates.png",
        title: "2015 Quality Management System Certification"
      },
      {
        image: "https://samaproductionme.com/wp-content/uploads/2026/05/2-230132.png",
        title: "2018 Occupational Health & Safety Certification"
      },
      {
        image: "https://samaproductionme.com/wp-content/uploads/2026/05/3-61.png",
        title: "2015 Environmental Management Certification"
      }
    ]
  }
};

export async function getAboutPageData(): Promise<AboutPageData> {
  const url = "https://samaproductionme.com/wp-json/wp/v2/pages/1822";
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!res.ok) {
      console.warn(`Failed to fetch About Us WordPress page data: ${res.statusText}. Using fallback data.`);
      return FALLBACK_ABOUT_DATA;
    }

    const page = await res.json();
    const html = page.content?.rendered || "";
    
    if (!html) {
      console.warn("WordPress response for About Us contains empty content. Using fallback data.");
      return FALLBACK_ABOUT_DATA;
    }

    const data: AboutPageData = JSON.parse(JSON.stringify(FALLBACK_ABOUT_DATA));

    // 1. Extract Hero Title parts (from VISION THAT DRIVES THE CRAFT)
    if (html.includes("THAT DRIVES THE")) {
      data.hero.title = "VISION";
      data.hero.middleText = "THAT DRIVES THE";
      data.hero.subtitle = "CRAFT";
    }

    // 2. Extract Hero Description/Quote
    const heroDescMatch = html.match(/Elegant spaces crafted with purpose[\s\S]*?<\/p>/);
    if (heroDescMatch) {
      data.hero.description = heroDescMatch[0]
        .replace(/<[^>]+>/g, "")
        .replace(/\s+/g, " ")
        .trim();
    }

    // 3. Extract About Section Description
    const aboutDescMatch = html.match(/SAMA Production is a multidisciplinary[\s\S]*?<\/p>/);
    if (aboutDescMatch) {
      data.about.description = aboutDescMatch[0]
        .replace(/<[^>]+>/g, "")
        .replace(/\s+/g, " ")
        .trim();
    }

    // 4. Extract Design Section Quote
    const designQuoteMatch = html.match(/“We design and build spaces[\s\S]*?”/i) || html.match(/We design and build spaces[^<]+/i);
    if (designQuoteMatch) {
      data.designSection.quote = designQuoteMatch[0]
        .replace(/<[^>]+>/g, "")
        .replace(/\s+/g, " ")
        .trim();
    }

    // 5. Extract Design Section Image
    const designImgMatch = html.match(/<img[^>]+src="([^"]+Mask-group[^"]+)"/i) || html.match(/<img[^>]+src="([^"]+)"/i);
    if (designImgMatch) {
      data.designSection.image = designImgMatch[1].trim();
    }

    // 6. Extract Who We Are Pillars
    const whoWeAreTitleMatch = html.match(/<h[1-6][^>]*>\s*Who We Are\s*<\/h[1-6]>/i);
    if (whoWeAreTitleMatch) {
       data.whoWeAre.title = "Who We Are";
    }

    const pillars = [];
    const parts = html.split(/<h[234]/);
    for (let i = 1; i < parts.length; i++) {
       const part = parts[i];
       const endHeading = part.match(/<\/h[234]>/);
       if (!endHeading) continue;
       
       const titleHtml = part.substring(part.indexOf('>') + 1, endHeading.index);
       const title = titleHtml.replace(/<[^>]+>/g, "").trim().replace(/&amp;/g, "&");
       
       if (title.length < 50) {
         if (title.includes("Design Led") || title.includes("End to End") || title.includes("Craftsmanship")) {
           const afterHeading = part.substring(endHeading.index);
           const pMatch = afterHeading.match(/<p>([\s\S]*?)<\/p>/);
           if (pMatch) {
             const desc = pMatch[1].replace(/<[^>]+>/g, "").trim();
             pillars.push({ title, description: desc });
           }
         }
       }
    }
    if (pillars.length > 0) {
      data.whoWeAre.pillars = pillars;
    }

    // 7. Extract Certifications
    const certImages = [
      { key: "blue-certificates", defaultTitle: "2015 Quality Management System Certification" },
      { key: "2-230132", defaultTitle: "2018 Occupational Health & Safety Certification" },
      { key: "3-61", defaultTitle: "2015 Environmental Management Certification" }
    ];

    const certItems = certImages.map(item => {
      let image = "";
      let title = item.defaultTitle;

      const imgRegex = new RegExp(`<img[^>]+src="([^"]+${item.key}[^"]*)"`, "i");
      const imgMatch = html.match(imgRegex);
      if (imgMatch) {
        image = imgMatch[1].trim();
      } else {
        if (item.key === "blue-certificates") image = "https://samaproductionme.com/wp-content/uploads/2026/05/blue-certificates.png";
        else if (item.key === "2-230132") image = "https://samaproductionme.com/wp-content/uploads/2026/05/2-230132.png";
        else image = "https://samaproductionme.com/wp-content/uploads/2026/05/3-61.png";
      }

      const idx = html.indexOf(item.key);
      if (idx !== -1) {
        const afterImg = html.substring(idx, idx + 1000);
        const textMatch = afterImg.match(/>([^<]*Certification[^<]*)</i);
        if (textMatch) {
          title = textMatch[1].trim();
        }
      }

      return { image, title };
    });

    data.certificationsSection = {
      title: "Certifications",
      items: certItems
    };
    
    return data;
  } catch (err) {
    console.error("Error in getAboutPageData:", err);
    return FALLBACK_ABOUT_DATA;
  }
}

