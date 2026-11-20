import { Episode, Product, Host, TourDate } from "@/types/podcast";

export const PODCAST_INFO = {
  name: "O",
  fullTitle: "O Podcast",
  tagline:
    "Swarms of ideas, unfiltered sonic culture from Nairobi to the global diaspora.",
  description:
    "Hosted by Thea Mwangi, O Podcast examines technology, music ownership, linguistics, and cultural architecture across modern Africa and the diaspora.",
  location: "Nairobi, Kenya",
  email: "hello@Opodcast.com",
  businessEmail: "sponsors@Opodcast.com",
  metrics: [
    { label: "Monthly Listeners", value: "2.4M+" },
    { label: "Published Episodes", value: "58" },
    { label: "Countries Reached", value: "64" },
    { label: "Listener Rating", value: "4.9 / 5" },
  ],
  socials: {
    spotify: "https://open.spotify.com",
    apple: "https://podcasts.apple.com",
    youtube: "https://youtube.com",
    instagram: "https://instagram.com/Opodcast",
    twitter: "https://twitter.com/Opodcast",
  },
};

export const HOSTS: Host[] = [
  {
    name: "Thea Mwangi",
    role: "Co-Host & Sound Architect",
    city: "Nairobi",
    bio: "Cultural journalist and ethnomusicologist directing O’s investigative field recordings, soundscapes, and political economy deep dives.",
    twitter: "@theamwangi",
  },
];

export const TOUR_DATES: TourDate[] = [
  {
    id: "tour-01",
    city: "Nairobi",
    country: "Kenya",
    venue: "The Alchemist Main Stage, Westlands",
    date: "Nov 28, 2026",
    time: "19:30 EAT",
    status: "Limited",
    ticketPrice: 25,
  },
  {
    id: "tour-02",
    city: "London",
    country: "United Kingdom",
    venue: "EartH Hall, Hackney",
    date: "Dec 12, 2026",
    time: "20:00 GMT",
    status: "On Sale",
    ticketPrice: 35,
  },
  {
    id: "tour-03",
    city: "New York",
    country: "United States",
    venue: "National Sawdust, Brooklyn",
    date: "Jan 18, 2027",
    time: "20:00 EST",
    status: "On Sale",
    ticketPrice: 40,
  },
  {
    id: "tour-04",
    city: "Kigali",
    country: "Rwanda",
    venue: "Kigali Cultural Amphitheatre",
    date: "Feb 06, 2027",
    time: "19:00 CAT",
    status: "On Sale",
    ticketPrice: 20,
  },
];

