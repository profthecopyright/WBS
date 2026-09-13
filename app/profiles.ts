export type ProProfile = {
  slug: string;
  name: string;
  initials: string;
  image?: string;
  imagePosition?: string;
  badge?: string;
  location: string;
  specialty: string;
  introduction: string;
  paragraphs: string[];
  highlights: string[];
  formats: string[];
  availability?: string;
  agencyRole?: string;
  links?: { label: string; href: string }[];
};

export const proProfiles: ProProfile[] = [
  {
    slug: "brian-glubok", name: "Brian Glubok", initials: "BG",
    image: "/images/inside-gallery/brian-glubok.png", location: "United States",
    specialty: "Tournament partnerships & coaching",
    introduction: "Five-time national champion, lifelong bridge professional, and founder of WBS.",
    paragraphs: [
      "WBS is the brainchild of veteran bridge champion Brian Glubok, a former teenage prodigy and one of the leading high-stakes rubber bridge players of the last half-century. When demand for his own playing services exceeded his capacity, Brian asked trusted colleagues to cover sessions under his supervision. He continues to coach the clients and guide the operation.",
      "A former teenage prodigy, Brian became a Life Master at 15 in 1975. His career spans elite high-stakes rubber bridge, five North American national championships, thirteen national runner-up finishes, and more than 200 regional event wins. He also won the Australian National Open Teams in 1987 and a gold medal at the 1983 Pan-American Maccabi Games in Brazil.",
      "His five NABC+ titles are the 1987 Spingold, the 1990 Reisinger, and the 1996, 1997 and 1999 Jacoby Open Swiss Teams.",
      "Glubok self-identifies as a writer, thinker, filmmaker, and painter, but the rest of us all know, even if he doesn't, that he is mostly a bridge player. His Diary of a Bridge Pro follows tournament life, the people around the game, and a few things beyond the table."
    ],
    highlights: ["Five NABC+ championships", "Thirteen NABC+ runner-up finishes", "More than 200 regional event wins", "1987 Australian National Open Teams champion"],
    formats: ["Tournaments", "Online play", "Coaching"], agencyRole: "Founder & President",
    links: [{label: "Brian's blogs", href: "#blogs"}, {label: "Brian on Bridge Winners", href: "https://bridgewinners.com/article/author/brian-glubok/"}]
  },
  {
    slug: "bob-hamman", name: "Bob Hamman", initials: "BH",
    image: "/images/inside-gallery/bob-hamman.png", location: "Dallas, Texas",
    badge: "Available exclusively through WBS",
    specialty: "Championship tournament partnerships",
    introduction: "One of bridge's most accomplished world champions, with a career spanning more than half a century.",
    paragraphs: [
      "Bob Hamman's record places him among the great players in bridge history. His career includes world titles, decades of national championship victories, and his celebrated years with the Dallas Aces, the American team that brought the world team title back to the United States in the 1970s.",
      "Originally from Southern California, Bob made Dallas his home after joining the team assembled by Ira Corn. Alongside his bridge career, he founded SCA Promotions. His book, At the Table: My Life and Times, recounts the people and experiences behind his extraordinary playing career.",
      "Bob has partnered or teamed with Brian Glubok at successive North American nationals since spring 2025. WBS can discuss professional playing opportunities with him on a very limited basis; arrangements depend on his schedule and the event."
    ],
    highlights: ["Multiple world championships", "More than half a century of championship success", "Member of the celebrated Dallas Aces"],
    formats: ["Tournaments"], availability: "Very limited availability. Contact WBS to discuss a specific event."
  },
  {
    slug: "joe-grue", name: "Joe Grue", initials: "JG",
    image: "/images/inside-gallery/joe-grue.jpg", location: "New York & international circuit",
    specialty: "International tournaments & online partnerships",
    introduction: "Bermuda Bowl champion and leading professional on the American and international circuits.",
    paragraphs: [
      "Joe Grue combines championship experience with imaginative, competitive bridge. He won the 2017 Bermuda Bowl with USA2 in Lyon and has accumulated major North American team titles alongside an extensive career as a playing professional.",
      "Joe competes throughout the United States and internationally in Europe, Asia, and South America. His successful partnerships include his regular tournament work with Gillian Miniter, with strong results across multiple continents.",
      "An avid competitor at many sports, Joe plays regularly for WBS, mostly online: occasionally from an airport lounge in a foreign country, sometimes from his place in New York. A foundational gem in the WBS crown."
    ],
    highlights: ["2017 Bermuda Bowl champion", "Multiple North American championships", "Extensive international playing experience"],
    formats: ["Online play", "Tournaments"]
  },
  {
    slug: "finn-kolesnik", name: "Finn Kolesnik", initials: "FK",
    image: "/images/inside-gallery/finn-kolesnik.png", location: "Austin, Texas",
    specialty: "Matchpoint pairs & championship partnerships",
    introduction: "2025 Bermuda Bowl champion and one of America's outstanding young bridge talents.",
    paragraphs: [
      "Finn Kolesnik won the 2025 Bermuda Bowl with USA1, establishing himself at the highest level of international team competition. He followed that achievement with a semifinal finish in the 2026 Spingold at the Summer Nationals in Minneapolis.",
      "Alongside his team successes, Finn is particularly adept at matchpoint pairs. He is available to discuss online partnerships from his home in Austin and in-person play at regional and national tournaments in the United States.",
      "We recommend you become familiar with Finn. His international career is already distinguished, and WBS looks forward to following his results for many years to come."
    ],
    highlights: ["2025 Bermuda Bowl champion", "2026 Spingold semifinalist", "Strong matchpoint pairs experience"],
    formats: ["Online play", "Tournaments"]
  },
  {
    slug: "paulo-brum", name: "Paulo Brum", initials: "PB",
    image: "/images/inside-gallery/paulo-brum.jpg", location: "Columbus, Ohio",
    specialty: "Playing partnerships, teaching & deal analysis",
    introduction: "Brazilian international player, experienced teacher, and the person coordinating WBS partnerships.",
    paragraphs: [
      "Paulo Brum represented Brazil internationally, first as a junior in the early 1990s and later on the Brazilian Open Team. Now based in Ohio with his family, he combines professional play with teaching and the day-to-day scheduling of WBS professionals and clients.",
      "Though he has an advanced academic degree in marine biology and works as a Portuguese translator, it is apparent that what Paulo most wants to be doing is teaching or playing, preferably playing, for WBS. His students benefit from a thoughtful teacher who helps them understand the decisions behind a deal.",
      "Paulo joined WBS in 2023 and has helped the agency develop its operations. His Bridge Studio blog explores interesting deals from the perspectives of declarer and defenders."
    ],
    highlights: ["Brazilian junior and Open Team international", "Advanced academic training in marine biology", "Author of Bridge Studio"],
    formats: ["Online play", "Tournaments", "Club play", "Lessons"], agencyRole: "Professional Scheduling",
    links: [{label: "Bridge Studio by Paulo", href: "https://bridgestudio.substack.com/"}, {label: "The Bridge Experts", href: "https://www.thebridgeexperts.com/"}]
  },
  {
    slug: "gregor-rus", name: "Gregor Rus", initials: "GR",
    image: "/images/inside-gallery/gregor-rus.png", location: "Ljubljana, Slovenia",
    specialty: "Online partnerships & written hand analysis",
    introduction: "Slovenian international and university professor with years of experience teaching bridge and mathematics.",
    paragraphs: [
      "At home in his native Slovenia, Gregor Rus is a personable university professor at the Faculty of Mathematics and Physics, University of Ljubljana, and a mainstay of the Slovenian bridge team. He has years of experience teaching both bridge and other subjects, so players of all levels can learn something from him.",
      "Gregor plays extensively for WBS online, often during American daytime games that fall in the evening in Slovenia. His university and family responsibilities shape his travel schedule, but he also participates in European festivals and North American nationals.",
      "Students particularly value his thorough written analyses of the day's deals. Gregor enjoys experimenting with AI as part of his analytical work, while keeping the focus on helping a student understand the bridge decisions behind the result."
    ],
    highlights: ["Slovenian international player", "Professor at the University of Ljubljana", "Detailed written analysis for students"],
    formats: ["Online play", "Lessons", "Hand analysis", "Tournaments"],
    availability: "Online sessions are a regular part of Gregor's WBS work. Tournament travel is arranged individually."
  },
  {
    slug: "ljudmila-kamenova", name: "Ljudmila Kamenova", initials: "LK",
    image: "/images/inside-gallery/ljudmila-kamenova.jpg", location: "Stony Brook, New York",
    specialty: "Women's and mixed events & online partnerships",
    introduction: "Two-time Women's Board-a-Match champion, Fast Pairs champion, and MIT-trained mathematician.",
    paragraphs: [
      "Ljudmila Kamenova received her PhD from MIT in 2006, after which she spent one year working at the Institute for Advanced Study in Princeton. Since then she has been a faculty member at Stony Brook University.",
      "Her bridge accomplishments include the 2004 Collegiate Championship; Long Island Player of the Year in 2016; the 2017 and 2018 Women's Board-a-Match, the last two years the event was held; the 2021 USBF Mixed trials as USA2; and the 2023 Fast Pairs. Her runner-up finishes include the 2015 Wagar Knockout, lost by one IMP to Baker's team, the 2007 and 2011 GNT Flight A, and the 2025 Women's Open Swiss.",
      "Ljudmila loves bridge, and WBS considers it an honor to offer her services online and face to face. She welcomes enquiries about future professional dates, including women's and mixed pairs, with arrangements made around her academic and family commitments."
    ],
    highlights: ["2017 & 2018 Women's Board-a-Match champion", "2023 Fast Pairs champion", "2021 USBF Mixed trials, USA2", "PhD, MIT; faculty member, Stony Brook University"],
    formats: ["Online play", "Tournaments"],
    links: [{label: "Ljudmila's university page", href: "https://www.math.stonybrook.edu/~kamenova/"}, {label: "Ljudmila's bridge accomplishments", href: "https://www.math.stonybrook.edu/~kamenova/homepage_files/bridge.html"}]
  },
  {
    slug: "disa-eythorsdottir", name: "Hjordis \"Disa\" Eythorsdottir", initials: "DE",
    image: "/images/inside-gallery/disa-eythorsdottir.png", location: "United States & international circuit",
    specialty: "Women's, mixed & open tournament partnerships",
    introduction: "Icelandic world champion and established professional with extensive international experience.",
    paragraphs: [
      "Known throughout the tournament circuit as Disa, Hjordis Eythorsdottir is an Icelandic world champion and an accomplished playing professional. She brings extensive experience in elite competition to her professional partnerships.",
      "Disa is a longstanding friend of WBS. Clients can enquire about women's, mixed, and open events, and discuss a partnership suited to their tournament plans.",
      "WBS can coordinate her playing services alongside coaching, hand analysis, and other professionals when a client needs a broader support arrangement."
    ],
    highlights: ["World champion", "Established tournament professional", "Women's, mixed and open competition"],
    formats: ["Tournaments", "Online play"]
  },
  {
    slug: "danuta-kazmucha", name: "Danuta Kazmucha", initials: "DK",
    image: "/images/inside-gallery/danuta-kazmucha.jpg", location: "Poland & international circuit",
    specialty: "Women's events & international partnerships",
    introduction: "Polish international player with national championship success in Minneapolis.",
    paragraphs: [
      "Danuta Kazmucha is a Polish international player whose success includes a women's national championship in Minneapolis in 2026. She adds further international strength to the WBS roster.",
      "Danuta's competitive experience makes her an option for clients planning women's events and other tournament partnerships. WBS can discuss an event, a client's goals, and her availability before arranging a professional date."
    ],
    highlights: ["Polish international player", "2026 women's national championship success"],
    formats: ["Tournaments", "Online play"]
  },
  {
    slug: "alex-kolesnik", name: "Alex Kolesnik", initials: "AK",
    image: "/images/inside-gallery/alex-kolesnik.jpg", location: "California",
    specialty: "Tournament partnerships & practical instruction",
    introduction: "Champion player, mathematics professor, and a founding collaborator in WBS.",
    paragraphs: [
      "Alex Kolesnik is a California mathematics professor specializing in statistics, a champion bridge player, and a longtime contributor to the ACBL junior program. He helped Brian Glubok launch WBS in 2020 and remains a trusted professional partner for agency clients.",
      "Born in Ukraine, raised in Texas, and based in California for more than thirty years, Alex has produced strong results with WBS clients both online and face to face. He and Brian have also achieved a series of overall finishes in national pair events.",
      "Alex is the father of international bridge players Finn and Emma Kolesnik. An avid music lover, he once managed a Los Angeles rock club during his graduate student years and still enjoys catching a live band after a tournament session."
    ],
    highlights: ["Mathematics professor specializing in statistics", "Longtime ACBL junior-program contributor", "Helped launch WBS in 2020"],
    formats: ["Online play", "Tournaments", "Lessons"]
  },
  {
    slug: "ed-zuckerberg", name: "Ed Zuckerberg", initials: "EZ",
    image: "/images/inside-gallery/ed-zuckerberg.png",
    location: "California", specialty: "Online teaching & playing partnerships",
    introduction: "Professional speaker, enthusiastic bridge educator, and Brian's longtime tournament partner.",
    paragraphs: [
      "Ed Zuckerberg has partnered Brian Glubok since the Philadelphia Nationals in March 2018. Their recent results include a 25th-place finish in the von Zedtwitz Life Master Pairs at the 2026 Summer Nationals in Minneapolis.",
      "A professional speaker and enthusiastic advocate for technology, Ed volunteered to teach online classes to help WBS get established. He has been warned that no good deed goes unpunished, but is helping the agency bring teaching and coaching to developing players.",
      "Ed, the father of Facebook founder Mark Zuckerberg, also helped support the introduction of the WBS booth at the Minneapolis Nationals. He is part of the agency's effort to make professional bridge instruction more accessible online."
    ],
    highlights: ["WBS online teaching program", "25th, 2026 von Zedtwitz Life Master Pairs", "Brian's tournament partner since 2018"],
    formats: ["Lessons", "Online play", "Tournaments"],
    links: [{label: "Ed's professional website", href: "https://www.painlessdrz.com/"}]
  },
  {
    slug: "sam-hwang", name: "Sam Hwang", initials: "SH",
    location: "New York, New York", specialty: "Club & online partnerships",
    introduction: "A popular New York playing professional known for his friendly manner and competitive bridge.",
    paragraphs: [
      "Sam Hwang grew up in California and is now based in New York, where he is a popular and in-demand professional at Honors Bridge Club.",
      "Don't let his cheerful demeanor fool you: he is a determined competitor at the table. WBS clients can enquire about club and online partnerships suited to their goals and schedules."
    ],
    highlights: ["New York club professional", "Honors Bridge Club playing experience"],
    formats: ["Club play", "Online play"]
  },
  {
    slug: "ioannis-oikonomopoulos", name: "Ioannis \"Giannis\" Oikonomopoulos", initials: "IO",
    image: "/images/inside-gallery/ioannis-oikonomopoulos.png", location: "United States & international circuit",
    specialty: "Competitive playing partnerships",
    introduction: "Greek-born Grand Life Master with world youth titles and major North American results.",
    paragraphs: [
      "Ioannis Oikonomopoulos, known to many players as Giannis, is a Greek-born professional and Grand Life Master. His competitive record includes world youth titles and major North American results.",
      "Giannis brings that international background to professional playing partnerships. Contact WBS to discuss online play or a tournament date and to confirm an arrangement that suits both the client and the professional."
    ],
    highlights: ["Grand Life Master", "World youth championship titles", "Major North American results"],
    formats: ["Online play", "Tournaments"]
  },
  {
    slug: "hongbo-li", name: "Hongbo \"Meow\" Li", initials: "HL",
    location: "United States", specialty: "Playing partnerships, teaching & client support",
    introduction: "China-born software engineer, neuroscientist, and NABC event champion.",
    paragraphs: [
      "Hongbo Li serves as Executive Vice-President of WBS and advises the agency on technology and operations. He received his PhD in biomedical engineering from Johns Hopkins University and brings experience from the startup world to the development of WBS.",
      "His team won the 0-10K Swiss Teams at the St. Louis NABC. Alongside his agency responsibilities, Hongbo plays bridge with clients and teaches online. His work helps connect the professional roster, the teaching program, and the practical needs of the people using WBS.",
      "Hongbo's favorite bridge expression is: \"No redouble, no re-trouble.\""
    ],
    highlights: ["PhD in biomedical engineering, Johns Hopkins University", "0-10K Swiss Teams champion, St. Louis NABC", "Technology and agency operations"],
    formats: ["Online play", "Lessons", "Club play"], agencyRole: "Executive Vice-President"
  },
  {
    slug: "jackie-thomas", name: "Jackie Thomas", initials: "JT",
    location: "San Francisco Bay Area, California", specialty: "Beginner partnerships & small-group teaching",
    introduction: "An energetic teacher and playing partner with a particular affinity for beginning players.",
    paragraphs: [
      "Jackie Thomas helped launch the WBS booth at the 2026 Minneapolis Nationals and continues to bring enthusiasm to the agency's work with clients and new players.",
      "A former Visa executive, Jackie teaches bridge in the Bay Area and is particularly well suited to novice and beginning players, either as a playing partner or a small-group teacher.",
      "Her energy extends beyond bridge to climbing, kayaking, and the outdoors. At WBS, she combines that enthusiasm with a welcoming approach to helping people find their place in the game."
    ],
    highlights: ["Teaching for novice and beginning players", "Small-group instruction", "WBS booth launch, Minneapolis 2026"],
    formats: ["Lessons", "Club play"], agencyRole: "Client Outreach"
  }
];

export function findPro(slug: string) {
  return proProfiles.find((pro) => pro.slug === slug);
}

export function profileHref(pro: ProProfile) {
  return `#pros/${pro.slug}`;
}

const coreOrder = ["brian-glubok", "joe-grue", "paulo-brum", "gregor-rus", "bob-hamman"];
const otherOrder = ["ioannis-oikonomopoulos", "finn-kolesnik", "danuta-kazmucha", "disa-eythorsdottir", "ljudmila-kamenova", "alex-kolesnik", "ed-zuckerberg", "sam-hwang", "hongbo-li", "jackie-thomas"];
export const corePros = coreOrder.map((slug) => findPro(slug)!);
export const otherPros = otherOrder.map((slug) => findPro(slug)!);
