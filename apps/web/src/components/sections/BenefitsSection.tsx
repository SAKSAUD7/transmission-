import { Settings, Truck, ShieldCheck, Percent } from "lucide-react";

const BENEFITS = [
  { Icon: Settings,    title: "Original Used OEM Parts", desc: "Our OEM used parts provide a cost-effective solution for your vehicle needs, ensuring genuine parts with exceptional performance. Each unit is carefully sourced and tested to deliver exceptional reliability and value." },
  { Icon: Truck,       title: "FAST Shipping",           desc: "Our FAST Shipping guarantees swift and reliable delivery, so you receive your parts promptly. Count on us to expedite your order and minimize your downtime." },
  { Icon: ShieldCheck, title: "Quality Inspected",       desc: "Our Quality Inspected parts are meticulously examined to guarantee they meet stringent criteria. We ensure that every item delivers exceptional quality and peace of mind." },
  { Icon: Percent,     title: "Up to 50% Off Dealer Price", desc: "Enjoy significant savings with up to 50% off dealer prices, offering you top-notch parts at unbeatable prices. Maximize your budget and get more for less." },
];

export default function BenefitsSection({ benefitTitle }: { benefitTitle: string }) {
  return (
    <section className="benefits">
      <div className="benefits-inner">
        <p className="benefits-label">Benefits</p>
        <h2 className="benefits-title">{benefitTitle}</h2>
        <div className="benefits-grid">
          {BENEFITS.map(({ Icon, title, desc }) => (
            <div key={title} className="benefit-card">
              <div className="benefit-icon"><Icon size={28} /></div>
              <h3 className="benefit-name">{title}</h3>
              <p className="benefit-desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