export const EPISODES: Episode[] = [
  {
    id: "ep-058",
    slug: "the-silicon-savannah-and-the-hustle-ethos",
    number: 58,
    season: 4,
    title: "The Silicon Savannah, Venture Capital & The Hustle Ethos",
    subtitle:
      "Beyond foreign capital narratives: how East African founders are rewiring fintech, clean energy, and community credit.",
    description:
      "Thea Mwangi sit down with venture builder Kweku Mensah to examine whether imported venture models actually serve African startups, and why indigenous credit networks consistently outperform Silicon Valley playbooks.",
    publishedAt: "Oct 10, 2026",
    duration: "68 min",
    durationSeconds: 4080,
    category: "Tech & Innovation",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg",
    artwork: "/assets/images/ep_nairobi_tech_1795139001394.jpg",
    featured: true,
    quote: {
      text: "You cannot build durable African infrastructure using Silicon Valley assumptions about burn rate and individualism.",
      author: "Kweku Mensah",
    },
    guests: [
      {
        name: "Kweku Mensah",
        role: "General Partner, Savannah Seed Fund",
        bio: 'Seed investor and author of "Rewriting the Term Sheet," backing 30+ infrastructure and energy builders across East and West Africa.',
        twitter: "@kwekumensah",
      },
    ],
    showNotes: {
      intro:
        "Recorded in our Nairobi studio room, this conversation strips away tech conference slogans to interrogate capital allocation, local liquidity, and infrastructural ownership.",
      timestamps: [
        {
          time: "00:00",
          title: "The myth of the solitary unicorn founder",
          seconds: 0,
        },
        {
          time: "12:40",
          title: "Mobile money velocity and informal credit unions",
          seconds: 760,
        },
        {
          time: "28:15",
          title: "Why foreign venture mandates miss local unit economics",
          seconds: 1695,
        },
        {
          time: "44:30",
          title: "Cooperative solar microgrids in rural counties",
          seconds: 2670,
        },
        {
          time: "59:20",
          title: "Listener questions and long-horizon patience",
          seconds: 3560,
        },
      ],
      takeaways: [
        "Community savings collectives move more reliable early-stage capital monthly than commercial bank credit lines.",
        "Founders optimizing for hardware and logistics durability outlast software arbitrage plays.",
        "Cross-border talent networks between Nairobi, Lagos, and London are creating hybrid studio hubs.",
      ],
      resources: [
        {
          title: "African Venture Capital Landscape 2026 (Research Brief)",
          url: "#",
        },
        { title: "Open-Source Angel Term Sheet Template", url: "#" },
      ],
    },
  },
  {
    id: "ep-057",
    slug: "afrobeats-amapiano-and-the-global-sonic-takeover",
    number: 57,
    season: 4,
    title: "Afrobeats, Amapiano & Who Owns the Masters",
    subtitle:
      "From neighborhood sound systems in Soweto and Lagos to stadium residencies: dissecting publishing rights and sonic exports.",
    description:
      "Music producer DJ Simba joins us in the studio to unpack sync licensing, analog drum programming, and how independent African record labels are retaining master ownership.",
    publishedAt: "Oct 03, 2026",
    duration: "56 min",
    durationSeconds: 3360,
    category: "Music & Sonic Arts",
    audioUrl:
      "https://actions.google.com/sounds/v1/ambiences/daytime_forest_bonfire.ogg",
    artwork: "/assets/images/ep_sonic_console_1795139001507.jpg",
    quote: {
      text: "Our rhythms were never niche; global distribution finally caught up with what street sound systems knew twenty years ago.",
      author: "DJ Simba",
    },
    guests: [
      {
        name: "DJ Simba",
        role: "Record Producer & Mastering Engineer",
        bio: "Nairobi and Johannesburg producer fusing log drums, analog synth basslines, and coastal percussion.",
        twitter: "@djsimba",
      },
    ],
    showNotes: {
      intro:
        "An anatomical breakdown of rhythm, sub-bass engineering, and contract sovereignty in modern African pop.",
      timestamps: [
        {
          time: "00:00",
          title: "Anatomy of the Amapiano log drum",
          seconds: 0,
        },
        {
          time: "15:20",
          title: "Major label advances vs. independent master ownership",
          seconds: 920,
        },
        {
          time: "34:10",
          title: "Film and game sync licensing as catalog equity",
          seconds: 2050,
        },
        {
          time: "48:30",
          title: "East African percussive hybrids emerging in 2026",
          seconds: 2910,
        },
      ],
      takeaways: [
        "Sync placements in global cinema often deliver stronger long-term equity than algorithmic playlisting.",
        "Independent labels retaining 50%+ of master rights build generational catalog value.",
      ],
      resources: [
        { title: "Independent Music Publishing & Split-Sheet Guide", url: "#" },
      ],
    },
  },
  {
    id: "ep-056",
    slug: "ancestral-code-ai-and-indigenous-languages",
    number: 56,
    season: 4,
    title: "Ancestral Code: Indigenous Languages in the Age of AI",
    subtitle:
      "Why training foundational speech models on Swahili, Yoruba, and Amharic oral archives is urgent cultural work.",
    description:
      "Computational linguist Dr. Tariro Moyo explains how pan-African research collectives are building community-owned voice datasets without surrendering folklore to Big Tech scraping.",
    publishedAt: "Sep 24, 2026",
    duration: "74 min",
    durationSeconds: 4440,
    category: "Culture & Identity",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg",
    artwork: "/assets/images/ep_textile_light_1795139001204.jpg",
    guests: [
      {
        name: "Dr. Tariro Moyo",
        role: "Director, Pan-African NLP Collective",
        bio: "Linguist and machine learning researcher focused on low-resource speech synthesis and ethical data trusts.",
        twitter: "@tariromoyo",
      },
    ],
    showNotes: {
      intro:
        "When software understands every nuance of an idiom, how does that shift education, healthcare, and creative expression?",
      timestamps: [
        {
          time: "00:00",
          title: "Oral history meets acoustic transformers",
          seconds: 0,
        },
        {
          time: "20:15",
          title: "Ethical voice collection across rural counties",
          seconds: 1215,
        },
        {
          time: "42:50",
          title: "Data trusts that compensate local speakers",
          seconds: 2570,
        },
      ],
      takeaways: [
        "Over 2,000 African languages carry structural logic that English-only training datasets flatten.",
        "Community data trusts allow speakers to license linguistic corpora on their own terms.",
      ],
      resources: [
        { title: "Open African Speech Benchmark Whitepaper", url: "#" },
      ],
    },
  },
  {
    id: "ep-055",
    slug: "coffee-colonial-maps-and-reclaiming-the-value-chain",
    number: 55,
    season: 4,
    title: "Coffee, Colonial Maps & Roasting at Origin",
    subtitle:
      "East Africa cultivates prized SL28 Arabica yet captures under 8% of retail value. Wanjiku Nderitu is changing the ledger.",
    description:
      "Third-generation grower and specialty roaster Wanjiku Nderitu breaks down auction politics, volcanic soil terroir, and why packaging finished coffee at source transforms farming towns.",
    publishedAt: "Sep 16, 2026",
    duration: "49 min",
    durationSeconds: 2940,
    category: "Deep Dive",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg",
    artwork: "/assets/images/ep_coffee_basalt_1795139000860.jpg",
    guests: [
      {
        name: "Wanjiku Nderitu",
        role: "Founder, Nyeri Highlands Roastery",
        bio: "Coffee agronomist and roaster shipping small-batch Kenyan beans roasted at 1,900m elevation.",
      },
    ],
    showNotes: {
      intro:
        "A sensory and economic inquiry into green-bean commodity pricing versus value-added roasting in central Kenya.",
      timestamps: [
        {
          time: "00:00",
          title: "Harvesting cherries at 1,900 meters on Mount Kenya",
          seconds: 0,
        },
        {
          time: "14:20",
          title: "Inside the Nairobi coffee auction floor",
          seconds: 860,
        },
        {
          time: "31:00",
          title: "Building direct roaster-to-listener subscriptions",
          seconds: 1860,
        },
      ],
      takeaways: [
        "Roasting and packaging at origin retains up to 50% more gross revenue inside farming districts.",
      ],
      resources: [],
    },
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "O-prod-01",
    slug: "O-swarm-heavyweight-hoodie",
    name: "O 480gsm Heavyweight Hoodie",
    subtitle: "Charcoal Wash / Tonal Chest Stitch",
    description:
      "Custom milled from 480 GSM organic combed cotton with a structured boxy drape, brushed interior fleece, and double-needle seam architecture. Built for late studio sessions and transit.",
    price: 92,
    originalPrice: 110,
    category: "Apparel",
    featured: true,
    availabilityNote: "Limited Batch · In Stock",
    images: ["/assets/images/merch_hoodie_studio_1795139000812.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Charcoal Ink", hex: "#18181B" },
      { name: "Warm Stone", hex: "#D6D3D1" },
    ],
    details: [
      "480 GSM 100% organic combed French terry cotton",
      "Preshrunk enzyme-washed finish with zero pilling",
      "Structured double-layer hood without drawstrings",
      "High-density tonal embroidery on left cuff",
    ],
    inventory: 32,
  },
  {
    id: "O-prod-02",
    slug: "sauti-ya-afrika-mineral-wash-tee",
    name: "Sauti Boxy Mineral-Wash Tee",
    subtitle: "Signal Vermilion / Heavy Jersey 260gsm",
    description:
      "Relaxed drop-shoulder tee garment-dyed in rich signal vermilion with a subtle mineral wash patina and thick 1-inch ribbed collar.",
    price: 48,
    category: "Apparel",
    featured: true,
    availabilityNote: "In Stock",
    images: ["/assets/images/merch_tee_studio_1795139000162.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Signal Vermilion", hex: "#C83E1B" },
      { name: "Carbon Ink", hex: "#141416" },
    ],
    details: [
      "260 GSM heavyweight combed single jersey",
      "Garment-dyed and enzyme-softened",
      "Blind-stitched sleeves and bottom hem",
    ],
    inventory: 45,
  },
  {
    id: "O-prod-03",
    slug: "O-live-in-nairobi-180g-vinyl",
    name: "O: Live in Nairobi (2LP 180g Vinyl)",
    subtitle: "Black Linen Gatefold / Translucent Amber Wax",
    description:
      "Original score compositions, field recordings, and live stage interludes from our sold-out Nairobi residency, pressed on heavyweight 180-gram translucent amber vinyl.",
    price: 68,
    category: "Audio Edition",
    featured: true,
    availabilityNote: "Collector Edition · 19 Left",
    images: ["/assets/images/merch_vinyl_edition_1795139000989.jpg"],
    details: [
      "2x 180g audiophile translucent amber vinyl records",
      "Matte black linen-wrapped gatefold jacket",
      "Includes 24-page studio photography booklet & FLAC download",
    ],
    inventory: 19,
  },
  {
    id: "O-prod-04",
    slug: "kenyan-basalt-cupping-set",
    name: "Nyeri Stoneware Cupping Bowls (Set of 2)",
    subtitle: "Matte Basalt Glaze / Hand-Thrown Clay",
    description:
      "Hand-thrown in central Kenya using iron-rich volcanic stoneware clay. Engineered with thick thermal walls for cupping East African single-origin coffee during morning listens.",
    price: 42,
    category: "Objects",
    featured: false,
    availabilityNote: "Small Batch",
    images: ["/assets/images/ep_coffee_basalt_1795139000860.jpg"],
    details: [
      "Locally sourced Rift Valley iron-rich stoneware",
      "Lead-free matte charcoal glaze",
      "Capacity: 240 ml each · Dishwasher safe",
    ],
    inventory: 24,
  },
];
