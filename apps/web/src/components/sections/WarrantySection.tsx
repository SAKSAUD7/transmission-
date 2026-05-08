interface WarrantyProps {
  productName: string;
  packageDetails: string[];
}

export default function WarrantySection({ productName, packageDetails }: WarrantyProps) {
  const partLabel = productName.toLowerCase();
  // Split package details into their semantic groups
  const mainDetails   = packageDetails.filter(d => !d.toLowerCase().includes("inspect") && !d.toLowerCase().includes("refund") && !d.toLowerCase().includes("replacement"));
  const soldSep       = packageDetails.find(d => d.toLowerCase().includes("torque converter") && d.toLowerCase().includes("only"));
  const inspection    = packageDetails.find(d => d.toLowerCase().includes("inspect"));

  return (
    <section className="warranty">
      <div className="warranty-inner">

        {/* LEFT — Text content */}
        <div className="warranty-text">
          <h2 className="warranty-title">Warranty Information</h2>
          <p className="warranty-desc">
            Every {partLabel} you purchase from us is backed by a robust warranty. We&apos;re committed to
            ensuring your satisfaction with our products, giving you the confidence that your investment
            is protected. Whether it&apos;s a standard or extended warranty, our goal is to provide peace
            of mind with every {partLabel} you buy.
          </p>

          <div className="warranty-block">
            <h3 className="warranty-block-title">Package Details</h3>
            {mainDetails.map((d, i) => <p key={i} className="warranty-block-text">{d}</p>)}
          </div>

          {soldSep && (
            <div className="warranty-block">
              <h3 className="warranty-block-title">Sold Separately:</h3>
              <p className="warranty-block-text">{soldSep}</p>
            </div>
          )}

          {inspection && (
            <div className="warranty-block">
              <h3 className="warranty-block-title">Inspection:</h3>
              <p className="warranty-block-text">{inspection}</p>
            </div>
          )}

          {!soldSep && !inspection && packageDetails.slice(mainDetails.length).map((d, i) => (
            <div key={i} className="warranty-block">
              <p className="warranty-block-text">{d}</p>
            </div>
          ))}
        </div>

        {/* RIGHT — Gold Shield */}
        <div className="warranty-shield-wrap">
          <div className="warranty-shield-outer">
            <div className="warranty-shield-inner">
              <div className="warranty-shield-num">30</div>
              <div className="warranty-shield-days">Days</div>
              <div className="warranty-shield-replace">Replace or Refund</div>
            </div>
            <div className="warranty-shield-ribbon">
              <span>Warranty</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
