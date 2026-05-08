// Comprehensive vehicle makes and models extracted from database dump
// common_make + common_model tables from backup.dump

export const CAR_MAKES = [
  "Acura","Alfa Romeo","Audi","BMW","Buick","Cadillac","Chevrolet",
  "Chrysler","Dodge","Ford","GMC","Honda","Hyundai","Infiniti",
  "Isuzu","Jaguar","Jeep","Kia","Land Rover","Lexus","Lincoln",
  "Mazda","Mercedes-Benz","Mercury","MINI","Mitsubishi","Nissan",
  "Oldsmobile","Plymouth","Pontiac","Porsche","Ram","Saturn",
  "Scion","Subaru","Suzuki","Toyota","Volkswagen","Volvo"
];

export const CAR_MODELS_BY_MAKE: Record<string, string[]> = {
  "Acura": ["ILX","MDX","RDX","RLX","TL","TLX","TSX","ZDX"],
  "Audi": ["A3","A4","A5","A6","A7","A8","Q3","Q5","Q7","Q8","TT"],
  "BMW": ["1 Series","2 Series","3 Series","4 Series","5 Series","7 Series","X1","X3","X5","X6","Z4"],
  "Buick": ["Century","Enclave","Encore","Envision","LaCrosse","LeSabre","Lucerne","Regal","Riviera","Skylark","Verano"],
  "Cadillac": ["ATS","CT4","CT5","CT6","CTS","DeVille","Escalade","SRX","STS","XTS","XT4","XT5","XT6"],
  "Chevrolet": ["Astro","Avalanche","Blazer","Camaro","Caprice","Cavalier","Colorado","Corvette","Cruz","Equinox","Express","HHR","Impala","Malibu","Monte Carlo","Silverado","Sonic","Spark","Suburban","Tahoe","Tracker","TrailBlazer","Traverse","Trax","Volt"],
  "Chrysler": ["200","300","300M","Aspen","Concorde","LHS","Pacifica","PT Cruiser","Sebring","Town & Country","Voyager"],
  "Dodge": ["Avenger","Caliber","Caravan","Challenger","Charger","Dakota","Dart","Durango","Grand Caravan","Journey","Magnum","Neon","Nitro","Ram","Stealth","Stratus","Viper"],
  "Ford": ["Bronco","Bronco Sport","C-Max","Crown Victoria","E-150","E-250","E-350","Edge","Escape","Escort","Expedition","Explorer","F-150","F-250","F-350","Fiesta","Five Hundred","Flex","Focus","Freestar","Freestyle","Fusion","Galaxy","Mustang","Ranger","Taurus","Transit","Windstar"],
  "GMC": ["Acadia","Canyon","Envoy","Jimmy","Safari","Sierra","Sonoma","Suburban","Terrain","Typhoon","Vandura","Yukon"],
  "Honda": ["Accord","CR-V","CR-Z","Civic","Clarity","Element","Fit","HR-V","Insight","Odyssey","Passport","Pilot","Ridgeline","S2000"],
  "Hyundai": ["Accent","Azera","Elantra","Equus","Genesis","Ioniq","Kona","Santa Fe","Sonata","Tiburon","Tucson","Veloster","Venue","Veracruz"],
  "Infiniti": ["EX","FX","G","I","J","JX","M","Q40","Q45","Q50","Q60","Q70","QX30","QX50","QX56","QX60","QX70","QX80"],
  "Jeep": ["Cherokee","Commander","Compass","Gladiator","Grand Cherokee","Liberty","Patriot","Renegade","Wrangler"],
  "Kia": ["Cadenza","Forte","K5","Niro","Optima","Rio","Sedona","Sorento","Soul","Sportage","Stinger","Telluride"],
  "Land Rover": ["Defender","Discovery","Discovery Sport","Freelander","LR2","LR3","LR4","Range Rover","Range Rover Evoque","Range Rover Sport","Range Rover Velar"],
  "Lexus": ["CT","ES","GS","GX","IS","LC","LS","LX","NX","RC","RX","UX"],
  "Lincoln": ["Aviator","Blackwood","Continental","Corsair","MKC","MKS","MKT","MKX","MKZ","Navigator","Town Car","Zephyr"],
  "Mazda": ["CX-3","CX-30","CX-5","CX-7","CX-9","MAZDA2","MAZDA3","MAZDA5","MAZDA6","MX-5 Miata","RX-8","Tribute"],
  "Mercedes-Benz": ["A-Class","B-Class","C-Class","CLA","CLK","CLS","E-Class","G-Class","GLA","GLB","GLC","GLE","GLS","ML-Class","S-Class","SL","SLC","SLK","SLR","SLS","Sprinter"],
  "Mercury": ["Cougar","Grand Marquis","Marauder","Mariner","Milan","Monterey","Montego","Mountaineer","Mystique","Sable","Topaz","Villager"],
  "MINI": ["Clubman","Convertible","Countryman","Coupe","Hardtop","Paceman","Roadster"],
  "Mitsubishi": ["3000GT","Eclipse","Eclipse Cross","Endeavor","Galant","Lancer","Mirage","Montero","Outlander","Outlander Sport","Raider"],
  "Nissan": ["370Z","Altima","Armada","Cube","Frontier","GT-R","JUKE","LEAF","Maxima","Murano","NV","NV200","Pathfinder","Quest","Rogue","Sentra","Titan","Versa","Xterra"],
  "Pontiac": ["Aztek","Bonneville","Firebird","G3","G5","G6","G8","Grand Am","Grand Prix","GTO","Montana","Solstice","Sunfire","Torrent","Trans Am","Vibe"],
  "Ram": ["1500","2500","3500","ProMaster","ProMaster City"],
  "Subaru": ["BRZ","Crosstrek","Forester","Impreza","Legacy","Outback","Tribeca","WRX"],
  "Toyota": ["4Runner","Avalon","C-HR","Camry","Corolla","FJ Cruiser","Highlander","Land Cruiser","Matrix","Prius","RAV4","Sequoia","Sienna","Solara","Supra","Tacoma","Tundra","Venza","Yaris"],
  "Volkswagen": ["Beetle","CC","EOS","Golf","GTI","Jetta","Passat","Phaeton","Routan","Tiguan","Touareg"],
  "Volvo": ["C30","C70","S40","S60","S70","S80","S90","V40","V50","V60","V70","V90","XC40","XC60","XC70","XC90"],
};

export const YEARS = Array.from({ length: 35 }, (_, i) => String(2025 - i));

export const TRANSMISSION_TYPES = [
  "Automatic","Manual / Standard","CVT","Semi-Automatic","Dual-Clutch (DCT)",
  "Tiptronic","Torque Converter","4-Speed Automatic","5-Speed Automatic",
  "6-Speed Automatic","8-Speed Automatic","10-Speed Automatic",
];

export const ENGINE_TYPES = [
  "4-Cylinder","6-Cylinder (V6)","8-Cylinder (V8)","3-Cylinder",
  "5-Cylinder","10-Cylinder (V10)","12-Cylinder (V12)","Diesel",
  "Hybrid","Electric","Turbocharged","Supercharged",
];
