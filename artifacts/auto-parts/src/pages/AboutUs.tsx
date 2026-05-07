import Layout from "@/components/Layout";
import ProductPage from "@/components/ProductPage";
import engineImg from "@/assets/images/differential.png";

export default function AboutUs() {
  return (
    <Layout>
      <ProductPage 
        productName="Auto Parts"
        aboutText="Founded with a passion for automotive excellence, Auto Parts For Sale is your premier destination for high-quality, reliable used and aftermarket car parts. With years of industry experience, we've built a nationwide network that allows us to source the best components at the lowest prices, passing the savings directly to you. Our mission is to keep your vehicle running smoothly without breaking the bank."
        finderDropdownLabel="Select Part Category"
        productImage={engineImg}
        packageDetails={[
          "All necessary components for standard installation included.",
          "Every part undergoes our strict quality control inspection.",
          "Fast nationwide shipping directly to your mechanic or home.",
          "30 Days - Replacement or Refund Guarantee."
        ]}
      />
    </Layout>
  );
}
