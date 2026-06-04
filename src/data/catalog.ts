import clutchImg from "@/assets/part-clutch.jpg";
import brakeImg from "@/assets/part-brakepad.jpg";
import oilImg from "@/assets/part-oilfilter.jpg";
import fuelImg from "@/assets/part-fuelpump.jpg";
import shockImg from "@/assets/part-shock.jpg";
import radImg from "@/assets/part-radiator.jpg";

export type Vehicle = {
  slug: string;
  name: string;
  brand: string;
  type: "Commercial" | "Passenger";
  tagline: string;
};

export const vehicles: Vehicle[] = [
  { slug: "tata-ace", name: "Tata Ace", brand: "Tata", type: "Commercial", tagline: "Sri Lanka's most trusted mini truck" },
  { slug: "tata-super-ace", name: "Tata Super Ace", brand: "Tata", type: "Commercial", tagline: "Heavy-duty workhorse for businesses" },
  { slug: "tata-nano", name: "Tata Nano", brand: "Tata", type: "Passenger", tagline: "Compact city car parts in stock" },
  { slug: "mahindra-maxximo", name: "Mahindra Maxximo", brand: "Mahindra", type: "Commercial", tagline: "Reliable mini-truck spare support" },
  { slug: "mahindra-scorpio", name: "Mahindra Scorpio", brand: "Mahindra", type: "Passenger", tagline: "SUV parts and accessories" },
  { slug: "maruti-alto", name: "Maruti Alto", brand: "Maruti", type: "Passenger", tagline: "Affordable parts for daily drivers" },
  { slug: "maruti-suzuki", name: "Maruti Suzuki", brand: "Maruti", type: "Passenger", tagline: "Wagon R, Swift, Celerio & more" },
  { slug: "nissan", name: "Nissan", brand: "Nissan", type: "Passenger", tagline: "Sunny, March, Caravan parts" },
  { slug: "mitsubishi", name: "Mitsubishi", brand: "Mitsubishi", type: "Passenger", tagline: "Lancer, Montero & Canter range" },
  { slug: "isuzu", name: "Isuzu", brand: "Isuzu", type: "Commercial", tagline: "Heavy commercial parts specialists" },
  { slug: "mazda", name: "Mazda", brand: "Mazda", type: "Passenger", tagline: "Familia, Demio and pickup spares" },
];

export type Part = {
  id: string;
  name: string;
  partNumber: string;
  category: string;
  brand: string;
  compatible: string[]; // vehicle slugs
  stock: "In Stock" | "Low Stock" | "Pre-Order";
  price?: number;
  image: string;
  description: string;
  specs: { label: string; value: string }[];
};

export const categories = [
  "Engine",
  "Brakes",
  "Filters",
  "Suspension",
  "Cooling",
  "Fuel System",
  "Electrical",
  "Transmission",
  "Body",
];

const img = (k: string) => {
  const m: Record<string, string> = {
    clutch: clutchImg, brake: brakeImg, oil: oilImg, fuel: fuelImg, shock: shockImg, rad: radImg,
  };
  return m[k];
};

