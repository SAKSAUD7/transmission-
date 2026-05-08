"use client";
import Image from "next/image";

interface AboutProps {
  aboutText: string;
  aboutExtra?: string;
  productImage: string;
  productName: string;
}

export default function AboutSection({ aboutText, aboutExtra, productImage, productName }: AboutProps) {
  return (
    <section id="about" className="about">
      <div className="about-inner">
        <div>
          <h2 className="about-title">About Us</h2>
          <p className="about-text">{aboutText}</p>
          {aboutExtra && <p className="about-text">{aboutExtra}</p>}
          <button className="about-btn">Learn More</button>
        </div>
        <div className="about-image-wrap">
          <Image src={productImage} alt={productName} width={380} height={280} style={{ objectFit: "contain", maxHeight: 280 }} />
        </div>
      </div>
    </section>
  );
}
