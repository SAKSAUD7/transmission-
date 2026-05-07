import { Link } from "wouter";
import Layout from "@/components/Layout";
import ProductPage from "@/components/ProductPage";
import { products } from "@/lib/products";
import engineImg from "@/assets/images/differential.png";

export default function Home() {
  return (
    <Layout>
      <ProductPage 
        productName="Auto Parts"
        aboutText="Welcome to Auto Parts For Sale. We specialize in providing high-quality used and aftermarket auto parts for all vehicle makes and models. Our nationwide inventory ensures you find exactly what you need at prices up to 50% lower than dealer rates. Every part is rigorously tested to ensure performance and reliability."
        finderDropdownLabel="Select Part Category"
        productImage={engineImg}
        packageDetails={[
          "All necessary components for standard installation included.",
          "Every part undergoes our strict quality control inspection.",
          "Fast nationwide shipping directly to your mechanic or home.",
          "30 Days - Replacement or Refund Guarantee."
        ]}
      />
      
      {/* Product Grid Section (Only on Home) */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Parts Catalog</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our extensive inventory of inspected, high-quality used automotive parts. Click on any category to view more details.
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
                  <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#0099cc] transition-colors">{product.name}</h3>
                  <div className="mt-auto pt-4 flex items-center text-[#0099cc] font-medium text-sm">
                    View Details
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