export const parts: Part[] = [
  { id: "ace-clutch-001", name: "Clutch Pressure Plate Assembly", partNumber: "HK-CL-2410", category: "Transmission", brand: "Luk Genuine", compatible: ["tata-ace", "tata-super-ace"], stock: "In Stock", price: 18500, image: img("clutch"),
    description: "OEM-grade clutch pressure plate engineered for Tata Ace and Super Ace drivetrains. Built to handle daily commercial loads with consistent pedal feel and long service life.",
    specs: [{label:"Diameter",value:"215 mm"},{label:"Spline Count",value:"21"},{label:"Material",value:"Forged steel / sintered facing"},{label:"Warranty",value:"6 months"}] },
  { id: "ace-brake-002", name: "Front Brake Pad Set", partNumber: "HK-BP-1180", category: "Brakes", brand: "Bosch", compatible: ["tata-ace", "mahindra-maxximo"], stock: "In Stock", price: 4250, image: img("brake"),
    description: "Semi-metallic front brake pads with anti-noise shim. Tested for tropical conditions and dusty Sri Lankan roads.",
    specs: [{label:"Position",value:"Front Axle"},{label:"Thickness",value:"17.5 mm"},{label:"Pad Compound",value:"Semi-metallic"},{label:"Pack",value:"Set of 4"}] },
  { id: "ace-oil-003", name: "Engine Oil Filter", partNumber: "HK-OF-0307", category: "Filters", brand: "Mann-Filter", compatible: ["tata-ace","tata-super-ace","tata-nano"], stock: "In Stock", price: 950, image: img("oil"),
    description: "Spin-on oil filter with high-capacity filter media. Recommended replacement every 5,000 km.",
    specs: [{label:"Thread",value:"M20 x 1.5"},{label:"Height",value:"95 mm"},{label:"Bypass Valve",value:"Yes"},{label:"Anti-Drain",value:"Yes"}] },
  { id: "scorpio-fuel-004", name: "Electric Fuel Pump Module", partNumber: "HK-FP-5520", category: "Fuel System", brand: "Delphi", compatible: ["mahindra-scorpio","mahindra-maxximo"], stock: "Low Stock", price: 22500, image: img("fuel"),
    description: "Complete in-tank fuel pump module with pressure regulator and fuel level sender unit. Direct replacement for OE part.",
    specs: [{label:"Voltage",value:"12V DC"},{label:"Pressure",value:"3.8 bar"},{label:"Connector",value:"4-pin"},{label:"Flow Rate",value:"110 L/h"}] },
  { id: "alto-shock-005", name: "Rear Shock Absorber", partNumber: "HK-SA-7715", category: "Suspension", brand: "KYB", compatible: ["maruti-alto","maruti-suzuki"], stock: "In Stock", price: 7800, image: img("shock"),
    description: "Gas-charged rear shock absorber tuned for Maruti Alto. Provides controlled damping for both city and highway driving.",
    specs: [{label:"Type",value:"Twin-tube gas"},{label:"Length (ext.)",value:"485 mm"},{label:"Mounting",value:"Eye / Stud"},{label:"Pack",value:"Single unit"}] },
  { id: "tata-rad-006", name: "Aluminium Radiator Assembly", partNumber: "HK-RD-3380", category: "Cooling", brand: "Denso", compatible: ["tata-ace","tata-super-ace"], stock: "In Stock", price: 28500, image: img("rad"),
    description: "Brazed aluminium core radiator with plastic tanks. Direct fit replacement designed for hot, high-humidity conditions.",
    specs: [{label:"Core Size",value:"400 x 360 x 26 mm"},{label:"Inlet",value:"Top right"},{label:"Material",value:"Aluminium / PA66"},{label:"Cap Included",value:"Yes"}] },

  { id: "nano-brake-007", name: "Rear Brake Shoe Set", partNumber: "HK-BS-2204", category: "Brakes", brand: "Brembo", compatible: ["tata-nano","maruti-alto"], stock: "In Stock", price: 3450, image: img("brake"),
    description: "Drum brake shoe set with bonded lining. OE-equivalent fitment.",
    specs: [{label:"Drum Diameter",value:"180 mm"},{label:"Lining Width",value:"30 mm"},{label:"Pack",value:"4 pcs"},{label:"Position",value:"Rear"}] },
  { id: "scorpio-air-008", name: "Air Filter Element", partNumber: "HK-AF-1102", category: "Filters", brand: "Mann-Filter", compatible: ["mahindra-scorpio"], stock: "In Stock", price: 1850, image: img("oil"),
    description: "High-flow panel air filter for Mahindra Scorpio mHawk engine.",
    specs: [{label:"Length",value:"275 mm"},{label:"Width",value:"165 mm"},{label:"Height",value:"38 mm"},{label:"Service",value:"15,000 km"}] },
  { id: "max-clutch-009", name: "Clutch Disc Plate", partNumber: "HK-CD-2455", category: "Transmission", brand: "Valeo", compatible: ["mahindra-maxximo"], stock: "In Stock", price: 12500, image: img("clutch"),
    description: "Friction clutch disc for Mahindra Maxximo, organic facing for smooth engagement.",
    specs: [{label:"Diameter",value:"200 mm"},{label:"Splines",value:"22"},{label:"Hub Type",value:"Sprung"},{label:"Warranty",value:"6 months"}] },
  { id: "alto-oil-010", name: "Oil Filter Cartridge", partNumber: "HK-OF-0992", category: "Filters", brand: "Bosch", compatible: ["maruti-alto","maruti-suzuki"], stock: "In Stock", price: 720, image: img("oil"),
    description: "Genuine oil filter for K-series Maruti engines.",
    specs: [{label:"Thread",value:"M20 x 1.5"},{label:"Height",value:"68 mm"},{label:"Bypass Valve",value:"Yes"},{label:"Pack",value:"1"}] },
  { id: "nissan-shock-011", name: "Front Strut Assembly", partNumber: "HK-ST-6612", category: "Suspension", brand: "KYB", compatible: ["nissan"], stock: "Low Stock", price: 19500, image: img("shock"),
    description: "Complete MacPherson strut for Nissan Sunny / March front axle.",
    specs: [{label:"Length",value:"540 mm"},{label:"Spring Rate",value:"21 N/mm"},{label:"Type",value:"Gas pressure"},{label:"Pack",value:"Single"}] },
  { id: "iso-fuel-012", name: "Diesel Fuel Filter", partNumber: "HK-FF-4502", category: "Fuel System", brand: "Bosch", compatible: ["isuzu","mitsubishi"], stock: "In Stock", price: 2750, image: img("oil"),
    description: "Heavy-duty diesel fuel filter with water separator for Isuzu and Mitsubishi commercial engines.",
    specs: [{label:"Thread",value:"M14 x 1.5"},{label:"Height",value:"165 mm"},{label:"Drain",value:"Manual"},{label:"Service",value:"20,000 km"}] },
  { id: "mazda-rad-013", name: "Radiator Cooling Fan", partNumber: "HK-RF-7720", category: "Cooling", brand: "Denso", compatible: ["mazda","nissan"], stock: "In Stock", price: 14500, image: img("rad"),
    description: "Electric radiator cooling fan assembly with shroud and motor.",
    specs: [{label:"Diameter",value:"320 mm"},{label:"Blades",value:"7"},{label:"Voltage",value:"12V"},{label:"Current",value:"9 A"}] },
  { id: "scorpio-brake-014", name: "Brake Disc Rotor", partNumber: "HK-BD-3315", category: "Brakes", brand: "Brembo", compatible: ["mahindra-scorpio"], stock: "In Stock", price: 9800, image: img("brake"),
    description: "Vented front brake disc rotor, machined for true balance.",
    specs: [{label:"Diameter",value:"280 mm"},{label:"Thickness",value:"24 mm"},{label:"PCD",value:"6 x 139.7"},{label:"Pack",value:"Single"}] },
  { id: "ace-shock-015", name: "Front Leaf Spring Assembly", partNumber: "HK-LS-8821", category: "Suspension", brand: "HK Motors", compatible: ["tata-ace","mahindra-maxximo"], stock: "In Stock", price: 16500, image: img("shock"),
    description: "Multi-leaf front spring pack for small commercial trucks. Heat-treated steel.",
    specs: [{label:"Leaves",value:"5"},{label:"Length",value:"920 mm"},{label:"Width",value:"60 mm"},{label:"Capacity",value:"1.2 ton"}] },
  { id: "mit-clutch-016", name: "Clutch Release Bearing", partNumber: "HK-RB-2208", category: "Transmission", brand: "SKF", compatible: ["mitsubishi","isuzu"], stock: "In Stock", price: 4200, image: img("clutch"),
    description: "Sealed clutch release bearing with hub. Long-life grease-packed.",
    specs: [{label:"Bore",value:"32 mm"},{label:"OD",value:"60 mm"},{label:"Height",value:"24 mm"},{label:"Seal",value:"Double-lip"}] },
  { id: "nissan-oil-017", name: "Cabin Air Filter", partNumber: "HK-CF-0455", category: "Filters", brand: "Mann-Filter", compatible: ["nissan","mazda"], stock: "In Stock", price: 1550, image: img("oil"),
    description: "Activated carbon cabin filter for cleaner air-conditioning airflow.",
    specs: [{label:"Length",value:"232 mm"},{label:"Width",value:"200 mm"},{label:"Height",value:"30 mm"},{label:"Type",value:"Carbon"}] },
  { id: "ace-fuel-018", name: "Fuel Injector Nozzle", partNumber: "HK-FN-5044", category: "Fuel System", brand: "Bosch", compatible: ["tata-ace","tata-super-ace","isuzu"], stock: "Pre-Order", price: 8500, image: img("fuel"),
    description: "Diesel injector nozzle calibrated for common-rail engines.",
    specs: [{label:"Spray Pattern",value:"6-hole"},{label:"Opening Pressure",value:"180 bar"},{label:"Coil Resistance",value:"0.4 Ω"},{label:"Body",value:"Hardened steel"}] },
  { id: "max-rad-019", name: "Radiator Hose Set", partNumber: "HK-RH-3399", category: "Cooling", brand: "Gates", compatible: ["mahindra-maxximo","mahindra-scorpio"], stock: "In Stock", price: 3850, image: img("rad"),
    description: "Upper and lower silicone-reinforced radiator hoses with clamps.",
    specs: [{label:"Material",value:"EPDM rubber"},{label:"Includes",value:"2 hoses + 4 clamps"},{label:"Bore",value:"38 mm"},{label:"Temp Range",value:"-40 to 125 °C"}] },
  { id: "alto-elec-020", name: "Starter Motor Assembly", partNumber: "HK-SM-9012", category: "Electrical", brand: "Denso", compatible: ["maruti-alto","maruti-suzuki"], stock: "In Stock", price: 17800, image: img("fuel"),
    description: "Reduction-gear starter motor for Maruti petrol engines.",
    specs: [{label:"Voltage",value:"12V"},{label:"Power",value:"0.9 kW"},{label:"Teeth",value:"9"},{label:"Rotation",value:"Clockwise"}] },
  { id: "scorpio-shock-021", name: "Rear Coil Spring", partNumber: "HK-CS-7745", category: "Suspension", brand: "KYB", compatible: ["mahindra-scorpio"], stock: "In Stock", price: 6500, image: img("shock"),
    description: "Heavy-duty rear coil spring for Mahindra Scorpio.",
    specs: [{label:"Wire Dia",value:"13.5 mm"},{label:"Free Length",value:"380 mm"},{label:"Coils",value:"7"},{label:"Pack",value:"Single"}] },
  { id: "mazda-brake-022", name: "Brake Master Cylinder", partNumber: "HK-MC-4480", category: "Brakes", brand: "TRW", compatible: ["mazda","nissan"], stock: "Low Stock", price: 13500, image: img("brake"),
    description: "Tandem brake master cylinder with reservoir.",
    specs: [{label:"Bore",value:"22.2 mm"},{label:"Outlets",value:"2"},{label:"Reservoir",value:"Included"},{label:"Thread",value:"M10 x 1.0"}] },
  { id: "iso-clutch-023", name: "Clutch Master Cylinder", partNumber: "HK-CM-2290", category: "Transmission", brand: "Valeo", compatible: ["isuzu","mitsubishi"], stock: "In Stock", price: 9200, image: img("clutch"),
    description: "Hydraulic clutch master cylinder for commercial trucks.",
    specs: [{label:"Bore",value:"19 mm"},{label:"Stroke",value:"32 mm"},{label:"Material",value:"Aluminium"},{label:"Seal Kit",value:"Included"}] },
  { id: "nano-fuel-024", name: "Fuel Pressure Regulator", partNumber: "HK-PR-5588", category: "Fuel System", brand: "Delphi", compatible: ["tata-nano","maruti-alto"], stock: "In Stock", price: 4800, image: img("fuel"),
    description: "Vacuum-actuated fuel pressure regulator for petrol EFI systems.",
    specs: [{label:"Pressure",value:"3.0 bar"},{label:"Inlet",value:"6 mm"},{label:"Body",value:"Steel"},{label:"O-rings",value:"Viton"}] },
  { id: "mit-rad-025", name: "Thermostat with Housing", partNumber: "HK-TH-3360", category: "Cooling", brand: "Gates", compatible: ["mitsubishi","nissan","mazda"], stock: "In Stock", price: 3400, image: img("rad"),
    description: "Thermostat assembly with integrated housing and gasket.",
    specs: [{label:"Open Temp",value:"82 °C"},{label:"Material",value:"Brass / Plastic"},{label:"Gasket",value:"Included"},{label:"Sensor Port",value:"Yes"}] },
  { id: "tata-oil-026", name: "Transmission Oil Filter", partNumber: "HK-TF-0815", category: "Filters", brand: "Mann-Filter", compatible: ["tata-super-ace","mahindra-maxximo"], stock: "In Stock", price: 2100, image: img("oil"),
    description: "Magnetic transmission oil filter for gearbox protection.",
    specs: [{label:"Type",value:"In-line"},{label:"Length",value:"118 mm"},{label:"Inlet/Outlet",value:"3/8 in"},{label:"Magnet",value:"Yes"}] },
  { id: "scorpio-elec-027", name: "Alternator 12V 90A", partNumber: "HK-AL-9145", category: "Electrical", brand: "Bosch", compatible: ["mahindra-scorpio","tata-super-ace"], stock: "Low Stock", price: 24500, image: img("fuel"),
    description: "Heavy-duty 90A alternator with internal regulator.",
    specs: [{label:"Voltage",value:"12V"},{label:"Current",value:"90 A"},{label:"Pulley",value:"6-rib"},{label:"Rotation",value:"CW"}] },
  { id: "ace-body-028", name: "Headlamp Assembly (LH)", partNumber: "HK-HL-6610", category: "Body", brand: "HK Motors", compatible: ["tata-ace"], stock: "In Stock", price: 8900, image: img("rad"),
    description: "Left-hand side headlamp assembly with H4 bulb mount.",
    specs: [{label:"Side",value:"Driver (LH)"},{label:"Bulb",value:"H4"},{label:"Lens",value:"Polycarbonate"},{label:"Adjusters",value:"Included"}] },
  { id: "alto-body-029", name: "Side Mirror Assembly", partNumber: "HK-SM-1102", category: "Body", brand: "HK Motors", compatible: ["maruti-alto","maruti-suzuki"], stock: "In Stock", price: 3650, image: img("rad"),
    description: "Manual adjustable side mirror, paint-ready housing.",
    specs: [{label:"Side",value:"RH / LH available"},{label:"Adjustment",value:"Manual"},{label:"Glass",value:"Convex"},{label:"Mount",value:"Bolt-on"}] },
  { id: "iso-brake-030", name: "Brake Caliper Assembly", partNumber: "HK-CA-3380", category: "Brakes", brand: "TRW", compatible: ["isuzu","mahindra-scorpio"], stock: "In Stock", price: 21500, image: img("brake"),
    description: "Single-piston floating brake caliper, ready to install.",
    specs: [{label:"Piston Dia",value:"54 mm"},{label:"Side",value:"Front, both available"},{label:"Bleed Valve",value:"Yes"},{label:"Pads Included",value:"No"}] },
  { id: "ace-fuel-031", name: "Diesel Lift Pump", partNumber: "HK-LP-5012", category: "Fuel System", brand: "Bosch", compatible: ["tata-ace","tata-super-ace","mahindra-maxximo"], stock: "In Stock", price: 6400, image: img("fuel"),
    description: "Mechanical diesel lift pump with priming lever.",
    specs: [{label:"Type",value:"Mechanical"},{label:"Pressure",value:"0.3 bar"},{label:"Priming Lever",value:"Yes"},{label:"Gasket",value:"Included"}] },
  { id: "mit-elec-032", name: "Ignition Coil Pack", partNumber: "HK-IC-9088", category: "Electrical", brand: "Denso", compatible: ["mitsubishi","mazda"], stock: "In Stock", price: 7250, image: img("fuel"),
    description: "Pencil-type ignition coil for individual cylinder fitment.",
    specs: [{label:"Voltage",value:"12V"},{label:"Connector",value:"3-pin"},{label:"Resistance",value:"0.8 Ω primary"},{label:"Pack",value:"Single"}] },
];

export const findPart = (id: string) => parts.find((p) => p.id === id);
export const findVehicle = (slug: string) => vehicles.find((v) => v.slug === slug);
export const partsForVehicle = (slug: string) => parts.filter((p) => p.compatible.includes(slug));
