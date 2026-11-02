export type ObjectId = 'aura' | 'sola' | 'memento' | 'nest' | 'mycel' | 'orbit';

export type ClassificationCategory =
  | 'All'
  | 'Environmental Intelligence'
  | 'Energy & Materials'
  | 'Spatial & Cognitive'
  | 'Adaptive Architecture'
  | 'Urban Mobility';

export interface ObjectComponentPart {
  code: string;
  name: string;
  material: string;
  role: string;
}

export interface SpeculativeObject {
  id: ObjectId;
  number: string; // e.g., "001"
  accessionCode: string; // e.g., "ACC. 2031.01.AURA"
  title: string; // e.g., "AURA"
  subtitle: string; // e.g., "AN ATMOSPHERE, DESIGNED AROUND YOU."
  concept: string; // e.g., "Personal atmospheric intelligence."
  description: string;
  longEditorial: string;
  classification: Exclude<ClassificationCategory, 'All'>;
  origin: string;
  status: string;
  eraYear: 2030 | 2035 | 2045;
  dimensions: string;
  mass: string;
  operatingEnvelope: string;
  visualPersonality: string;
  primaryColor: string;
  secondaryColor: string;
  materials: string[];
  imaginedApplications: string[];
  components: ObjectComponentPart[];
  cameraOffset: [number, number, number];
}

