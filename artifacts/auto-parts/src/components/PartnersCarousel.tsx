import { useState, useEffect } from "react";
import { SiSuzuki, SiHonda, SiHyundai, SiLamborghini, SiAudi, SiTata } from "react-icons/si";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* Mahindra doesn't exist in react-icons/si — use a simple SVG text mark */
function MahindraIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif" fill={color}>
        Mahindra
      </text>
    </svg>
  );
}

type PartnerDef =
  | { type: "si"; Icon: React.ElementType; name: string; description: string; color: string }
  | { type: "custom"; name: string; description: string; color: string };

const partners: PartnerDef[] = [
  {
    type: "si",
    Icon: SiSuzuki,
    name: "Suzuki",
    description:
      "Suzuki is a Japanese multinational corporation known for producing reliable and fuel-efficient vehicles. The brand has a strong global presence and is renowned for its compact cars, motorcycles, and all-terrain vehicles, offering quality and performance across all segments.",
    color: "#1a1a1a",
  },
  {
    type: "si",
    Icon: SiHonda,
    name: "Honda",
    description:
      "Honda is a leading Japanese multinational conglomerate famous for its innovative engineering in automobiles, motorcycles, and power equipment. Honda vehicles are celebrated worldwide for their reliability, fuel efficiency, and cutting-edge technology.",
    color: "#cc0001",
  },
  {
    type: "si",
    Icon: SiHyundai,
    name: "Hyundai",
    description:
      "Hyundai is a South Korean automotive manufacturer and one of the world's largest car makers. Known for producing affordable yet high-quality vehicles, Hyundai has expanded into electric and hydrogen fuel cell technology, setting new standards in sustainable mobility.",
    color: "#002c6c",
  },
  {
    type: "si",
    Icon: SiLamborghini,
    name: "Lamborghini",
    description:
      "Lamborghini is an Italian luxury automaker known for its high-performance sports cars with striking, aggressive designs. The brand combines advanced engineering with exclusive styling to deliver an exhilarating driving experience. Owning a Lamborghini is a symbol of status and prestige.",
    color: "#d4a017",
  },
  {
    type: "si",
    Icon: SiAudi,
    name: "Audi",
    description:
      "Audi is a German luxury automobile manufacturer renowned for its quattro all-wheel drive system and sophisticated design language. The brand consistently delivers premium vehicles that blend advanced technology, performance, and elegance in every model they produce.",
    color: "#bb0a30",
  },
  {
    type: "custom",
    name: "Mahindra",
    description:
      "Mahindra is an Indian multinational automotive manufacturer with a strong presence in the utility vehicles and tractors market. Known for their rugged, dependable SUVs and off-road vehicles, Mahindra has expanded globally with a focus on electric mobility and sustainable transport solutions.",
    color: "#e31e24",
  },
  {
    type: "si",
    Icon: SiTata,
    name: "Tata",
    description:
      "Tata Motors is an Indian multinational automotive manufacturing company and a global leader in commercial vehicles. Part of the Tata Group, the brand produces a wide range of vehicles including passenger cars, trucks, and buses, and is pioneering affordable electric vehicles in emerging markets.",
    color: "#00338d",
  },
];

function PartnerLogo({ partner, size, color }: { partner: PartnerDef; size: number; color: string }) {
  if (partner.type === "custom") {
    return <MahindraIcon size={size} color={color} />;
  }
  const { Icon } = partner;
  return <Icon style={{ width: size, height: size, color }} />;
}

export default function PartnersCarousel() {
  const [active, setActive] = useState(3); // Start with Lamborghini

  const prev = () => setActive(i => (i - 1 + partners.length) % partners.length);
  const next = () => setActive(i => (i + 1) % partners.length);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, []);

  const current = partners[active];

  return (
    <div className="w-full max-w-4xl mx-auto select-none">
      {/* Logos row */}
      <div className="flex items-center justify-center gap-4 md:gap-8 mb-8 px-2">
        {partners.map((partner, i) => {
          const isActive = i === active;
          return (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={partner.name}
              className={`flex-shrink-0 flex items-center justify-center transition-all duration-300 focus:outline-none ${
                isActive
                  ? "w-[90px] h-[90px] rounded-full bg-white shadow-xl border border-gray-200"
                  : "w-12 h-12 opacity-50 hover:opacity-80"
              }`}
            >
              <PartnerLogo
                partner={partner}
                size={isActive ? 48 : 30}
                color={isActive ? partner.color : "#374151"}
              />
            </button>
          );
        })}
      </div>

      {/* Name + description */}
      <div className="text-center mb-8 px-6" style={{ minHeight: 110 }}>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{current.name}</h3>
        <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mx-auto">
          {current.description}
        </p>
      </div>

      {/* Prev | dots | Next */}
      <div className="flex items-center justify-center gap-6">
        <button onClick={prev} className="text-gray-400 hover:text-gray-700 transition-colors" aria-label="Previous">
          <ChevronLeft className="w-7 h-7" />
        </button>

        <div className="flex items-center gap-2">
          {partners.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Partner ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === active ? "w-3 h-3 bg-[#0099cc]" : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        <button onClick={next} className="text-gray-400 hover:text-gray-700 transition-colors" aria-label="Next">
          <ChevronRight className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}
