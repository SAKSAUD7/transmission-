// Comprehensive vehicle makes and models — covers all US-market cars
// Models load from Django API first (admin-managed), falling back to this static list.

export const CAR_MAKES = [
  "Acura","Alfa Romeo","Audi","BMW","Buick","Cadillac","Chevrolet",
  "Chrysler","Dodge","Ford","GMC","Honda","Hyundai","Infiniti",
  "Isuzu","Jaguar","Jeep","Kia","Land Rover","Lexus","Lincoln",
  "Mazda","Mercedes-Benz","Mercury","MINI","Mitsubishi","Nissan",
  "Oldsmobile","Plymouth","Pontiac","Porsche","Ram","Saturn",
  "Scion","Subaru","Suzuki","Toyota","Volkswagen","Volvo",
];

export const CAR_MODELS_BY_MAKE: Record<string, string[]> = {
  "Acura":        ["ILX","MDX","RDX","RLX","TL","TLX","TSX","ZDX"],
  "Alfa Romeo":   ["147","156","159","166","Brera","Giulia","Giulietta","GTV","MiTo","Spider","Stelvio","Tonale"],
  "Audi":         ["A3","A4","A5","A6","A7","A8","Q3","Q5","Q7","Q8","RS3","RS5","RS6","RS7","S3","S4","S5","S6","S7","S8","TT","e-tron"],
  "BMW":          ["1 Series","2 Series","3 Series","4 Series","5 Series","6 Series","7 Series","8 Series","M2","M3","M4","M5","M8","X1","X2","X3","X4","X5","X6","X7","Z3","Z4"],
  "Buick":        ["Century","Enclave","Encore","Encore GX","Envision","LaCrosse","LeSabre","Lucerne","Rainier","Regal","Rendezvous","Riviera","Skylark","Terraza","Verano"],
  "Cadillac":     ["ATS","CT4","CT5","CT6","CTS","DeVille","DTS","Eldorado","Escalade","Escalade ESV","SRX","STS","XTS","XT4","XT5","XT6"],
  "Chevrolet":    ["Astro","Avalanche","Blazer","Camaro","Caprice","Cavalier","Colorado","Corvette","Cruze","Equinox","Express","HHR","Impala","Malibu","Monte Carlo","S10","Silverado 1500","Silverado 2500","Silverado 3500","Sonic","Spark","Suburban","Tahoe","Tracker","TrailBlazer","Traverse","Trax","Volt"],
  "Chrysler":     ["200","300","300M","Aspen","Cirrus","Concorde","LHS","Pacifica","PT Cruiser","Sebring","Town & Country","Voyager"],
  "Dodge":        ["Avenger","Caliber","Caravan","Challenger","Charger","Dakota","Dart","Durango","Grand Caravan","Journey","Magnum","Neon","Nitro","Ram 1500","Ram 2500","Ram 3500","Stealth","Stratus","Viper"],
  "Ford":         ["Bronco","Bronco Sport","C-Max","Crown Victoria","E-150","E-250","E-350","Edge","EcoSport","Escape","Escort","Expedition","Explorer","F-150","F-250","F-350","F-450","Fiesta","Five Hundred","Flex","Focus","Freestar","Freestyle","Fusion","Maverick","Mustang","Puma","Ranger","Taurus","Transit","Windstar"],
  "GMC":          ["Acadia","Canyon","Envoy","Envoy XL","Jimmy","Safari","Sierra 1500","Sierra 2500","Sierra 3500","Sonoma","Suburban","Terrain","Yukon","Yukon XL"],
  "Honda":        ["Accord","Civic","Clarity","CR-V","CR-Z","Element","Fit","HR-V","Insight","Odyssey","Passport","Pilot","Ridgeline","S2000"],
  "Hyundai":      ["Accent","Azera","Elantra","Equus","Genesis","Genesis Coupe","Ioniq","Ioniq 5","Ioniq 6","Kona","Santa Cruz","Santa Fe","Sonata","Tiburon","Tucson","Veloster","Venue","Veracruz"],
  "Infiniti":     ["EX35","EX37","FX35","FX37","FX45","FX50","G25","G35","G37","I35","J30","JX35","M35","M45","M56","Q40","Q45","Q50","Q60","Q70","QX30","QX50","QX56","QX60","QX70","QX80"],
  "Isuzu":        ["Amigo","Ascender","Axiom","i-280","i-290","i-350","i-370","Rodeo","Rodeo Sport","Trooper","VehiCROSS"],
  "Jaguar":       ["E-Pace","F-Pace","F-Type","I-Pace","S-Type","X-Type","XE","XF","XJ","XJ8","XJL","XK","XKR"],
  "Jeep":         ["Cherokee","Commander","Compass","Gladiator","Grand Cherokee","Grand Cherokee L","Grand Cherokee 4xe","Liberty","Patriot","Renegade","Wrangler","Wrangler 4xe"],
  "Kia":          ["Cadenza","EV6","Forte","K5","Niro","Niro EV","Optima","Rio","Sedona","Seltos","Sorento","Soul","Sportage","Stinger","Telluride"],
  "Land Rover":   ["Defender","Discovery","Discovery Sport","Freelander","LR2","LR3","LR4","Range Rover","Range Rover Evoque","Range Rover Sport","Range Rover Velar"],
  "Lexus":        ["CT 200h","ES 250","ES 300","ES 350","GS 300","GS 350","GS 430","GX 460","GX 470","IS 250","IS 300","IS 350","LC 500","LS 400","LS 430","LS 460","LS 500","LX 470","LX 570","NX 200t","NX 300","RC 300","RC 350","RX 300","RX 330","RX 350","RX 400h","RX 450h","UX 200","UX 250h"],
  "Lincoln":      ["Aviator","Blackwood","Continental","Corsair","Mark LT","MKC","MKS","MKT","MKX","MKZ","Navigator","Navigator L","Town Car","Zephyr"],
  "Mazda":        ["CX-3","CX-30","CX-5","CX-7","CX-9","CX-50","MX-5 Miata","MAZDA2","MAZDA3","MAZDA5","MAZDA6","RX-7","RX-8","Tribute"],
  "Mercedes-Benz":["A-Class","AMG GT","AMG GT 4-Door","AMG GT Coupe","AMG GT Roadster","B-Class","C-Class","CLA","CLA AMG","CLK","CLS","E-Class","G-Class","GLA","GLB","GLC","GLC AMG","GLE","GLE AMG","GLS","GL-Class","ML-Class","R-Class","S-Class","SL","SLC","SLK","SLR","SLS AMG","Sprinter","V-Class"],
  "Mercury":      ["Cougar","Grand Marquis","Marauder","Mariner","Milan","Monterey","Montego","Mountaineer","Mystique","Sable","Topaz","Villager"],
  "MINI":         ["Clubman","Convertible","Countryman","Coupe","Hardtop 2-Door","Hardtop 4-Door","Paceman","Roadster"],
  "Mitsubishi":   ["3000GT","Eclipse","Eclipse Cross","Endeavor","Galant","Lancer","Lancer Evolution","Mirage","Montero","Montero Sport","Outlander","Outlander Sport","Raider"],
  "Nissan":       ["350Z","370Z","Altima","Armada","Cube","Frontier","GT-R","JUKE","LEAF","Maxima","Murano","NV1500","NV200","Pathfinder","Quest","Rogue","Rogue Sport","Sentra","Titan","Versa","Xterra"],
  "Oldsmobile":   ["Achieva","Alero","Aurora","Bravada","Cutlass","Cutlass Supreme","Intrigue","LSS","Silhouette"],
  "Plymouth":     ["Breeze","Grand Voyager","Neon","Prowler","Savoy","Voyager"],
  "Pontiac":      ["Aztek","Bonneville","Firebird","G3","G5","G6","G8","Grand Am","Grand Prix","GTO","Montana","Solstice","Sunfire","Torrent","Trans Am","Vibe"],
  "Porsche":      ["718 Boxster","718 Cayman","911","928","944","968","Cayenne","Cayenne S","Macan","Panamera","Taycan"],
  "Ram":          ["1500","1500 Classic","2500","3500","ProMaster","ProMaster City","ProMaster Rapid"],
  "Saturn":       ["Aura","Ion","L-Series","Outlook","Relay","S-Series","Sky","Vue"],
  "Scion":        ["FR-S","iA","iM","iQ","tC","xA","xB","xD"],
  "Subaru":       ["Ascent","BRZ","Crosstrek","Forester","Impreza","Legacy","Outback","Tribeca","WRX","WRX STI"],
  "Suzuki":       ["Aerio","Equator","Esteem","Forenza","Grand Vitara","Kizashi","Reno","Sidekick","Swift","SX4","Verona","Vitara","XL-7"],
  "Toyota":       ["4Runner","Avalon","C-HR","Camry","Corolla","FJ Cruiser","GR86","GR Corolla","GR Supra","Highlander","Land Cruiser","Matrix","Prius","Prius Prime","RAV4","RAV4 Prime","Sequoia","Sienna","Solara","Supra","Tacoma","Tundra","Venza","Yaris"],
  "Volkswagen":   ["Atlas","Atlas Cross Sport","Beetle","CC","EOS","Golf","Golf Alltrack","Golf GTI","Golf R","GTI","ID.4","Jetta","Jetta GLI","Passat","Phaeton","Routan","Taos","Tiguan","Touareg"],
  "Volvo":        ["C30","C40","C70","S40","S60","S60 Cross Country","S70","S80","S90","V40","V50","V60","V60 Cross Country","V70","V90","V90 Cross Country","XC40","XC60","XC70","XC90"],
};

