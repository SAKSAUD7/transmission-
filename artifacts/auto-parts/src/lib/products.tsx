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

const BASE = import.meta.env.BASE_URL || "/";

export const products = [
  {
    id: "axle-shaft",
    name: "Axle Shaft",
    image: axleShaftImg,
    about: "At Auto Parts For Sale, we pride ourselves on providing high-quality used and aftermarket axle shafts designed to meet the needs of a wide range of vehicles. Each axle shaft in our inventory is thoroughly inspected, ensuring it meets the highest standards of performance and durability. Each axle shaft undergoes a comprehensive inspection process before being made available for sale. We stock axle shafts that can help play in your vehicle's drivetrain, and we are committed to ensuring parts that reliably and consistently meet long-lasting performance.",
    aboutExtra: "Our first-high-performing promise is that every axle shaft we sell is ready to perform under demanding conditions. Before shipping, each component undergoes a comprehensive inspection to verify its structural integrity and performance capabilities. Whether you're replacing a worn-out axle shaft or looking to upgrade your vehicle, we guarantee that Auto Parts For Sale provides parts that meet and exceed expectations. With a commitment to quality and customer satisfaction, you can trust us to get your vehicle back on the road quickly and affordably.",
    dropdown: "Select Axle Shaft Type",
    details: ["All necessary components for installation.", "All axle shafts are tested for quality.", "30 Days - Replacement or Refund."],
    partFinderTitle: "Choose the right axle shaft for your vehicle from our selection of high-quality, tested options.",
    benefitTitle: "Why Choose Us for Axle Shafts?",
    warrantyTitle: "Axle Shaft"
  },
  {
    id: "drive-shaft",
    name: "Drive Shaft",
    image: driveShaftImg,
    about: "At Drive Shaft For Sale, we are committed to offering high-quality used and aftermarket drive shafts that meet the highest standards of performance and durability. Each drive shaft in our inventory is carefully and rigorously inspected to ensure it meets the highest standards of performance and reliability before it reaches you. We understand the importance of having a reliable drive shaft, which is why we make it a priority to thoroughly test each one before making it available. The inspection and installation process ensures drive shafts are reliably equipped to deliver consistent and reliable performance.",
    aboutExtra: "We understand the importance of having a dependable drive shaft and guarantee only the most reliable products. Our drive shafts are carefully inspected and ready to be immediately installed in your vehicle. We make it our mission to consistently deliver drive shafts that perform reliably under all conditions, helping ensure your vehicle operates at peak performance and efficiency.",
    dropdown: "Select Drive Shaft Type",
    details: ["All drive shafts are inspected before delivery.", "30 Days - Replacement or Refund."],
    partFinderTitle: "Find the perfect drive shaft for your vehicle with our high-quality, thoroughly tested options.",
    benefitTitle: "Why Choose Us for Drive Shafts?",
    warrantyTitle: "Drive Shaft"
  },
  {
    id: "differential",
    name: "Differential",
    image: differentialImg,
    about: "Specializing in high-quality used and aftermarket differentials for a wide range of vehicles. From differentials to transmission ensembles, we have what you need. All differentials thoroughly inspected for function and reliability before reaching your vehicle.",
    aboutExtra: "Our differentials are tested under real-world conditions ensuring they meet our strict quality standards. We carry differentials for all major vehicle makes including front, rear, and all-wheel-drive configurations.",
    dropdown: "Select Differential Type",
    details: ["All differentials are inspected for quality.", "30 Days - Replacement or Refund."],
    partFinderTitle: "Find the right differential for your vehicle with our high-quality, thoroughly tested selection.",
    benefitTitle: "Why Choose Us for Differentials?",
    warrantyTitle: "Differential"
  },
  {
    id: "speedometer",
    name: "Speedometer",
    image: speedometerImg,
    about: "At Speedometer For Sale, we are dedicated to providing high-quality used and refurbished speedometers that meet the demands of various vehicles. Our comprehensive inventory includes a wide range of speedometers to ensure it meets the exact specification needs for your vehicle, giving you peace of mind with every purchase. Whether you're looking for a replacement to restore your speedometer to precise, accurate function.",
    aboutExtra: "The best products in the quality of our components in which in any used speedometer in our comprehensive inventory. Rigorous testing and inspection ensures that every part is OEM quality or better. Whether you're replacing a malfunctioning speedometer or upgrading to better performance, our Speedometers inventory provides components that make both look and function exceptional.",
    dropdown: "Select Speedometer Type",
    details: ["All speedometer components for installation.", "All speedometers are tested.", "30 Days - Replacement or Failures."],
    partFinderTitle: "Find the right speedometer for your vehicle with our high-quality, thoroughly tested options.",
    benefitTitle: "Why Choose Us for Speedometers?",
    warrantyTitle: "Speedometer"
  },
  {
    id: "throttle-body",
    name: "Throttle Body",
    image: throttleBodyImg,
    about: "At Throttle Body For Sale, we specialize in offering high-quality used and aftermarket throttle bodies to enhance your vehicle's performance. Each throttle body is designed to work seamlessly with your vehicle's engine, ensuring smooth airflow and optimal fuel efficiency. We are dedicated to delivering quality. Each throttle body is different — we test all throttle bodies that perform reliably without failure driving conditions. We ensure that every throttle body we sell performs reliably without failure during your driving operations.",
    aboutExtra: "We strictly test each throttle body to ensure proper operation before it leaves our facility. Whether you're in need of an upgrade, or seeking to get excellent fuel economy, Throttle Body provides parts that both look great and perform reliably.",
    dropdown: "Select Throttle Body Type",
    details: ["All throttle bodies are tested for functionality.", "30 Days - Replacement or Refund."],
    partFinderTitle: "Choose your ideal throttle body from our selection of high-quality, tested components.",
    benefitTitle: "Why Choose Us for Throttle Bodies?",
    warrantyTitle: "Throttle Body"
  },
  {
    id: "transfer-case-assembly",
    name: "Transfer Case Assembly",
    image: transferCaseImg,
    about: "At Transfer Case Assembly For Sale, we are committed to providing high-quality used and aftermarket transfer case assemblies designed to meet the needs of 4WD and AWD vehicles. Each assembly is rigorously inspected and tested in various driving conditions. Whether you're replacing a worn transfer case or upgrading your performance, we have the best assemblies at unbeatable prices.",
    aboutExtra: "We rigorously test each transfer case assembly to ensure it performs flawlessly before reaching your vehicle. Our strict inspection processes guarantee that you get a component that performs reliably, providing smooth power distribution and maximizing your vehicle's performance. Find your replacement now.",
    dropdown: "Select Transfer Case Assembly Type",
    details: ["All parts inspected for quality.", "30 Days - Replacement or Refund."],
    partFinderTitle: "Find the perfect transfer case assembly for your vehicle with our high-quality, tested options.",
    benefitTitle: "Why Choose Us for Transfer Case Assemblies?",
    warrantyTitle: "Transfer Case Assembly"
  },
  {
    id: "steering-gear-rack-pinion",
    name: "Steering Gear Rack & Pinion",
    image: steeringRackImg,
    about: "At Steering Gear Rack & Pinion For Sale, we are dedicated to offering high-quality used and aftermarket steering gear racks and pinions that meet the needs of millions of drivers. Our inventory includes tested and inspected steering gear rack and pinions designed to improve your vehicle's handling, safety, and control in any situation. Many of them are not only built to last, but also to provide you with the kind of precise, responsive handling you need every time you get behind the wheel.",
    aboutExtra: "Our commitment to excellence means that each steering component is carefully inspected and tested to ensure optimal performance and reliability. Whether you're looking for a replacement or upgrading for improved handling, our Steering Gear Rack & Pinion inventory has everything you need. Trust us to provide components that deliver an optimal driving experience.",
    dropdown: "Select Steering Gear Rack & Pinion Type",
    details: ["All parts inspected for quality.", "30 Days - Replacement or Refund."],
    partFinderTitle: "Find the right steering gear rack and pinion for your vehicle with our high-quality, tested options.",
    benefitTitle: "Why Choose Us for Steering Gear Racks & Pinions?",
    warrantyTitle: "Steering Gear Rack & Pinion"
  },
  {
    id: "intake-manifold",
    name: "Intake Manifold",
    image: intakeManifoldImg,
    about: "At Intake Manifold For Sale, we specialize in offering a range of high-quality used and aftermarket intake manifolds designed to enhance your vehicle's engine performance. Each intake manifold is thoroughly inspected for quality, ensuring it provides efficient airflow for your engine. We are committed to delivering only top-quality intake manifolds that meet rigorous inspection standards.",
    aboutExtra: "Our commitment to quality means that every intake manifold undergoes thorough inspection to optimize engine performance. The thorough inspection process ensures that every issue is precisely addressed so you can count on improved performance. Whether you're replacing an old manifold or upgrading, we can stock the best manifold options that meet your specifications and deliver the reliable performance you need.",
    dropdown: "Select Intake Manifold Type",
    details: ["All parts inspected for proper fit.", "All intake manifolds are inspected for fit.", "30 Days - Replacement or Refund."],
    partFinderTitle: "Choose your ideal intake manifold from our high-quality, thoroughly tested selection.",
    benefitTitle: "Why Choose Us for Intake Manifolds?",
    warrantyTitle: "Intake Manifold"
  },
  {
    id: "steering-column",
    name: "Steering Column",
    image: steeringColumnImg,
    about: "Providing high-quality used and refurbished steering columns for a wide range of vehicles. We understand the importance of precision and safety in steering components. Every column in our inventory is rigorously inspected and tested to ensure optimal performance and reliability.",
    aboutExtra: "We work to ensure that your steering column is not only safe but also performs exactly as it should. Our inspection process is thorough, and we guarantee you receive a high-quality component that will keep your vehicle steering smoothly for years to come.",
    dropdown: "Select Steering Column Type",
    details: ["All parts necessary for installation.", "All parts inspected for quality.", "30 Days - Replacement or Refund."],
    partFinderTitle: "Find the perfect steering column for your vehicle with our high-quality, tested options.",
    benefitTitle: "Why Choose Us for Steering Columns?",
    warrantyTitle: "Steering Column"
  },
  {
    id: "spindle-knuckle",
    name: "Spindle Knuckle",
    image: spindleKnuckleImg,
    about: "At Spindle Knuckle For Sale, we specialize in offering high-quality used and refurbished spindle knuckles for a variety of vehicles, from standard passenger cars to performance vehicles. We understand the importance of quality and precision when it comes to these critical components. Whether you're replacing a damaged part or aiming to upgrade your vehicle, our products are designed to provide you with great value.",
    aboutExtra: "We understand the importance of quality and precision when it comes to spindle knuckles, which is why we carefully test and inspect all spindle knuckles in our inventory before making them available. Whether you need a spindle knuckle for repairs or improving vehicle handling, trust us to deliver reliable solutions that offer great value for money.",
    dropdown: "Select Spindle Knuckle Type",
    details: ["All spindle knuckles are inspected for functionality.", "30 Days - Replacement or Refund."],
    partFinderTitle: "Find the perfect spindle knuckle for your vehicle with our high quality, tested options.",
    benefitTitle: "Why Choose Us for Spindle Knuckles?",
    warrantyTitle: "Spindle Knuckle"
  },
  {
    id: "axle-assembly",
    name: "Axle Assembly - Rear & Front",
    image: axleAssemblyImg,
    about: "At Axle Assembly For Sale, we offer a diverse selection of quality used and aftermarket axle assemblies that adhere to the highest standards. Our expert team ensures that each assembly undergoes a rigorous quality assurance process, giving you confidence in your purchase. Our commitment to quality means each component is inspected and tested before delivery.",
    aboutExtra: "Whether you're looking for a solution for repairs or aiming to upgrade your axle assembly's performance, we have a wide range of assemblies to match your vehicle's specific requirements. Our axle assemblies come in various configurations for various applications. Trust Auto Parts For Sale to provide dependable solutions that will meet your expectations and keep your vehicle running smoothly.",
    dropdown: "Select Axle Assembly Type",
    details: ["All parts inspected before delivery.", "30 Days - Replacement or Refund."],
    partFinderTitle: "Find the ideal axle assembly for your vehicle with our extensive selection of high-quality options.",
    benefitTitle: "Why Choose Us for Axle Assemblies?",
    warrantyTitle: "Axle Assembly"
  },
  {
    id: "abs-assembly",
    name: "ABS Assembly",
    image: axleAssemblyImg,
    about: "At ABS Assembly For Sale, we provide high-quality used and aftermarket ABS assemblies that challenge industry standards at competitive pricing. Our expert team rigorously tests each component to ensure reliability and performance. Whether you're looking for a solution for repairs or aiming to improve the safety performance of your vehicle, we have a wide range of ABS assemblies to meet your needs.",
    aboutExtra: "We understand the critical importance of ABS systems in vehicle safety, which is why each assembly is thoroughly inspected and tested before sale. Whether you're replacing a faulty ABS system or upgrading your vehicle's braking performance, trust Auto Parts For Sale to deliver reliable solutions at unbeatable prices.",
    dropdown: "Select ABS Assembly Type",
    details: ["All engines are inspected before delivery.", "All engines are inspected for quality.", "30 Days - Replacement or Refund."],
    partFinderTitle: "Choose Your Ideal Engine Brand and Find the Best Fit for Your Vehicle",
    benefitTitle: "Why Choose Us for ABS Assembly?",
    warrantyTitle: "ABS Assembly"
  },
  {
    id: "engine",
    name: "Engine",
    image: engineImg,
    about: "At Engine For Sale, we are dedicated to sourcing used and remanufactured engines at competitive prices, giving you access to 2000+ engines across our inventory, ensuring you find the best fit for your vehicle needs. Whether it's a standard economy engine or a performance engine, we are committed to reliability in every engine we supply. Our 2000+ used engine inventory means we'll source exactly what engine you need.",
    aboutExtra: "Our engines are carefully selected and go through rigorous inspection processes. We ensure the performance reliability of every engine we sell, as well as every component that you'll need for making your vehicle perform optimally. Whether you need a used or remanufactured engine, Auto Parts For Sale has you covered with competitive prices and outstanding service.",
    dropdown: "Select Engine Type",
    details: ["All necessary components.", "All engines are inspected before delivery.", "30 Days - Replacement or Refund."],
    videoUrl: `${BASE}videos/engine.mp4`,
    partFinderTitle: "Choose your ideal engine brand and find the best fit for your vehicle.",
    benefitTitle: "Why Choose Us for Engines?",
    warrantyTitle: "Engine"
  },
  {
    id: "transmissions",
    name: "Transmissions",
    image: transmissionImg,
    about: "At Transmissions For Sale, we are dedicated to providing high-quality used transmissions at competitive prices. With 500+ years of combined industry experience, we understand the importance of a reliable transmission. From automatic to manual, from domestic to import, we source only the best transmissions ensuring you get the highest quality at the lowest prices.",
    aboutExtra: "We take pride in supplying transmissions that exceed our customers' expectations and keep their vehicles on the road with confidence. Each transmission is thoroughly inspected and tested before delivery, and we back every sale with our comprehensive warranty.",
    dropdown: "Select Transmission Type",
    details: [
      "All internal transmission components including the torque converter.",
      "Joint Replacement — the torque converter will only be refunded with automatic transmissions.",
      "Transmissions will be inspected for damage before delivery."
    ],
    videoUrl: `${BASE}videos/gearbox.mp4`,
    partFinderTitle: "Pick Your Ideal Transmission Brand and Discover Best Options for Your Vehicle",
    benefitTitle: "Why Choose Us for Transmissions?",
    warrantyTitle: "Transmission"
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
        aboutExtra={product.aboutExtra}
        finderDropdownLabel={product.dropdown}
        productImage={product.image}
        packageDetails={product.details}
        videoUrl={product.videoUrl}
        partFinderTitle={product.partFinderTitle}
        benefitTitle={product.benefitTitle}
      />
    </Layout>
  );
}
