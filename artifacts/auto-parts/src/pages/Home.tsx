import { useState, useRef } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { products } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Phone, Settings, Truck, ShieldCheck, Percent, ChevronRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PartnersCarousel from "@/components/PartnersCarousel";
import WarrantyBadge from "@/components/WarrantyBadge";
import heroImg from "@/assets/images/hero.png";

const BASE = import.meta.env.BASE_URL || "/";

const heroSlides = [
  { video: `${BASE}videos/parts1.mp4` },
  { video: `${BASE}videos/parts2.mp4` },
  { video: `${BASE}videos/parts3.mp4` },
];

const CAR_MAKES = ["Ford", "Toyota", "Honda", "Chevrolet", "Dodge", "Nissan", "BMW", "Mercedes-Benz", "Jeep", "GMC", "Subaru", "Volkswagen", "Audi"];
const CAR_MODELS = ["F-150", "Camry", "Civic", "Silverado", "Mustang", "Explorer", "Corolla", "Accord", "CR-V", "Ram 1500", "Wrangler", "Tacoma"];
const YEARS = Array.from({ length: 30 }, (_, i) => String(2024 - i));

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <Layout>
      <div className="flex flex-col w-full">
        {/* Hero Section with Video Background */}
        <section className="relative h-[500px] w-full overflow-hidden flex items-center bg-gray-900">
          <div className="absolute inset-0">
            <video
              key={heroSlides[currentSlide].video}
              ref={videoRef}
              src={heroSlides[currentSlide].video}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-55"
              onError={() => {
                const img = document.createElement("img");
                img.src = heroImg;
                img.className = "w-full h-full object-cover opacity-55";
                videoRef.current?.parentElement?.replaceChild(img, videoRef.current);
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent"></div>
          </div>

          {/* Phone Badge */}
          <div className="absolute top-6 right-6 sm:top-8 sm:right-8 bg-[#0099cc] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full flex items-center gap-2 shadow-lg z-10">
            <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="font-bold text-lg sm:text-xl">1385 688 3299</span>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
                Get the Lowest Prices on Used Parts!
              </h1>
              <p className="text-xl sm:text-2xl text-gray-200 mb-8 font-medium">
                Save Up to 50% Off Dealer Prices with Fast Shipping!
              </p>
              <Button size="lg" className="bg-[#0099cc] hover:bg-[#007da6] text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all">
                Contact Now
              </Button>
            </div>
          </div>

          {/* Slide Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {heroSlides.map((_, i) => (
              <button key={i} onClick={() => setCurrentSlide(i)} className={`w-3 h-3 rounded-full transition-all ${i === currentSlide ? "bg-[#0099cc]" : "bg-white/40"}`} />
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-5">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 border-l-4 border-[#0099cc] pl-4">About Us</h2>
                <p className="text-gray-600 leading-relaxed">
                  At Auto Parts For Sale, we are dedicated to providing high-quality used and aftermarket auto parts for all vehicle makes and models. With years of experience in the automotive industry, we have built a nationwide network of trusted suppliers, ensuring we can source the best parts at the lowest prices. Our expert team thoroughly inspects every part we sell, so you can purchase from us knowing you'll receive a reliable, high-quality component.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Our comprehensive inventory includes a wide range of engines, transmissions, axles, and much more, ensuring you'll find what you need for your vehicle, no matter the make or model. We are committed to quality across all of our products, and our inspection process ensures that what we sell will perform reliably and consistently. Whether you're replacing a damaged part or upgrading to improve your vehicle's performance, we have the part you need, and we'll ship it to you quickly.
                </p>
                <Button variant="outline" className="text-[#0099cc] border-[#0099cc] hover:bg-[#0099cc] hover:text-white">
                  Learn More
                </Button>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-50 flex items-center justify-center p-8 h-[420px]">
                <img src={products[12].image} alt="Auto Parts" className="max-w-full max-h-full object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </section>

        {/* Parts Catalog Grid */}
        <section className="py-16 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Parts Catalog</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Browse our extensive inventory of inspected, high-quality used automotive parts.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link key={product.id} href={`/${product.id}`} className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
                  <div className="h-48 p-6 bg-gray-50 flex items-center justify-center group-hover:bg-blue-50/50 transition-colors">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 border-t border-gray-100 flex-1 flex flex-col">
                    <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-[#0099cc] transition-colors">{product.name}</h3>
                    <div className="mt-auto pt-3 flex items-center text-[#0099cc] font-medium text-sm">
                      View Details
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Parts Finder Section */}
        <section className="py-16 md:py-24 bg-[#EBF7FF]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 max-w-2xl mx-auto">
                Find the Right Auto Part for Your Vehicle
              </h2>
              <p className="text-gray-600">Select your vehicle details and the part you need.</p>
            </div>

            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
              <div className="p-8 md:w-1/2 flex flex-col justify-center space-y-5 bg-white z-10 relative">
                <div className="space-y-2">
                  <Label className="text-gray-700 font-semibold text-sm">Select Vehicle Make</Label>
                  <Select>
                    <SelectTrigger className="w-full h-11 bg-gray-50 border-gray-200"><SelectValue placeholder="Select Vehicle Make" /></SelectTrigger>
                    <SelectContent>{CAR_MAKES.map(m => <SelectItem key={m} value={m.toLowerCase()}>{m}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700 font-semibold text-sm">Select Vehicle Model</Label>
                  <Select>
                    <SelectTrigger className="w-full h-11 bg-gray-50 border-gray-200"><SelectValue placeholder="Select Vehicle Model" /></SelectTrigger>
                    <SelectContent>{CAR_MODELS.map(m => <SelectItem key={m} value={m.toLowerCase()}>{m}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700 font-semibold text-sm">Select Vehicle Year</Label>
                  <Select>
                    <SelectTrigger className="w-full h-11 bg-gray-50 border-gray-200"><SelectValue placeholder="Select Vehicle Year" /></SelectTrigger>
                    <SelectContent>{YEARS.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700 font-semibold text-sm">Select Part Category</Label>
                  <Select>
                    <SelectTrigger className="w-full h-11 bg-gray-50 border-gray-200"><SelectValue placeholder="Select Part Category" /></SelectTrigger>
                    <SelectContent>
                      {products.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full h-12 text-base font-bold bg-[#0099cc] hover:bg-[#007da6] text-white mt-2 shadow-md">
                  Find My Part
                </Button>
              </div>
              <div className="md:w-1/2 bg-gray-800 relative min-h-[300px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent z-10 hidden md:block"></div>
                <img src={heroImg} alt="Vehicle Search" className="absolute inset-0 w-full h-full object-cover object-center opacity-70" />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <span className="text-[#0099cc] font-bold tracking-wider uppercase text-sm mb-2 block">Benefits</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Choose Us for Parts?</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Settings, title: "Original Used OEM Parts", desc: "Genuine parts designed specifically for your exact vehicle model and year." },
                { icon: Truck, title: "FAST Shipping", desc: "Fast delivery options to get your vehicle back on the road quickly." },
                { icon: ShieldCheck, title: "Quality Inspected", desc: "Every part undergoes a rigorous multi-point inspection process before sale." },
                { icon: Percent, title: "Up to 50% Off Dealer Price", desc: "Significant savings compared to buying new from the dealership." }
              ].map((benefit, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6 hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-16 h-16 bg-[#EBF7FF] rounded-full flex items-center justify-center mb-5 text-[#0099cc]">
                    <benefit.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="py-16 md:py-20 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">Our Partners</h2>
            <PartnersCarousel />
          </div>
        </section>

        {/* Warranty */}
        <section className="py-16 md:py-24 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-2/3 space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Warranty Information</h2>
                <p className="text-gray-700 leading-relaxed">
                  Every part you purchase from us comes with a 30-day replacement or refund warranty. We are committed to offering the highest quality parts at competitive prices, giving you confidence and peace of mind with every purchase. We rigorously test all parts to ensure quality and long-lasting performance before shipping.
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#0099cc] rounded-full inline-block"></span>Package Details
                    </h3>
                    <ul className="ml-5 text-gray-600 list-disc marker:text-[#0099cc] space-y-1">
                      <li>All necessary components for standard installation included.</li>
                      <li>Every part undergoes our strict quality control inspection.</li>
                      <li>Fast nationwide shipping directly to your mechanic or home.</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#0099cc] rounded-full inline-block"></span>Inspection
                    </h3>
                    <p className="text-gray-600 ml-5">All parts are inspected for quality before delivery.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#0099cc] rounded-full inline-block"></span>Warranty Badge
                    </h3>
                    <p className="text-gray-600 ml-5 font-semibold text-[#0099cc]">30 Days — Replacement or Refund</p>
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
    </Layout>
  );
}
