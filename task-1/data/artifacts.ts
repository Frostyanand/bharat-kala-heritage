export interface Artifact {
  id: string;
  title: string;
  hindiTitle: string;
  era: string;
  periodLabel: string;
  dateRange: string;
  approxYear: number; // for chronological sorting/timeline positioning
  region: string;
  currentLocation: string;
  medium: string;
  dimensions: string;
  discoveredAt: string;
  imageUrl: string;
  modelType: 'bronze-statue' | 'sandstone-capital' | 'fresco-slab' | 'flaming-ring' | 'miniature-scroll' | 'gilded-frame' | 'stone-ascetic' | 'terracotta-relief';
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
    border: string;
  };
  summary: string;
  historicalContext: string;
  artisticSignificance: string;
  materialAndTechnique: string;
  iconography: string[];
  curatorNotes: string;
  keyThemes: string[];
  academicCO: "CO1: Historic Artifact Analysis & Timeline Chronology";
}

export const ARTIFACTS_DATA: Artifact[] = [
  {
    id: "dancing-girl-mohenjodaro",
    title: "The Dancing Girl of Mohenjo-daro",
    hindiTitle: "मोहनजोदड़ो की नर्तकी",
    era: "Indus Valley Civilization",
    periodLabel: "Bronze Age Urban Matrix",
    dateRange: "c. 2500 – 1900 BCE",
    approxYear: -2500,
    region: "Sindh, Indus River Basin",
    currentLocation: "National Museum, New Delhi, India",
    medium: "Cast Bronze via Lost-Wax Method (Cire Perdue)",
    dimensions: "10.5 cm × 5 cm × 2.5 cm",
    discoveredAt: "Excavated in 1926 by Ernest Mackay at Mohenjo-daro (DK Area)",
    imageUrl: "/artifacts/dancing-girl.jpg",
    modelType: "bronze-statue",
    colorPalette: {
      primary: "#2F3B36",
      secondary: "#6C7A6D",
      accent: "#B85D3B",
      border: "#A58C73",
    },
    summary: "A world-renowned masterpiece of proto-historic metallurgy depicting a confident young woman standing in a dynamic Tribhanga posture with left arm adorned with shell bangles.",
    historicalContext: "Discovered in the urban ruins of Mohenjo-daro in 1926, this small figurine shattered early colonial assumptions regarding the technological antiquity of the Indian subcontinent. It proves that by 2500 BCE, Harappan metallurgists had mastered complex bronze alloying (copper-tin ratios) and the lost-wax casting technique millennia before classical Greece.",
    artisticSignificance: "Unlike the stiff, monumental stone figures typical of ancient Mesopotamia and Egypt, the Dancing Girl exhibits extraordinary naturalism, casual poise, and rhythmic kinetic energy. The hand placed cockily on the right hip and the slightly bent knees capture a moment of living human spirit.",
    materialAndTechnique: "Created through 'cire perdue' (lost-wax casting). A wax model was hand-sculpted, encased in refractory clay, baked to allow molten wax to drain, and replaced with molten bronze. The left arm is loaded with bangles almost to the shoulder, while the right arm sports two amulets.",
    iconography: [
      "Tribhanga (three-curve) stance demonstrating kinetic rhythm",
      "Stack of shell bangles covering left arm to shoulder",
      "Hair coiled in an elaborate chignon bun at the nape of the neck",
      "Cowrie shell pendant necklace resting gracefully against the collarbone"
    ],
    curatorNotes: "British archaeologist Sir Mortimer Wheeler famously remarked: 'There she is, about fifteen years old, nothing more; but she stands there with her hands on her hips and legs slightly forward, as she beats time to the music with her legs and feet.'",
    keyThemes: ["Lost-Wax Metallurgy", "Proto-historic Aesthetics", "Harappan Urban Culture", "Tribhanga"],
    academicCO: "CO1: Historic Artifact Analysis & Timeline Chronology"
  },
  {
    id: "lion-capital-ashoka",
    title: "Lion Capital of Ashoka at Sarnath",
    hindiTitle: "सारनाथ का अशोक सिंह स्तम्भ",
    era: "Mauryan Empire",
    periodLabel: "Imperial Epigraphy & Dhamma",
    dateRange: "c. 250 BCE",
    approxYear: -250,
    region: "Sarnath, Uttar Pradesh",
    currentLocation: "Sarnath Archaeological Museum, Uttar Pradesh",
    medium: "Single monolithic block of polished Chunar Sandstone",
    dimensions: "2.15 meters in height",
    discoveredAt: "Excavated in 1904 by F.O. Oertel at Sarnath Deer Park",
    imageUrl: "/artifacts/ashoka-lions.jpg",
    modelType: "sandstone-capital",
    colorPalette: {
      primary: "#B68438",
      secondary: "#D4AF37",
      accent: "#8A3D22",
      border: "#D8C5A2",
    },
    summary: "The sublime crowning capital of Ashoka's monolithic pillar at Sarnath, depicting four back-to-back Asiatic lions commanding the four cardinal directions; adopted as the National Emblem of India.",
    historicalContext: "Erected by Emperor Ashoka the Great to mark the sacred Deer Park at Rishipatana (Sarnath), where Gautama Buddha delivered his first sermon (Dharmachakra Pravartana) after attaining enlightenment. The pillar stood as both an imperial proclamation and a spiritual beacon of Ahimsa and Dhamma.",
    artisticSignificance: "Represents the absolute zenith of Mauryan court art. It features the legendary glass-like 'Mauryan Polish' on fine-grained Chunar sandstone, an advanced finishing technique whose precise chemical formula remains one of the marvels of Indian antiquity.",
    materialAndTechnique: "Carved from a single massive cylinder of buff-colored Chunar sandstone quarried near Mirzapur and transported along the Ganges. The abacus features four high-relief animals (Elephant, Galloping Horse, Bull, Asiatic Lion) separated by 24-spoked Dharmachakras.",
    iconography: [
      "Four addorsed lions symbolizing sovereignty, moral courage, and Buddha as the Lion of the Shakya clan",
      "Inverted lotus bell base representing spiritual purification and divine emergence",
      "Dharmachakra wheels with 24 spokes representing cosmic law and truth (Satya)",
      "Four animals representing the four stages of Buddha's life or cardinal guardians"
    ],
    curatorNotes: "The original pillar was broken during invasions, but the capital remained remarkably intact. On January 26, 1950, the Government of India officially adopted the Lion Capital as the Republic's State Emblem.",
    keyThemes: ["Mauryan Polish", "Dharmachakra", "Ashokan Dhamma", "Monolithic Sculpture"],
    academicCO: "CO1: Historic Artifact Analysis & Timeline Chronology"
  },
  {
    id: "gandhara-fasting-siddhartha",
    title: "Fasting Siddhartha (Ascetic Buddha)",
    hindiTitle: "गंधार का तपस्वी बुद्ध",
    era: "Kushan & Gandhara Period",
    periodLabel: "Greco-Buddhist Trans-Cultural Synthesis",
    dateRange: "c. 2nd – 3rd Century CE",
    approxYear: 200,
    region: "Gandhara (Sikri, Peshawar Valley)",
    currentLocation: "Lahore Museum / National Museum replicas",
    medium: "Dark grey-blue Schist stone carving",
    dimensions: "84 cm × 53 cm × 23 cm",
    discoveredAt: "Excavated in 1889 at Sikri, Gandhara",
    imageUrl: "/artifacts/gandhara-buddha.jpg",
    modelType: "stone-ascetic",
    colorPalette: {
      primary: "#3C3D42",
      secondary: "#6A6E75",
      accent: "#A87042",
      border: "#A5A6A8",
    },
    summary: "A hauntingly sublime masterpiece of Gandharan art depicting Prince Siddhartha during his six years of rigorous penance and self-mortification before attaining ultimate Buddhahood.",
    historicalContext: "Under the Kushan emperors who bridged the Silk Road between China, India, and Rome, Gandhara became a vibrant crossroads where Hellenistic Greek sculpting naturalism fused seamlessly with deep Indian Buddhist meditative spirituality.",
    artisticSignificance: "The sculptor achieved an astonishing anatomical mastery: taut hollowed cheeks, sunken eye sockets, exposed ribcage, taut stomach muscles clinging to the spine, and pulsing veins across the desiccated skin, all framed by serene, tranquil dignity in the Dhyana Mudra.",
    materialAndTechnique: "Hand-chiseled from fine dark grey quartzose chlorite schist quarried in the Swat and Gandhara valleys. The folds of the ascetic monk's robes drape in rhythmic Hellenistic folds over the crossed-legged lotus throne.",
    iconography: [
      "Emaciated torso symbolizing supreme physical sacrifice and penance",
      "Ushnisha (cranial protuberance) representing transcendent cosmic wisdom",
      "Dhyana Mudra (meditative pose) symbolizing inner equanimity undisturbed by physical suffering",
      "Relief pedestal depicting disciples worshipping the Bodhisattva's begging bowl"
    ],
    curatorNotes: "Historians consider this sculpture one of the most powerful depictions of spiritual determination in global art history, illustrating the Buddhist truth that mortification of the flesh was insufficient without inner awakening.",
    keyThemes: ["Greco-Buddhist Art", "Schist Carving", "Silk Road Cultural Exchange", "Dhyana Mudra"],
    academicCO: "CO1: Historic Artifact Analysis & Timeline Chronology"
  },
  {
    id: "ajanta-padmapani-mural",
    title: "Bodhisattva Padmapani (Ajanta Cave 1)",
    hindiTitle: "अजंता का पद्मपाणि बोधिसत्व",
    era: "Gupta-Vakataka Golden Age",
    periodLabel: "Classical Monumental Mural Tradition",
    dateRange: "c. 450 – 500 CE",
    approxYear: 480,
    region: "Ajanta Caves, Aurangabad, Maharashtra",
    currentLocation: "Cave 1 Antechamber, Ajanta World Heritage Site",
    medium: "Tempera on rock-cut mud plaster with mineral pigments",
    dimensions: "Wall mural, approx. 2.1 m × 1.3 m",
    discoveredAt: "Rediscovered in 1819 by British officer John Smith during a tiger hunt",
    imageUrl: "/artifacts/ajanta-padmapani.jpg",
    modelType: "fresco-slab",
    colorPalette: {
      primary: "#3E4C59",
      secondary: "#A86538",
      accent: "#2A4B6B",
      border: "#C8B28B",
    },
    summary: "The quintessential image of Gupta classical aesthetic perfection: the compassionate Bodhisattva of Infinite Mercy holding a celestial blue lotus (Utpala), framed by ethereal divine beings.",
    historicalContext: "Sponsored under the Vakataka King Harishena in the late 5th century CE, the Ajanta murals represent the highest pinnacle of Indian painting, influencing Buddhist art across Sri Lanka (Sigiriya), Central Asia, Dunhuang (China), and Nara (Japan).",
    artisticSignificance: "Characterized by lyrical flowing lines, subtle modeling through tonal shading, downcast introspective lotus eyes, and an atmosphere of profound serenity and grace. The painter used varied thickness of brushwork to convey volumetric depth.",
    materialAndTechnique: "The basalt rock cave was first coated with clay mixed with cow dung, husk, and rock grit. Over this, a fine lime plaster was laid. Natural earth and mineral pigments were ground: lapis lazuli (imported from Badakhshan) for blues, yellow and red ochres, terra verde for greens, and lamp black.",
    iconography: [
      "Blue lotus (Nilotpala) in the slender right hand denoting purity and spiritual awakening",
      "Jeweled crown (Kiritamakuta) studded with pearls and sapphires",
      "Sacred yajnopavita thread composed of triple strands of pearls across the chest",
      "Gentle Tribhanga curve conveying sublime compassionate humility"
    ],
    curatorNotes: "Unlike Western true fresco painted on wet plaster, Ajanta paintings are 'tempera' or secco on dry treated plaster. Their luminous depth after 1,500 years in dark basalt grottos continues to astound art conservators.",
    keyThemes: ["Gupta Golden Age", "Cave Tempera Murals", "Lapis Lazuli Pigment", "Karuna (Compassion)"],
    academicCO: "CO1: Historic Artifact Analysis & Timeline Chronology"
  },
  {
    id: "chola-nataraja-bronze",
    title: "Nataraja: Lord of the Cosmic Dance",
    hindiTitle: "चोल कालीन नटराज कांस्य प्रतिमा",
    era: "Imperial Chola Dynasty",
    periodLabel: "Medieval Dravidian Metallurgy Zenith",
    dateRange: "c. 950 – 1100 CE",
    approxYear: 1000,
    region: "Thanjavur & Thiruvalangadu, Tamil Nadu",
    currentLocation: "Government Museum, Chennai & National Museum, New Delhi",
    medium: "Solid cast bronze alloy (Panchaloha) via Lost-Wax",
    dimensions: "114 cm × 102 cm × 30 cm",
    discoveredAt: "Temple cache at Thiruvalangadu, Tamil Nadu",
    imageUrl: "/artifacts/chola-nataraja.jpg",
    modelType: "flaming-ring",
    colorPalette: {
      primary: "#2B2824",
      secondary: "#6B5B4D",
      accent: "#B85C38",
      border: "#BF9B30",
    },
    summary: "One of the greatest sculptural concepts in world art history, encapsulating the five cosmic activities of the universe (Panchakritya) within an aureole of roaring cosmic fire.",
    historicalContext: "Created under the patronages of Chola queens like Sembiyan Mahadevi and emperors Rajaraja I and Rajendra Chola. These bronzes were created as 'utsava murtis' (processional deities) carried outside temple sanctuaries during grand festival processions.",
    artisticSignificance: "Astrophysicist Carl Sagan famously described the Chola Nataraja as a profound metaphor for the eternal cosmic dance of subatomic matter. The dynamic balance between movement and stillness, creation and destruction, is sculpted with breathtaking mathematical proportion.",
    materialAndTechnique: "Cast in 'Panchaloha' (traditional five-metal alloy of copper, silver, gold, brass, and lead). Sculptors adhered strictly to the canonical proportions described in the Shilpa Shastras, using tala measurements.",
    iconography: [
      "Damaru (hourglass drum) in upper right hand signaling Creation (Srishti)",
      "Agni (divine flame) in upper left hand signaling Destruction/Transformation (Samhara)",
      "Abhaya Mudra in lower right hand conveying Protection and Grace (Sthiti)",
      "Gajahasta arm pointing across the body toward the raised foot indicating Liberation (Moksha)",
      "Right foot trampling Apasmara Purusha, the dwarf demon of ignorance and delusion",
      "Prabhamandala (circular halo of fire) representing the cyclic cosmos and unending time"
    ],
    curatorNotes: "Renowned art critic Ananda Coomaraswamy's seminal essay 'The Dance of Shiva' brought this Chola icon to international fame, celebrating it as the ultimate synthesis of science, religion, and sculptural poetry.",
    keyThemes: ["Chola Bronze", "Panchaloha Casting", "Panchakritya", "Ananda Tandava"],
    academicCO: "CO1: Historic Artifact Analysis & Timeline Chronology"
  },
  {
    id: "kishangarh-bani-thani",
    title: "Radha as Bani Thani (The Indian Mona Lisa)",
    hindiTitle: "किशनगढ़ शैली की बनी-ठणी",
    era: "Mughal & Rajput Era",
    periodLabel: "Subtle Lyricism of Pahari & Rajasthani Ateliers",
    dateRange: "c. 1750 – 1760 CE",
    approxYear: 1755,
    region: "Kishangarh, Rajasthan",
    currentLocation: "National Museum, New Delhi",
    medium: "Opaque watercolor and gold leaf on layered Wasli paper",
    dimensions: "48.2 cm × 36.5 cm",
    discoveredAt: "Royal collection of Maharaja Sawant Singh of Kishangarh",
    imageUrl: "/artifacts/kishangarh-bani-thani.jpg",
    modelType: "miniature-scroll",
    colorPalette: {
      primary: "#6B4E38",
      secondary: "#9C7B47",
      accent: "#B85D3B",
      border: "#C29B38",
    },
    summary: "The pinnacle of Rajasthani miniature painting painted by master artist Nihal Chand, immortalizing poet-queen Bani Thani as the embodiment of divine grace, ethereal beauty, and devotional love.",
    historicalContext: "Commissioned by Maharaja Sawant Singh (a devout Vaishnavite poet writing under the nom-de-plume Nagari Das) and his talented singer-consort Bani Thani ('The Fashioned Lady'). Master court painter Nihal Chand developed this hyper-stylized romantic aesthetic in the mid-18th century.",
    artisticSignificance: "Distinguished by an impossibly delicate facial profile: dramatically arched eyebrows, elongated lotus-petal eyes curving up toward the temple, a slender high nose, sensual curling lips, and an exquisite gossamer transparent odhni (veil) dusted with gold leaf.",
    materialAndTechnique: "Executed on hand-pressed 'Wasli' paper made of sun-dried jute fiber layers glued with rice paste and burnished with an agate stone. Nihal Chand utilized squirrel-tail hair brushes for ultra-fine micro-lines and natural pigments (orpiment yellow, lapis blue, real gold powder).",
    iconography: [
      "Elongated curved lotus eyes (Khanjan-nayani) symbolizing divine spiritual yearning",
      "Gossamer transparent veil (Odhni) painted with ethereal multi-layered glaze washes",
      "Lotus flower held delicately between fingertips representing purity and devotion (Bhakti)",
      "Lavish emerald, pearl, and gold neck chokers reflecting royal Rajput court splendor"
    ],
    curatorNotes: "Eric Dickinson, the English art historian who visited Kishangarh in 1943, nicknamed this painting 'The Indian Mona Lisa' due to its mysterious enigmatic smile and supreme lyrical elegance.",
    keyThemes: ["Rajput Miniature", "Kishangarh Atelier", "Wasli Paper", "Bhakti Lyricism"],
    academicCO: "CO1: Historic Artifact Analysis & Timeline Chronology"
  },
  {
    id: "tanjore-balakrishna",
    title: "Thanjavur Balakrishna with Embossed Gold Foil",
    hindiTitle: "तंजौर का स्वर्ण जड़ित नवनीत कृष्ण",
    era: "Maratha & Nayaka Period",
    periodLabel: "Sacred Classical Guilds & Gilded Reliefs",
    dateRange: "c. 1780 – 1850 CE",
    approxYear: 1820,
    region: "Thanjavur (Tanjore), Tamil Nadu",
    currentLocation: "Saraswathi Mahal Library Art Gallery, Thanjavur & Private Collections",
    medium: "22-Karat Gold leaf, limestone gesso relief, uncut gems on Teak wood board",
    dimensions: "75 cm × 60 cm × 5 cm",
    discoveredAt: "Commissioned under the royal patronage of the Maratha rulers of Tanjore (Serfoji II)",
    imageUrl: "/artifacts/tanjore-krishna.jpg",
    modelType: "gilded-frame",
    colorPalette: {
      primary: "#1A2530",
      secondary: "#7A6335",
      accent: "#B32626",
      border: "#D4AF37",
    },
    summary: "A magnificent classical South Indian panel painting distinguished by high-relief gesso ornamentation, lustrous 22-karat gold foil embossing, and sparkling uncut gemstones framing the infant butter-thief Krishna.",
    historicalContext: "Evolved in the 17th-18th centuries under the Thanjavur Nayakas and Marathas (specifically King Serfoji II), combining classical Chola iconography with Telugu artist guilds (Raju community) and Maratha royal opulence.",
    artisticSignificance: "Renowned for their glittering optical presence in dark temple sanctums. Under flickering oil lamps, the embossed pure gold foil and faceted glass/precious stones catch light dynamically, giving the sacred icon an otherworldly, three-dimensional glow.",
    materialAndTechnique: "Traditional 'Palagai Padam': unyielding seasoned teak wood panel lined with cloth. A relief paste of unboiled limestone powder and gum arabic (Gesso / Sukka) is hand-piped to create raised pillars, canopies, and jewelry. 22-karat gold leaves are then burnished over the relief.",
    iconography: [
      "Infant Krishna (Navanitha Chora) seated upon a celestial throne holding a pot of freshly churned butter",
      "Grand ornate arch (Prabhavali) decorated with Yali motifs and peacocks",
      "Plump, porcelain-fair cheeks and large expressive almond eyes characteristic of South Indian devotional iconography",
      "Heavy gold crowns, armlets, and anklets glistening with embedded red and green gems"
    ],
    curatorNotes: "Tanjore paintings are made to last centuries without fading because the pure gold leaf never oxidizes or tarnishes, and the natural mineral binders fuse permanently with the seasoned teak wood foundation.",
    keyThemes: ["Tanjore Gilded Art", "22k Gold Foil", "Gesso Relief", "Devotional Iconography"],
    academicCO: "CO1: Historic Artifact Analysis & Timeline Chronology"
  },
  {
    id: "warli-tarpa-dance",
    title: "Warli Tribal Tarpa Dance & Ritual Canvas",
    hindiTitle: "वारली आदिम तारपा नृत्य",
    era: "Folk & Living Indigenous Heritage",
    periodLabel: "Harmonic Continuity of Tribal Cosmology",
    dateRange: "Antiquity to Present (Living Continuum)",
    approxYear: 1950,
    region: "North Sahyadri Range, Maharashtra (Palghar)",
    currentLocation: "National Crafts Museum, New Delhi & Dahanu Tribal Centers",
    medium: "Rice paste, water, and acacia gum on cow-dung treated terracotta mud cloth",
    dimensions: "120 cm × 100 cm",
    discoveredAt: "Practiced by the indigenous Warli tribe since the 10th century CE; popularized globally by Jivya Soma Mashe",
    imageUrl: "/artifacts/warli-art.jpg",
    modelType: "terracotta-relief",
    colorPalette: {
      primary: "#593122",
      secondary: "#8C4F3B",
      accent: "#FAF4EB",
      border: "#9E6247",
    },
    summary: "A celebration of life, harvest, and sacred cosmic unity, rendered using elemental geometric shapes—circles, triangles, and squares—embodying an unbroken ten-century tribal art tradition.",
    historicalContext: "While documented formally in the late 20th century by legendary master artist Jivya Soma Mashe, the Warli visual language is believed to trace back directly to prehistoric Mesolithic rock cave art (like Bhimbetka, 8000 BCE). It is created by women (Suhasinis) during weddings and harvest festivals.",
    artisticSignificance: "Warli does not depict deities with mythological hierarchies; instead, it venerates Mother Nature (Dharti Ma / Palaghata). The graphic vocabulary uses three basic shapes: the circle (representing the sun and moon), the triangle (derived from mountains and trees), and two tip-to-tip triangles representing a human body balance.",
    materialAndTechnique: "Walls are prepared with a mixture of cow dung, red soil (Gerua), and mud. The pigment is pure white paste made from ground raw rice flour mixed with natural acacia tree gum and water. Applied with a chewed bamboo twig brush.",
    iconography: [
      "Central Tarpa player playing the sacred trumpet-like wind instrument made of gourd and bamboo",
      "Spiral of dancing men and women holding hands, moving counter-clockwise like the circle of life and seasons",
      "Surrounding agrarian motifs: bullock carts, harvesting men, sickle holders, birds, and palm trees",
      "Geometric human figures composed of two opposing triangles symbolizing physical and cosmic balance"
    ],
    curatorNotes: "Jivya Soma Mashe famously stated: 'There are players, singers, and dancers, but painting is our voice. We do not copy; we translate life onto the mud.' Warli stands as living proof of Indian art's democratic, non-courtly roots.",
    keyThemes: ["Tribal Folk Art", "Sacred Geometry", "Tarpa Dance", "Nature Cosmology"],
    academicCO: "CO1: Historic Artifact Analysis & Timeline Chronology"
  }
];

export const HISTORICAL_PERIODS = [
  {
    id: "all",
    label: "Full Chronology",
    sublabel: "5000 Years",
    eraCount: 8
  },
  {
    id: "proto-historic",
    label: "Proto-Historic & Imperial",
    sublabel: "2500 BCE – 3rd C. BCE",
    eraCount: 2
  },
  {
    id: "classical",
    label: "Classical & Trans-Cultural",
    sublabel: "1st C. CE – 6th C. CE",
    eraCount: 2
  },
  {
    id: "medieval",
    label: "Medieval Dravidian & Mughal",
    sublabel: "10th C. CE – 18th C. CE",
    eraCount: 2
  },
  {
    id: "folk-living",
    label: "Sacred Gilded & Folk",
    sublabel: "18th C. CE – Living Tradition",
    eraCount: 2
  }
];
