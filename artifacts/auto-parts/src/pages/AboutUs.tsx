import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Phone, ShieldCheck, Truck, Award, Users } from "lucide-react";
import { Link } from "wouter";
import heroImg from "@/assets/images/hero.png";
import transmissionImg from "@/assets/images/transmission.png";
import engineImg from "@/assets/images/engine.png";

export default function AboutUs() {
  return (
    <Layout>
      <div className="flex flex-col w-full">
        {/* Hero */}
        <section className="relative h-[400px] w-full overflow-hidden flex items-center bg-gray-900">
          <div className="absolute inset-0">
            <img src={heroImg} alt="Auto Parts Workshop" className="w-full h-full object-cover opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent"></div>
          </div>
          <div className="absolute top-6 right-6 sm:top-8 sm:right-8 bg-[#0099cc] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full flex items-center gap-2 shadow-lg z-10">
            <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="font-bold text-lg sm:text-xl">1385 688 3299</span>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 leading-tight">About Us</h1>
              <p className="text-xl text-gray-200 font-medium">Your trusted source for quality used auto parts nationwide.</p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-5">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 border-l-4 border-[#0099cc] pl-4">Our Story</h2>
                <p className="text-gray-600 leading-relaxed">
                  Auto Parts For Sale was founded with a simple mission: to make high-quality used auto parts accessible and affordable for every vehicle owner across the country. With years of experience in the automotive industry, our team has built a nationwide network of trusted suppliers and recyclers, allowing us to source the best parts at prices up to 50% below dealer rates.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  We understand how frustrating and expensive it can be when your vehicle breaks down. That's why we've made it our purpose to eliminate the guesswork and high costs typically associated with auto parts. Our expert team personally inspects each component before it reaches our inventory, ensuring that every part we sell meets our strict quality standards.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  From engines and transmissions to axle assemblies and steering components, we stock an extensive inventory covering thousands of vehicle makes and models. Whether you're a professional mechanic or a DIY enthusiast, we're here to help you find exactly what you need — quickly and at the right price.
                </p>
                <Button className="bg-[#0099cc] hover:bg-[#007da6] text-white rounded-full px-6">
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-50 flex items-center justify-center p-8 h-[420px]">
                <img src={transmissionImg} alt="Transmission" className="max-w-full max-h-full object-contain drop-shadow-xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-[#0099cc]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              {[
                { number: "2,000+", label: "Parts in Inventory" },
                { number: "50", label: "States Served" },
                { number: "30 Days", label: "Warranty Guarantee" },
                { number: "50%", label: "Off Dealer Prices" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-4xl md:text-5xl font-black mb-2">{stat.number}</div>
                  <div className="text-white/80 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <span className="text-[#0099cc] font-bold tracking-wider uppercase text-sm mb-2 block">Why Us</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Makes Us Different</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: ShieldCheck, title: "Quality Guaranteed", desc: "Every part is rigorously inspected before listing. No compromises, no exceptions." },
                { icon: Truck, title: "Fast Nationwide Shipping", desc: "We ship to all 50 states with expedited options available to get you back on the road fast." },
                { icon: Award, title: "30-Day Warranty", desc: "Every purchase is backed by our 30-day replacement or refund warranty for peace of mind." },
                { icon: Users, title: "Expert Support", desc: "Our team of automotive specialists is available to help you find exactly what you need." },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6">
                  <div className="w-16 h-16 bg-[#EBF7FF] rounded-full flex items-center justify-center mb-5 text-[#0099cc]">
                    <item.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Range */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white flex items-center justify-center p-8 h-[400px]">
                <img src={engineImg} alt="Engine Parts" className="max-w-full max-h-full object-contain drop-shadow-xl" />
              </div>
              <div className="space-y-5">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 border-l-4 border-[#0099cc] pl-4">Our Product Range</h2>
                <p className="text-gray-600 leading-relaxed">
                  We carry a comprehensive selection of used and aftermarket auto parts covering all major vehicle systems. Our inventory is constantly updated to ensure availability for the most in-demand parts across all makes and models.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {["Engines", "Transmissions", "Axle Shafts", "Drive Shafts", "Differentials", "Transfer Cases", "Steering Systems", "Intake Manifolds", "Throttle Bodies", "Speedometers", "Spindle Knuckles", "ABS Assemblies"].map(part => (
                    <div key={part} className="flex items-center gap-2 text-gray-700 text-sm">
                      <div className="w-1.5 h-1.5 bg-[#0099cc] rounded-full flex-shrink-0"></div>
                      {part}
                    </div>
                  ))}
                </div>
                <Button className="bg-[#0099cc] hover:bg-[#007da6] text-white rounded-full px-6 mt-4">
                  <Link href="/catalog">Browse All Parts</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Find Your Part?</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">Call us now or browse our catalog to find the exact part you need at the lowest price.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:13856883299" className="inline-flex items-center justify-center gap-2 bg-[#0099cc] text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-[#007da6] transition-colors">
                <Phone className="h-5 w-5" />
                1385 688 3299
              </a>
              <Link href="/catalog" className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors">
                Browse Catalog
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
