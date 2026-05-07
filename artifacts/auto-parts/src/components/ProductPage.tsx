import heroImg from "@/assets/images/hero.png";
import carFinderImg from "@/assets/images/hero.png";
import { Phone, Settings, Truck, ShieldCheck, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PartnersCarousel from "./PartnersCarousel";
import WarrantyBadge from "./WarrantyBadge";

interface ProductPageProps {
  productName: string;
  aboutText: string;
  finderDropdownLabel: string;
  productImage: string;
  packageDetails: string[];
}

export default function ProductPage({
  productName,
  aboutText,
  finderDropdownLabel,
  productImage,
  packageDetails
}: ProductPageProps) {
  const isGeneric = productName === "Auto Parts";
  const displayTitle = isGeneric ? "Get the Lowest Prices on Used Parts!" : `${productName} For Sale`;

  return (
    <div className="flex flex-col w-full">
      {/* 3. Hero Section */}
      <section className="relative h-[500px] w-full overflow-hidden flex items-center bg-gray-900">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Auto Parts Workshop" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
        </div>
        
        {/* Phone Badge */}
        <div className="absolute top-6 right-6 sm:top-8 sm:right-8 bg-[#0099cc] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full flex items-center gap-2 shadow-lg z-10 animate-in fade-in slide-in-from-top-4 duration-500">
          <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="font-bold text-lg sm:text-xl">1385 688 3299</span>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl animate-in fade-in slide-in-from-left-8 duration-700">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
              {displayTitle}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 mb-8 font-medium">
              Save Up to 50% Off Dealer Prices with Fast Shipping!
            </p>
            <Button size="lg" className="bg-[#0099cc] hover:bg-[#007da6] text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all">
              Contact Now
            </Button>
          </div>
        </div>

        {/* Carousel Dots Placeholder */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#0099cc]"></div>
          <div className="w-3 h-3 rounded-full bg-white/50"></div>
          <div className="w-3 h-3 rounded-full bg-white/50"></div>
        </div>
      </section>

      {/* 4. About Us Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 border-l-4 border-[#0099cc] pl-4">
                About Us
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p>{aboutText}</p>
                <p>
                  We ensure that every part we sell meets rigorous standards, providing you with peace of mind and excellent performance.
                </p>
              </div>
              <Button variant="outline" className="text-[#0099cc] border-[#0099cc] hover:bg-[#0099cc] hover:text-white mt-4">
                Learn More
              </Button>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-50 flex items-center justify-center p-8 h-[400px]">
              <img src={productImage} alt={productName} className="max-w-full max-h-full object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Parts Finder Section */}
      <section className="py-16 md:py-24 bg-[#EBF7FF]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Find the right {isGeneric ? 'part' : productName.toLowerCase()} for your vehicle
            </h2>
            <p className="text-lg text-gray-600">With our high-quality, tested options.</p>
          </div>

          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
            <div className="p-8 md:w-1/2 flex flex-col justify-center space-y-6 bg-white z-10 relative">
              <div className="space-y-2">
                <Label className="text-gray-700 font-semibold">Select Vehicle Make</Label>
                <Select>
                  <SelectTrigger className="w-full h-12 bg-gray-50 border-gray-200">
                    <SelectValue placeholder="e.g. Ford, Toyota" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ford">Ford</SelectItem>
                    <SelectItem value="toyota">Toyota</SelectItem>
                    <SelectItem value="honda">Honda</SelectItem>
                    <SelectItem value="chevrolet">Chevrolet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-semibold">Select Vehicle Model</Label>
                <Select>
                  <SelectTrigger className="w-full h-12 bg-gray-50 border-gray-200">
                    <SelectValue placeholder="e.g. F-150, Camry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="f150">F-150</SelectItem>
                    <SelectItem value="camry">Camry</SelectItem>
                    <SelectItem value="civic">Civic</SelectItem>
                    <SelectItem value="silverado">Silverado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-semibold">Select Vehicle Year</Label>
                <Select>
                  <SelectTrigger className="w-full h-12 bg-gray-50 border-gray-200">
                    <SelectValue placeholder="e.g. 2020, 2019" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-semibold">{finderDropdownLabel}</Label>
                <Select>
                  <SelectTrigger className="w-full h-12 bg-gray-50 border-gray-200">
                    <SelectValue placeholder="Select type..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="premium">Premium/OEM</SelectItem>
                    <SelectItem value="aftermarket">Aftermarket</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full h-14 text-lg font-bold bg-[#0099cc] hover:bg-[#007da6] text-white mt-4 shadow-md">
                Find My Part
              </Button>
            </div>
            
            <div className="md:w-1/2 bg-gray-900 relative min-h-[300px] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-transparent z-10 hidden md:block"></div>
              <img src={carFinderImg} alt="Vehicle Search" className="absolute inset-0 w-full h-full object-cover object-center opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Benefits Section */}
      <section className="py-16 md:py-24 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#0099cc] font-bold tracking-wider uppercase text-sm mb-2 block">Benefits</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Why Choose Us for {isGeneric ? 'Parts' : productName}?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Settings, title: "Original Used OEM Parts", desc: "Genuine parts designed specifically for your exact vehicle." },
              { icon: Truck, title: "FAST Shipping", desc: "Expedited delivery options to get your vehicle back on the road." },
              { icon: ShieldCheck, title: "Quality Inspected", desc: "Every part undergoes a rigorous multi-point inspection process." },
              { icon: Percent, title: "Up to 50% Off", desc: "Significant savings compared to buying new from the dealership." }
            ].map((benefit, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-2xl text-center hover:-translate-y-2 transition-transform duration-300 border border-gray-100 shadow-sm hover:shadow-md">
                <div className="w-16 h-16 bg-[#0099cc]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#0099cc]">
                  <benefit.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Our Partners Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">Our Partners</h2>
          <PartnersCarousel />
        </div>
      </section>

      {/* 8. Warranty Information Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-2/3 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Warranty Information</h2>
              <p className="text-lg text-gray-700 leading-relaxed border-l-4 border-[#0099cc] pl-4">
                Each {isGeneric ? 'part' : productName.toLowerCase()} is backed by a 30-day replacement or refund warranty. Our rigorous inspection guarantees that you receive a reliable, high-performing component.
              </p>
              
              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#0099cc] rounded-full"></div>
                    Package Details
                  </h3>
                  <ul className="space-y-2 ml-6 text-gray-600 list-disc marker:text-[#0099cc]">
                    {packageDetails.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#0099cc] rounded-full"></div>
                    Inspection
                  </h3>
                  <p className="text-gray-600 ml-6">All {isGeneric ? 'parts' : productName.toLowerCase() + 's'} are inspected for quality before delivery.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#0099cc] rounded-full"></div>
                    Warranty Badge
                  </h3>
                  <p className="text-gray-600 ml-6 font-medium text-[#0099cc]">30 Days - Replacement or Refund</p>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/3 flex justify-center">
              <WarrantyBadge />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
