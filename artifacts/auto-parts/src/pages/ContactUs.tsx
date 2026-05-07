import Layout from "@/components/Layout";
import ProductPage from "@/components/ProductPage";
import engineImg from "@/assets/images/differential.png";

export default function ContactUs() {
  return (
    <Layout>
      <ProductPage 
        productName="Auto Parts"
        aboutText="Need help finding a specific part? Have questions about our warranty or shipping process? Our dedicated team of automotive specialists is here to assist you. Call us directly or fill out the contact form, and we'll get back to you with the exact parts you need at unbeatable prices. We pride ourselves on exceptional customer service and technical expertise."
        finderDropdownLabel="Select Part Category"
        productImage={engineImg}
        packageDetails={[
          "All necessary components for standard installation included.",
          "Every part undergoes our strict quality control inspection.",
          "Fast nationwide shipping directly to your mechanic or home.",
          "30 Days - Replacement or Refund Guarantee."
        ]}
      />
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-[#EBF7FF] rounded-2xl p-8 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Direct Contact Line</h2>
            <p className="text-gray-600 mb-6">Skip the form and speak directly with our parts specialists right now.</p>
            <a href="tel:13856883299" className="inline-flex items-center gap-3 bg-[#0099cc] text-white px-8 py-4 rounded-full text-2xl font-black shadow-lg hover:bg-[#007da6] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              1385 688 3299
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