export const YEARS = Array.from({ length: 36 }, (_, i) => String(2025 - i));

export const TRANSMISSION_TYPES = [
  "Automatic",
  "Manual / Standard",
  "CVT",
  "Semi-Automatic",
  "Dual-Clutch (DCT)",
  "Tiptronic",
  "Torque Converter",
  "4-Speed Automatic",
  "5-Speed Automatic",
  "6-Speed Automatic",
  "8-Speed Automatic",
  "10-Speed Automatic",
];

export const ENGINE_TYPES = [
  "4-Cylinder",
  "6-Cylinder (V6)",
  "8-Cylinder (V8)",
  "3-Cylinder",
  "5-Cylinder",
  "10-Cylinder (V10)",
  "12-Cylinder (V12)",
  "Diesel",
  "Hybrid",
  "Electric",
  "Turbocharged",
  "Supercharged",
];

export const AXLE_SHAFT_TYPES = [
  "Front Axle Shaft",
  "Rear Axle Shaft",
  "Left Axle Shaft",
  "Right Axle Shaft",
  "CV Axle",
  "Half Shaft",
  "Prop Shaft",
];

export const DRIVE_SHAFT_TYPES = [
  "Front Drive Shaft",
  "Rear Drive Shaft",
  "One-Piece Drive Shaft",
  "Two-Piece Drive Shaft",
  "Carbon Fiber Drive Shaft",
  "Aluminum Drive Shaft",
  "4WD / AWD Drive Shaft",
];