export const SPECULATIVE_OBJECTS: SpeculativeObject[] = [
  {
    id: 'aura',
    number: '001',
    accessionCode: 'ACC. 2031.01.AU',
    title: 'AURA',
    subtitle: 'AN ATMOSPHERE, DESIGNED AROUND YOU.',
    concept: 'Personal atmospheric intelligence.',
    description:
      'An imagined device that adapts the atmosphere of your immediate environment, creating an invisible layer of personal environmental intelligence.',
    longEditorial:
      'Rather than conditioning entire architectural volumes at high energetic cost, AURA establishes a localized two-meter micro-climate envelope. An acoustically levitated borosilicate containment vessel houses a phase-tuned photonic core that regulates particulate ionization, circadian spectral balance, and thermal radiant gradients in real time.',
    classification: 'Environmental Intelligence',
    origin: 'Speculative Future Research',
    status: 'Concept 01',
    eraYear: 2030,
    dimensions: 'Ø 24.8 cm × 28.4 cm',
    mass: '1.42 kg (suspended)',
    operatingEnvelope: '2.4 m radial atmospheric boundary',
    visualPersonality: 'Soft, organic, calm and intelligent.',
    primaryColor: '#77E8F2',
    secondaryColor: '#D9B67A',
    materials: [
      'Acoustically formed borosilicate glass shell',
      'Anodized titanium equatorial gimbal rings',
      'Photonic aerogel luminescence core',
      'Micro-perforated ceramic transducer base',
    ],
    imaginedApplications: [
      'Circadian light and air synthesis in high-density urban dwellings',
      'Localized allergen and particulate neutralization envelope',
      'Shared acoustic and thermal zoning in open studios without partitions',
    ],
    components: [
      {
        code: 'PT-01',
        name: 'Outer Borosilicate Containment',
        material: 'Vapor-deposited optical silica',
        role: 'Refracts internal photonic emission while guiding laminar airflow.',
      },
      {
        code: 'PT-02',
        name: 'Bi-Axial Gyroscopic Resonator',
        material: 'Brushed Grade-5 Titanium',
        role: 'Maintains silent magnetic suspension and directional ion dispersion.',
      },
      {
        code: 'PT-03',
        name: 'Luminous Aerogel Nucleus',
        material: 'Doped silica aerogel lattice',
        role: 'Modulates color temperature and negative ion equilibrium.',
      },
    ],
    cameraOffset: [-7.5, 0.4, 0],
  },
  {
    id: 'sola',
    number: '002',
    accessionCode: 'ACC. 2032.04.SO',
    title: 'SOLA',
    subtitle: 'LIGHT BECOMES A WOVEN TEXTILE.',
    concept: 'Living solar fabric.',
    description:
      'A speculative material that gathers and stores energy through adaptive, flexible surfaces.',
    longEditorial:
      'SOLA reimagines photovoltaics not as rigid silicon wafers bolted onto roofs, but as a supple, heliotropic textile. Woven from perovskite-coated optical filaments and shape-memory nitinol threads, the surface ripples imperceptibly to track diffuse sky radiation while storing harvested charge directly within its structural carbon-yarn weft.',
    classification: 'Energy & Materials',
    origin: 'Photonic Textile Laboratory',
    status: 'Concept 02',
    eraYear: 2030,
    dimensions: '140.0 cm × 95.0 cm × 0.4 cm',
    mass: '0.68 kg / m²',
    operatingEnvelope: '38.4% multi-spectrum conversion efficiency',
    visualPersonality: 'Fluid, elegant and energetic.',
    primaryColor: '#D9B67A',
    secondaryColor: '#77E8F2',
    materials: [
      'Perovskite-sheathed quartz optical fibers',
      'Shape-memory nitinol actuator warp threads',
      'Graphene supercapacitor backing weave',
      'Self-cleaning fluoropolymer micro-coating',
    ],
    imaginedApplications: [
      'Architectural tension canopies that harvest ambient twilight',
      'Kinetic facade curtains that shade interiors while powering building grids',
      'Autonomous expedition shelters with zero external battery bulk',
    ],
    components: [
      {
        code: 'SL-01',
        name: 'Heliotropic Wave Membrane',
        material: 'Woven perovskite-quartz filament',
        role: 'Deforms continuously to maximize photon capture angle.',
      },
      {
        code: 'SL-02',
        name: 'Conductive Bus Spine',
        material: 'Copper-indium-gallium bus ribbons',
        role: 'Channels harvested micro-currents to perimeter anchor nodes.',
      },
      {
        code: 'SL-03',
        name: 'Tension Suspension Frame',
        material: 'Anodized billet aluminum',
        role: 'Anchors the living membrane in architectural equilibrium.',
      },
    ],
    cameraOffset: [-4.5, -0.3, -1.2],
  },
  {
    id: 'memento',
    number: '003',
    accessionCode: 'ACC. 2036.09.ME',
    title: 'MEMENTO',
    subtitle: 'ARCHITECTURE OF RECALLED TIME.',
    concept: 'Spatial memory architecture.',
    description:
      'An imagined system that translates memories into interactive spatial compositions.',
    longEditorial:
      'Moving beyond flat photographic archives, MEMENTO encodes biometric, acoustic, and lidar fragments of lived moments into suspended refractive strata. Each translucent quartz lamina holds a volumetric slice of space and sound; when aligned along the central optical axis, the layers reconstruct an inhabitable light-field of a remembered place.',
    classification: 'Spatial & Cognitive',
    origin: 'Temporal Archive Institute',
    status: 'Concept 03',
    eraYear: 2035,
    dimensions: '42.0 cm × 42.0 cm × 56.0 cm',
    mass: '3.85 kg',
    operatingEnvelope: '128 femtosecond holographic phase lock',
    visualPersonality: 'Emotional, abstract and atmospheric.',
    primaryColor: '#A9B4C2',
    secondaryColor: '#77E8F2',
    materials: [
      'Femtosecond-etched fused quartz plates',
      'Electro-optic liquid crystal refractive prisms',
      'Brushed platinum-iridium alignment rails',
      'Dielectric beam-splitting mirror array',
    ],
    imaginedApplications: [
      'Multi-generational domestic archives replacing flat screens',
      'Spatial preservation of vanishing ecological and cultural sites',
      'Tactile spatial composition for architectural and acoustic recall',
    ],
    components: [
      {
        code: 'MM-01',
        name: 'Refractive Memory Strata',
        material: 'Nanostructured fused silica glass',
        role: 'Stores volumetric light-field interference patterns indefinitely.',
      },
      {
        code: 'MM-02',
        name: 'Prismatic Phase Core',
        material: 'High-IOR optical flint crystal',
        role: 'Projects coherent laser planes through suspended glass fragments.',
      },
      {
        code: 'MM-03',
        name: 'Harmonic Alignment Frame',
        material: 'Machined platinum-alloy',
        role: 'Translates manual rotation into chronological scrubbing.',
      },
    ],
    cameraOffset: [-1.5, 0.5, -0.5],
  },
  {
    id: 'nest',
    number: '004',
    accessionCode: 'ACC. 2037.11.NE',
    title: 'NEST',
    subtitle: 'HABITAT IN CONTINUOUS EQUILIBRIUM.',
    concept: 'Adaptive living architecture.',
    description:
      'A speculative architecture that changes its physical configuration in response to environmental conditions.',
    longEditorial:
      'NEST rejects static load-bearing walls in favor of a kinetic reciprocal lattice. Composed of interlocking carbon-basalt voxels and pneumatic tendon joints, the structure contracts into an insulated aerodynamic shell during extreme thermal drops and unfolds into porous, daylight-harvesting cantilevers during temperate hours.',
    classification: 'Adaptive Architecture',
    origin: 'Kinetic Habitat Collective',
    status: 'Concept 04',
    eraYear: 2035,
    dimensions: 'Modular 1:20 Structural Scale Model (64.0 cm³)',
    mass: '6.10 kg (scale assembly)',
    operatingEnvelope: '-40°C to +55°C autonomous morphing range',
    visualPersonality: 'Structural, precise and mechanical.',
    primaryColor: '#D9B67A',
    secondaryColor: '#A9B4C2',
    materials: [
      'Extruded basalt-carbon composite struts',
      'Shape-memory alloy rotary hinges',
      'Electrochromic aerogel glazing cassettes',
      'Sintered titanium foundation nodes',
    ],
    imaginedApplications: [
      'Climate-resilient housing in rapidly shifting coastal and arid zones',
      'Reconfigurable civic pavilions that adapt to seasonal occupancy',
      'Zero-foundation modular research stations in fragile biomes',
    ],
    components: [
      {
        code: 'NS-01',
        name: 'Reciprocal Outer Louver Cage',
        material: 'Sintered basalt-carbon composite',
        role: 'Articulates aperture geometry to regulate wind load and solar gain.',
      },
      {
        code: 'NS-02',
        name: 'Pneumatic Tensegrity Core',
        material: 'Brushed titanium & nitinol cables',
        role: 'Distributes structural stress dynamically across shifting nodes.',
      },
      {
        code: 'NS-03',
        name: 'Thermal Core Habitation Pod',
        material: 'Translucent aerogel polycarbonate',
        role: 'Maintains a serene interior sanctuary regardless of exterior climate.',
      },
    ],
    cameraOffset: [1.5, -0.2, -0.8],
  },
  {
    id: 'mycel',
    number: '005',
    accessionCode: 'ACC. 2044.02.MY',
    title: 'MYCEL',
    subtitle: 'GROWN, NOT MANUFACTURED.',
    concept: 'Intelligent organic materials.',
    description:
      'An exploration of biological materials that grow into functional architectural and industrial structures.',
    longEditorial:
      'MYCEL demonstrates programmable morphogenesis: engineered fungal hyphae guided by weak bio-electric fields and bioluminescent nutrient channels. Rather than subtractive milling or high-heat smelting, structural trusses self-assemble at ambient temperature, depositing mineralized chitin along exact principal stress trajectories.',
    classification: 'Energy & Materials',
    origin: 'Synthetic Morphogenesis Lab',
    status: 'Concept 05',
    eraYear: 2045,
    dimensions: '52.0 cm × 38.0 cm × 49.0 cm',
    mass: '1.15 kg (mineralized dry state)',
    operatingEnvelope: 'Self-healing up to 14 MPa compressive load',
    visualPersonality: 'Organic, natural and complex.',
    primaryColor: '#77E8F2',
    secondaryColor: '#D9B67A',
    materials: [
      'Mineralized chitin-mycelium structural matrix',
      'Bioluminescent luciferin vascular micro-tubules',
      'Conductive melanin neural-signaling fibers',
      'Vitrified calcium-silicate root base',
    ],
    imaginedApplications: [
      'Self-repairing bridge trusses and acoustic architectural vaults',
      'Fully biodegradable industrial enclosures with embedded sensing',
      'Carbon-negative coastal wave-attenuation reefs grown in situ',
    ],
    components: [
      {
        code: 'MC-01',
        name: 'Trabecular Branching Canopy',
        material: 'Calcified mycelial biopolymer',
        role: 'Follows bone-like minimum-weight structural force lines.',
      },
      {
        code: 'MC-02',
        name: 'Vascular Nutrient Filaments',
        material: 'Translucent hydrogel micro-vessels',
        role: 'Circulates repair enzymes and emits diagnostic bioluminescence.',
      },
      {
        code: 'MC-03',
        name: 'Symbiotic Substrate Pedestal',
        material: 'Porous basaltic bio-ceramic',
        role: 'Anchors root networks and supplies trace mineral ions.',
      },
    ],
    cameraOffset: [4.5, 0.3, -1.0],
  },
  {
    id: 'orbit',
    number: '006',
    accessionCode: 'ACC. 2045.08.OR',
    title: 'ORBIT',
    subtitle: 'MOTION WITHOUT FRICTION.',
    concept: 'Personal micro-mobility.',
    description:
      'An imagined compact mobility system designed for the evolving requirements of future cities.',
    longEditorial:
      'Designed for post-automobile pedestrian megacities, ORBIT is an omnidirectional gyroscopic mobility sculpture. A spherical magnetic-flux drive core sits within twin counter-rotating titanium fairings, allowing effortless lateral gliding, vertical curb ascension, and cooperative flocking with public transit corridors.',
    classification: 'Urban Mobility',
    origin: 'Civic Kinematics Studio',
    status: 'Concept 06',
    eraYear: 2045,
    dimensions: '78.0 cm × 34.0 cm × 78.0 cm',
    mass: '11.4 kg',
    operatingEnvelope: '45 km/h peak urban glide · 140 km range',
    visualPersonality: 'Dynamic, engineered and futuristic.',
    primaryColor: '#A9B4C2',
    secondaryColor: '#77E8F2',
    materials: [
      'Hydroformed liquid-metal zirconium alloy shell',
      'Halbach-array magnetic levitation stator rings',
      'Graphene-elastomer omnidirectional traction sphere',
      'Sapphire optical LiDAR horizon band',
    ],
    imaginedApplications: [
      'Last-mile autonomous personal transit in car-free urban cores',
      'Adaptive assistive mobility that climbs stairs and uneven terrain',
      'Modular platooning pods that dock directly into high-speed rail cars',
    ],
    components: [
      {
        code: 'OR-01',
        name: 'Aerodynamic Monocoque Fairing',
        material: 'Polished zirconium bulk metallic glass',
        role: 'Houses固态 solid-state batteries and inductive coupling coils.',
      },
      {
        code: 'OR-02',
        name: 'Halbach Flux Stator Ring',
        material: 'Neodymium-titanium composite',
        role: 'Generates frictionless torque across three rotational axes.',
      },
      {
        code: 'OR-03',
        name: 'Omni-Traction Gyro Core',
        material: 'Textured carbon-elastomer sphere',
        role: 'Provides instantaneous 360-degree vector translation.',
      },
    ],
    cameraOffset: [7.5, -0.1, 0],
  },
];

export const CLASSIFICATION_CATEGORIES: ClassificationCategory[] = [
  'All',
  'Environmental Intelligence',
  'Energy & Materials',
  'Spatial & Cognitive',
  'Adaptive Architecture',
  'Urban Mobility',
];
