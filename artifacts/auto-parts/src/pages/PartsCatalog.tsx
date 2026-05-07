import { useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { products } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Search, ChevronRight } from "lucide-react";
import heroImg from "@/assets/images/hero.png";

export default function PartsCatalog() {
  const [query, setQuery] = useState("");

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.about.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex flex-col w-full">
        {/* Hero */}
        <section className="relative h-[380px] w-full overflow-hidden flex items-center bg-gray-900">
          <div className="absolute inset-0">
            <img src={heroImg} alt="Parts Catalog" className="w-full h-full object-cover opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent"></div>
          </div>
          <div className="absolute top-6 right-6 sm:top-8 sm:right-8 bg-[#0099cc] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full flex items-center gap-2 shadow-lg z-10">
            <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="font-bold text-lg sm:text-xl">1385 688 3299</span>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 leading-tight">Parts Catalog</h1>
              <p className="text-xl text-gray-200 font-medium">Browse all {products.length} categories — quality used auto parts at up to 50% off.</p>
            </div>
          </div>
        </section>

        {/* Search + Grid */}
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            {/* Search bar */}
            <div className="max-w-xl mx-auto mb-12 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search parts (e.g. engine, transmission, axle...)"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="pl-12 h-14 text-base rounded-full border-gray-300 shadow-sm focus:border-[#0099cc]"
              />
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg mb-4">No parts found matching "{query}"</p>
                <Button variant="outline" onClick={() => setQuery("")} className="text-[#0099cc] border-[#0099cc]">Clear Search</Button>
              </div>
            ) : (
              <>
                <p className="text-gray-500 text-sm mb-6">{filtered.length} categor{filtered.length === 1 ? "y" : "ies"} found</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filtered.map((product) => (
                    <Link key={product.id} href={`/${product.id}`} className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl hover:border-[#0099cc]/30 transition-all duration-300 flex flex-col">
                      <div className="h-52 p-6 bg-gray-50 flex items-center justify-center group-hover:bg-[#EBF7FF] transition-colors">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow"
                        />
                      </div>
                      <div className="p-5 border-t border-gray-100 flex-1 flex flex-col">
                        <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-[#0099cc] transition-colors">{product.name}</h3>
                        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 flex-1">{product.about.substring(0, 100)}...</p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">Up to 50% Off</span>
                          <div className="flex items-center text-[#0099cc] font-medium text-sm">
                            View Details
                            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-14 bg-[#0099cc]">
          <div className="container mx-auto px-4 text-center text-white">
            <h2 className="text-3xl font-bold mb-3">Can't Find What You Need?</h2>
            <p className="text-white/80 text-lg mb-6">Our specialists can source almost any used auto part. Call us and we'll find it for you.</p>
            <a href="tel:13856883299" className="inline-flex items-center gap-2 bg-white text-[#0099cc] px-8 py-4 rounded-full text-xl font-black hover:bg-gray-50 transition-colors shadow-lg">
              <Phone className="h-6 w-6" />
              1385 688 3299
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
}