export const DIFFERENTIAL_TYPES = [
  "Front Differential",
  "Rear Differential",
  "Center Differential",
  "Limited Slip (LSD)",
  "Locking Differential",
  "Open Differential",
  "Posi-Traction",
  "Torsen Differential",
];

export const SPEEDOMETER_TYPES = [
  "Analog Speedometer",
  "Digital Speedometer",
  "Electronic (VSS) Speedometer",
  "Cable-Driven Speedometer",
  "Cluster Assembly",
  "GPS Speedometer",
];

export const THROTTLE_BODY_TYPES = [
  "Single Throttle Body",
  "Dual Throttle Body",
  "Electronic (ETC) Throttle Body",
  "Cable-Operated Throttle Body",
  "Fuel Injected Throttle Body",
  "Carbureted Throttle Body",
];

export const TRANSFER_CASE_TYPES = [
  "Chain-Driven Transfer Case",
  "Gear-Driven Transfer Case",
  "Manual Shift Transfer Case",
  "Electric Shift Transfer Case",
  "BW1354 Transfer Case",
  "BW4407 Transfer Case",
  "NP246 Transfer Case",
  "NP261 Transfer Case",
];

export const STEERING_RACK_TYPES = [
  "Power Steering Rack",
  "Manual Steering Rack",
  "Electric (EPS) Steering Rack",
  "Hydraulic Steering Rack",
  "Quick Ratio Steering Rack",
  "Variable Ratio Steering Rack",
];

