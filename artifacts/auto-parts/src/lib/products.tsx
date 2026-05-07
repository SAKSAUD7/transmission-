import Layout from "@/components/Layout";
import ProductPage from "@/components/ProductPage";

import axleShaftImg from "@/assets/images/axle-shaft.png";
import driveShaftImg from "@/assets/images/drive-shaft.png";
import differentialImg from "@/assets/images/differential.png";
import speedometerImg from "@/assets/images/speedometer.png";
import throttleBodyImg from "@/assets/images/throttle-body.png";
import transferCaseImg from "@/assets/images/transfer-case.png";
import steeringRackImg from "@/assets/images/steering-rack.png";
import intakeManifoldImg from "@/assets/images/intake-manifold.png";
import steeringColumnImg from "@/assets/images/steering-column.png";
import spindleKnuckleImg from "@/assets/images/spindle-knuckle.png";
import axleAssemblyImg from "@/assets/images/axle-assembly.png";
import engineImg from "@/assets/images/engine.png";
import transmissionImg from "@/assets/images/transmission.png";

export const products = [
  {
    id: "axle-shaft",
    name: "Axle Shaft",
    image: axleShaftImg,
    about: "Specialists in high-quality used and aftermarket axle shafts. Wide range for diverse vehicle makes. Each axle shaft undergoes a comprehensive inspection process. Find the highest-quality component at the best value.",
    dropdown: "Select Axle Shaft Type",
    details: ["All necessary components for installation.", "All axle shafts are tested for quality.", "30 Days - Replacement or Refund."]
  },
  {
    id: "drive-shaft",
    name: "Drive Shaft",
    image: driveShaftImg,
    about: "Committed to high-quality used and aftermarket drive shafts meeting highest standards of performance. Each drive shaft is thoroughly tested before shipping. OEM-grade components at below-market prices.",
    dropdown: "Select Drive Shaft Type",
    details: ["All drive shafts are inspected before delivery.", "30 Days - Replacement or Refund."]
  },
  {
    id: "differential",
    name: "Differential",
    image: differentialImg,
    about: "Specializing in high-quality used and aftermarket differentials. From differentials to transmission ensembles, we have what you need. All differentials thoroughly inspected for function and reliability.",
    dropdown: "Select Differential Type",
    details: ["All differentials are inspected for quality.", "30 Days - Replacement or Refund."]
  },
  {
    id: "speedometer",
    name: "Speedometer",
    image: speedometerImg,
    about: "Dedicated to providing high-quality used and refurbished speedometers. We offer a vast inventory of thoroughly inspected speedometers to ensure reliable, accurate readings every time.",
    dropdown: "Select Speedometer Type",
    details: ["All speedometer components for installation.", "All speedometers are tested.", "30 Days - Replacement or Failures."]
  },
  {
    id: "throttle-body",
    name: "Throttle Body",
    image: throttleBodyImg,
    about: "Specialization in offering high-quality used and aftermarket throttle bodies to enhance your vehicle's performance. Each throttle body meets stringent standards for reliable operation.",
    dropdown: "Select Throttle Body Type",
    details: ["All throttle bodies are tested for functionality.", "30 Days - Replacement or Refund."]
  },
  {
    id: "transfer-case-assembly",
    name: "Transfer Case Assembly",
    image: transferCaseImg,
    about: "Committed to providing high-quality used and aftermarket transfer case assemblies. All assemblies are rigorously tested in various driving conditions. Replacing a worn transfer case or upgrading — we have you covered.",
    dropdown: "Select Transfer Case Assembly Type",
    details: ["All parts inspected for quality.", "30 Days - Replacement or Refund."]
  },
  {
    id: "steering-gear-rack-pinion",
    name: "Steering Gear Rack & Pinion",
    image: steeringRackImg,
    about: "Dedicated to offering high-quality used and aftermarket steering gear racks and pinions. Every component is thoroughly tested ensuring precise handling, safety and control in your vehicle.",
    dropdown: "Select Steering Gear Rack & Pinion Type",
    details: ["All parts inspected for quality.", "30 Days - Replacement or Refund."]
  },
  {
    id: "intake-manifold",
    name: "Intake Manifold",
    image: intakeManifoldImg,
    about: "Specializing in providing a range of high-quality used and aftermarket intake manifolds. Our commitment to quality means every intake manifold undergoes rigorous testing for efficient air delivery.",
    dropdown: "Select Intake Manifold Type",
    details: ["All parts inspected for proper fit.", "All intake manifolds are inspected for fit.", "30 Days - Replacement or Refund."]
  },
  {
    id: "steering-column",
    name: "Steering Column",
    image: steeringColumnImg,
    about: "Providing high-quality used and refurbished steering columns for a wide range of vehicles. We understand the importance of precision and safety in steering components.",
    dropdown: "Select Steering Column Type",
    details: ["All parts necessary for installation.", "All parts inspected for quality.", "30 Days - Replacement or Refund."]
  },
  {
    id: "spindle-knuckle",
    name: "Spindle Knuckle",
    image: spindleKnuckleImg,
    about: "Specialist in offering high-quality used and refurbished spindle knuckles. Whether replacing a damaged part or upgrading your vehicle, our products are designed to deliver great value.",
    dropdown: "Select Spindle Knuckle Type",
    details: ["All spindle knuckles are inspected for functionality.", "30 Days - Replacement or Refund."]
  },
  {
    id: "axle-assembly",
    name: "Axle Assembly - Rear & Front",
    image: axleAssemblyImg,
    about: "Providing a diverse selection of quality used and aftermarket axle assemblies. Our commitment to quality means each component is inspected before delivery. Both front and rear axle assemblies for various applications.",
    dropdown: "Select Axle Assembly Type",
    details: ["All parts inspected before delivery.", "30 Days - Replacement or Refund."]
  },
  {
    id: "engine",
    name: "Engine",
    image: engineImg,
    about: "Dedicated to finding the perfect engine across 2000+ engines in our nationwide inventory. We are committed to reliability, from economy to performance engines. Find the best fit for your vehicle.",
    dropdown: "Select Engine Type",
    details: ["All necessary components.", "All engines are inspected before delivery.", "30 Days - Replacement or Refund."]
  },
  {
    id: "transmissions",
    name: "Transmissions",
    image: transmissionImg,
    about: "Dedicated to providing high-quality used transmissions at competitive prices. 500+ years of experience in the automotive industry. Whether automatic or manual, we have what you need.",
    dropdown: "Select Transmission Type",
    details: ["All internal transmission components including the torque converter.", "Joint Replacement - the torque converter will only be refunded with automatic transmissions.", "Transmissions will be inspected for damage before delivery."]
  }
];

export function ProductRoute({ id }: { id: string }) {
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Layout>
      <ProductPage 
        productName={product.name}
        aboutText={product.about}
        finderDropdownLabel={product.dropdown}
        productImage={product.image}
        packageDetails={product.details}
      />
    </Layout>
  );
}
