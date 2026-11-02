import { ObjectId } from './objects';

export interface TimelineEra {
  year: 2030 | 2035 | 2045;
  code: string;
  title: string;
  subtitle: string;
  summary: string;
  editorialNarrative: string;
  keyShift: string;
  metrics: {
    label: string;
    value: string;
    context: string;
  }[];
  milestones: {
    yearLabel: string;
    heading: string;
    detail: string;
  }[];
  linkedObjectIds: ObjectId[];
  atmosphere: {
    accentHex: string;
    secondaryHex: string;
    fogDensity: number;
    ringSpeed: number;
    geometryMode: 'transition' | 'reconstruction' | 'new-normal';
  };
}

export const TIMELINE_ERAS: TimelineEra[] = [
  {
    year: 2030,
    code: 'ERA 01 · 2030',
    title: 'THE TRANSITION',
    subtitle: 'Early experiments, new materials and emerging intelligence.',
    summary:
      'Technology retreats from visible screens into responsive surfaces, localized micro-climates, and energy-harvesting textiles.',
    editorialNarrative:
      'The first threshold begins when computation ceases to demand constant visual attention. Rigid silicon gives way to pliable perovskite weaves and quiet atmospheric fields that sense human presence through thermal and acoustic equilibrium rather than invasive cameras.',
    keyShift: 'From rigid hardware to ambient, energy-positive surfaces',
    metrics: [
      {
        label: 'Ambient Energy Harvesting',
        value: '38.4%',
        context: 'Multi-spectrum indoor & diffuse twilight conversion in woven textiles',
      },
      {
        label: 'Thermal Envelope Reduction',
        value: '-64.0%',
        context: 'HVAC energy saved via personal 2.4m micro-climate zoning',
      },
      {
        label: 'Material Mass Index',
        value: '0.68 kg/m²',
        context: 'Shift from structural glass panels to active tension membranes',
      },
    ],
    milestones: [
      {
        yearLabel: '2029 Q4',
        heading: 'Acousto-Fluidic Containment',
        detail: 'First silent residential ion-lattice fields replace mechanical HEPA filtration.',
      },
      {
        yearLabel: '2030 Q2',
        heading: 'Heliotropic Architectural Weaves',
        detail: 'Tensioned solar textiles achieve grid parity with rooftop monocrystalline arrays.',
      },
      {
        yearLabel: '2031 Q3',
        heading: 'Zero-Screen Domestic Interfaces',
        detail: 'Spatial light refraction replaces emissive wall displays in experimental habitats.',
      },
    ],
    linkedObjectIds: ['aura', 'sola'],
    atmosphere: {
      accentHex: '#77E8F2',
      secondaryHex: '#A9B4C2',
      fogDensity: 0.022,
      ringSpeed: 0.35,
      geometryMode: 'transition',
    },
  },
  {
    year: 2035,
    code: 'ERA 02 · 2035',
    title: 'THE RECONSTRUCTION',
    subtitle: 'New approaches to mobility, architecture and human interaction.',
    summary:
      'Static buildings and archival media dissolve into kinetic habitats and volumetric spatial memory.',
    editorialNarrative:
      'By 2035, cities confront climate volatility not with thicker concrete walls, but with structures that breathe, contract, and reconfigure. Simultaneously, human memory and cultural preservation step out of two-dimensional files into physical, refractive light-field sculptures.',
    keyShift: 'From static monuments to kinetic, adaptive structures',
    metrics: [
      {
        label: 'Structural Reconfiguration',
        value: '180 sec',
        context: 'Full facade aperture transition during extreme thermal or wind events',
      },
      {
        label: 'Optical Archive Longevity',
        value: '10,000 yr',
        context: 'Femtosecond-etched fused silica strata with zero bit-rot degradation',
      },
      {
        label: 'Embodied Carbon Offset',
        value: '-78.5%',
        context: 'Reciprocal basalt-carbon lattices vs. conventional poured concrete cores',
      },
    ],
    milestones: [
      {
        yearLabel: '2034 Q1',
        heading: 'Femtosecond Quartz Domesticity',
        detail: 'Physical holographic lamina archives enter cultural institutions and homes.',
      },
      {
        yearLabel: '2035 Q3',
        heading: 'Reciprocal Tensegrity Codes',
        detail: 'Municipal building codes ratify autonomous morphing envelopes in 14 megacities.',
      },
      {
        yearLabel: '2037 Q2',
        heading: 'Atmospheric Civic Commons',
        detail: 'Public plazas deploy adaptive canopies that harvest storm kinetic energy.',
      },
    ],
    linkedObjectIds: ['memento', 'nest'],
    atmosphere: {
      accentHex: '#D9B67A',
      secondaryHex: '#77E8F2',
      fogDensity: 0.018,
      ringSpeed: 0.55,
      geometryMode: 'reconstruction',
    },
  },
  {
    year: 2045,
    code: 'ERA 03 · 2045',
    title: 'THE NEW NORMAL',
    subtitle: 'A speculative future where technologies once considered impossible become part of everyday life.',
    summary:
      'Biological morphogenesis and frictionless magnetic kinematics converge into a quiet, regenerative civic ecology.',
    editorialNarrative:
      'In 2045, the boundary between grown organism and engineered machine becomes an anachronism. Infrastructure is cultivated from self-healing mineralized mycelium, while personal transit glides through pedestrian forests on silent omnidirectional magnetic fields.',
    keyShift: 'From extractive manufacturing to grown & frictionless systems',
    metrics: [
      {
        label: 'Biogenic Self-Repair Rate',
        value: '99.2%',
        context: 'Autonomous micro-fracture sealing in calcified mycelial structural vaults',
      },
      {
        label: 'Urban Transit Footprint',
        value: '0.26 m²',
        context: 'Spatial footprint of gyroscopic micro-mobility vs. legacy passenger vehicles',
      },
      {
        label: 'Industrial Smelting Demand',
        value: '-91.0%',
        context: 'Ambient-temperature biological synthesis replacing high-heat metallurgy',
      },
    ],
    milestones: [
      {
        yearLabel: '2042 Q2',
        heading: 'Programmable Hyphal Trusses',
        detail: 'First self-grown municipal bridge span cultivated in 21 days at ambient temperature.',
      },
      {
        yearLabel: '2044 Q4',
        heading: 'Halbach Pedestrian Corridors',
        detail: 'Inner-city ring roads converted into magnetic-assist botanical promenades.',
      },
      {
        yearLabel: '2045 Q3',
        heading: 'Symbiotic Material Standard',
        detail: 'Every manufactured object carries an active biological decomposition and reuse cycle.',
      },
    ],
    linkedObjectIds: ['mycel', 'orbit'],
    atmosphere: {
      accentHex: '#77E8F2',
      secondaryHex: '#D9B67A',
      fogDensity: 0.015,
      ringSpeed: 0.75,
      geometryMode: 'new-normal',
    },
  },
];