export const INTAKE_MANIFOLD_TYPES = [
  "Upper Intake Manifold",
  "Lower Intake Manifold",
  "Aluminum Intake Manifold",
  "Composite Intake Manifold",
  "Performance Intake Manifold",
  "Stock OEM Intake Manifold",
  "Dual-Plane Intake Manifold",
];

export const STEERING_COLUMN_TYPES = [
  "Tilt Steering Column",
  "Telescoping Steering Column",
  "Fixed Steering Column",
  "Electric Steering Column",
  "Steering Column with Airbag",
  "Steering Column without Airbag",
  "Collapsible Steering Column",
];

export const SPINDLE_KNUCKLE_TYPES = [
  "Front Left Spindle Knuckle",
  "Front Right Spindle Knuckle",
  "Rear Left Spindle Knuckle",
  "Rear Right Spindle Knuckle",
  "2WD Spindle Knuckle",
  "4WD Spindle Knuckle",
];

export const AXLE_ASSEMBLY_TYPES = [
  "Front Axle Assembly",
  "Rear Axle Assembly",
  "Complete Axle Assembly",
  "Dana 30 Axle Assembly",
  "Dana 44 Axle Assembly",
  "8.8 Ford Axle Assembly",
  "12-Bolt Chevy Axle Assembly",
  "Sterling 10.5 Axle Assembly",
];

export const ABS_ASSEMBLY_TYPES = [
  "Front ABS Assembly",
  "Rear ABS Assembly",
  "Complete ABS Module",
  "ABS Pump & Motor",
  "ABS Control Module",
  "ABS Wheel Speed Sensor",
  "ABS Modulator Valve",
];

/** Convenience map: partSlug → type options array (used in LeadFormSection) */
export const PART_TYPE_OPTIONS: Record<string, string[]> = {
  "transmissions-for-sale":              TRANSMISSION_TYPES,
  "engines-for-sale":                    ENGINE_TYPES,
  "axle-shaft-for-sale":                 AXLE_SHAFT_TYPES,
  "drive-shaft-for-sale":                DRIVE_SHAFT_TYPES,
  "differential-for-sale":              DIFFERENTIAL_TYPES,
  "speedometer-for-sale":               SPEEDOMETER_TYPES,
  "throttle-body-for-sale":             THROTTLE_BODY_TYPES,
  "transfer-case-assembly-for-sale":    TRANSFER_CASE_TYPES,
  "steering-gear-rack-pinion-for-sale": STEERING_RACK_TYPES,
  "intake-manifold-for-sale":           INTAKE_MANIFOLD_TYPES,
  "steering-column-for-sale":           STEERING_COLUMN_TYPES,
  "spindle-knuckle-for-sale":           SPINDLE_KNUCKLE_TYPES,
  "axle-assembly-for-sale":             AXLE_ASSEMBLY_TYPES,
  "abs-assembly-for-sale":              ABS_ASSEMBLY_TYPES,
};

