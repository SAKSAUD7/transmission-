import { SiSuzuki, SiHonda, SiHyundai, SiLamborghini, SiAudi, SiInfiniti, SiTata, SiMan } from "react-icons/si";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

const partners = [
  { icon: SiSuzuki, name: "Suzuki" },
  { icon: SiHonda, name: "Honda" },
  { icon: SiHyundai, name: "Hyundai" },
  { icon: SiAudi, name: "Audi" },
  { icon: SiInfiniti, name: "Infiniti" },
  { icon: SiTata, name: "Tata" },
  { icon: SiMan, name: "MAN" },
];

export default function PartnersCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center", skipSnaps: false });

  useEffect(() => {
    if (!emblaApi) return;
    
    // Auto-play functionality
    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);
    
    return () => clearInterval(autoplay);
  }, [emblaApi]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="relative px-12 mb-16">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {partners.map((partner, index) => (
              <div key={index} className="flex-[0_0_50%] sm:flex-[0_0_33.33%] md:flex-[0_0_25%] lg:flex-[0_0_20%] pl-4 min-w-0">
                <div className="h-24 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center p-6 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 cursor-pointer">
                  <partner.icon className="w-full h-full text-gray-700" />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-md border-gray-200 text-[#0099cc]"
          onClick={scrollPrev}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute right-0 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-md border-gray-200 text-[#0099cc]"
          onClick={scrollNext}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Featured Partner */}
      <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-lg border border-gray-100 flex flex-col items-center">
        <div className="w-24 h-24 mb-4 text-[#0099cc]">
          <SiLamborghini className="w-full h-full" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Lamborghini</h3>
        <p className="text-gray-600 text-center">
          Lamborghini is an Italian brand and manufacturer of luxury sports cars and SUVs. 
          We specialize in sourcing high-quality parts for these premium vehicles.
        </p>
      </div>
    </div>
  );
}
